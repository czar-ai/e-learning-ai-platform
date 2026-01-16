import { Injectable, signal } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  
  // Expose loading states via signals for components to consume
  isGenerating = signal(false);

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY']! });
  }

  async generateChatResponse(history: any[], message: string): Promise<string> {
    try {
      this.isGenerating.set(true);
      // Using gemini-2.5-flash for chat as requested/standard
      const model = 'gemini-2.5-flash';
      
      const contents = history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          systemInstruction: "You are an expert AI tutor on the Educax platform. You are helpful, encouraging, and knowledgeable. Keep answers concise for a chat interface."
        }
      });

      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Chat Error:", error);
      return "Error connecting to AI tutor.";
    } finally {
      this.isGenerating.set(false);
    }
  }

  async generateVideo(prompt: string, imageBase64: string): Promise<string> {
    try {
      this.isGenerating.set(true);
      
      // Using Veo 3.1 as specifically requested in the file attached
      const model = 'veo-3.1-fast-generate-preview';
      
      console.log('Starting Veo generation with:', prompt);
      
      let operation = await this.ai.models.generateVideos({
        model: model,
        prompt: prompt,
        image: {
          imageBytes: imageBase64,
          mimeType: 'image/jpeg' 
        },
        config: {
          numberOfVideos: 1,
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
        operation = await this.ai.operations.getVideosOperation({ operation: operation });
        console.log('Veo status:', operation.metadata);
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("No video URI returned");

      // Fetch the actual video bytes
      const response = await fetch(`${downloadLink}&key=${process.env['API_KEY']}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);

    } catch (error) {
      console.error("Video Gen Error:", error);
      throw error;
    } finally {
      this.isGenerating.set(false);
    }
  }

  async editImage(originalImageBase64: string, prompt: string): Promise<string> {
    try {
      this.isGenerating.set(true);
      
      // Step 1: Use Gemini 2.5 Flash to understand the image and refine the prompt for the image generator
      // This bridges the "edit" request to a "generation" request
      const analysisResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: originalImageBase64 } },
            { text: `Describe this image in detail, then incorporate the following edit request into a new full image description: "${prompt}". Return ONLY the new image description suitable for an image generator.` }
          ]
        }
      });
      
      const refinedPrompt = analysisResponse.text || prompt;
      console.log('Refined Image Prompt:', refinedPrompt);

      // Step 2: Use Imagen to generate the new "edited" image
      const imageResponse = await this.ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: refinedPrompt,
        config: {
          numberOfImages: 1,
          aspectRatio: '1:1',
          outputMimeType: 'image/jpeg'
        }
      });

      const base64ImageBytes = imageResponse.generatedImages?.[0]?.image?.imageBytes;
      if (!base64ImageBytes) throw new Error("No image generated");
      
      return `data:image/jpeg;base64,${base64ImageBytes}`;

    } catch (error) {
      console.error("Image Edit Error:", error);
      throw error;
    } finally {
      this.isGenerating.set(false);
    }
  }
}