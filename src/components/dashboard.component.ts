import { Component, inject, signal, ElementRef, ViewChild, output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { GeminiService } from '../services/gemini.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, NgClass],
  template: `
    <div class="flex h-screen bg-[#F3F3F3] overflow-hidden">
      
      <!-- Sidebar -->
      <aside class="w-64 bg-navy text-white flex flex-col flex-shrink-0 z-20 shadow-xl" style="background-color: #0A0F1C;">
        <div class="p-6 flex items-center gap-2 border-b border-white/10">
          <div class="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
             <span class="text-white font-bold">AI</span>
          </div>
          <span class="font-serif font-bold text-lg leading-tight">AI Cloud<br>College</span>
        </div>
        
        <nav class="flex-1 p-4 space-y-2">
          <button (click)="activeTab.set('chat')" [class.bg-white-10]="activeTab() === 'chat'" [class.bg-opacity-10]="activeTab() === 'chat'" class="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors" [ngClass]="{'bg-white/10 text-cyan-400': activeTab() === 'chat'}">
            <i class="fa-solid fa-comment-dots w-5"></i> AI Tutor Chat
          </button>
          <button (click)="activeTab.set('video')" class="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors" [ngClass]="{'bg-white/10 text-cyan-400': activeTab() === 'video'}">
            <i class="fa-solid fa-video w-5"></i> Live AI Call
          </button>
          <div class="pt-4 pb-2 px-4 text-xs uppercase text-gray-500 font-bold tracking-wider">Creative Tools</div>
          <button (click)="activeTab.set('veo')" class="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors" [ngClass]="{'bg-white/10 text-cyan-400': activeTab() === 'veo'}">
            <i class="fa-solid fa-film w-5"></i> Veo Video Gen
          </button>
          <button (click)="activeTab.set('image')" class="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors" [ngClass]="{'bg-white/10 text-cyan-400': activeTab() === 'image'}">
            <i class="fa-solid fa-wand-magic-sparkles w-5"></i> AI Image Editor
          </button>
        </nav>

        <div class="p-4 border-t border-white/10">
          <button (click)="logout.emit()" class="w-full flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <i class="fa-solid fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col relative bg-gray-50">
        
        <!-- Header -->
        <header class="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 class="text-xl font-bold text-gray-800 font-serif capitalize">{{ getTabTitle() }}</h2>
          <div class="flex items-center gap-4">
             <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span class="text-sm text-gray-500">AI Systems Online</span>
             <img src="https://picsum.photos/40/40?random=user" class="w-10 h-10 rounded-full border border-gray-200">
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-6 relative">
          
          <!-- Tab: Chat -->
          @if (activeTab() === 'chat') {
            <div class="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div class="flex-1 p-6 overflow-y-auto space-y-4" #chatContainer>
                 @for (msg of chatHistory(); track $index) {
                   <div [class]="msg.role === 'user' ? 'ml-auto bg-slate-800 text-white' : 'mr-auto bg-gray-100 text-gray-800'" class="max-w-[80%] p-4 rounded-2xl rounded-tr-sm">
                     <p class="text-sm leading-relaxed">{{ msg.text }}</p>
                   </div>
                 }
                 @if (gemini.isGenerating()) {
                   <div class="mr-auto bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-tr-sm flex gap-2 items-center">
                     <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                     <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                     <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                   </div>
                 }
               </div>
               <div class="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                 <input [(ngModel)]="chatInput" (keyup.enter)="sendMessage()" type="text" placeholder="Ask your AI tutor anything..." class="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:border-slate-800 transition-colors">
                 <button (click)="sendMessage()" class="w-12 h-12 bg-slate-800 text-white rounded-full hover:bg-cyan-500 hover:text-white transition-colors flex items-center justify-center">
                   <i class="fa-solid fa-paper-plane"></i>
                 </button>
               </div>
            </div>
          }

          <!-- Tab: Live Call -->
          @if (activeTab() === 'video') {
            <div class="h-full flex gap-6">
              <div class="flex-1 bg-black rounded-2xl overflow-hidden relative shadow-2xl">
                <!-- Main AI Feed (Simulated) -->
                <img src="https://picsum.photos/1200/800?random=ai" class="w-full h-full object-cover opacity-80">
                <div class="absolute inset-0 flex items-center justify-center">
                   <div class="text-center">
                     <div class="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse border border-white/20">
                       <i class="fa-solid fa-user-astronaut text-4xl text-white"></i>
                     </div>
                     <p class="text-white font-medium tracking-widest text-sm">AI INSTRUCTOR CONNECTED</p>
                   </div>
                </div>

                <!-- User PIP -->
                <div class="absolute bottom-6 right-6 w-48 h-36 bg-gray-800 rounded-xl border-2 border-white/20 overflow-hidden shadow-lg">
                   <video #userVideo autoplay muted playsinline class="w-full h-full object-cover"></video>
                </div>
                
                <!-- Controls -->
                <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                  <button (click)="toggleCall()" [class]="isCallActive() ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'" class="w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg transition-colors">
                    <i [class]="isCallActive() ? 'fa-solid fa-phone-slash' : 'fa-solid fa-phone'"></i>
                  </button>
                  <button class="w-14 h-14 rounded-full bg-gray-700/80 backdrop-blur text-white hover:bg-gray-600 flex items-center justify-center shadow-lg transition-colors">
                     <i class="fa-solid fa-microphone"></i>
                  </button>
                  <button class="w-14 h-14 rounded-full bg-gray-700/80 backdrop-blur text-white hover:bg-gray-600 flex items-center justify-center shadow-lg transition-colors">
                     <i class="fa-solid fa-user-plus"></i>
                  </button> <!-- Invite Specialist -->
                </div>
              </div>
              
              <!-- Live Transcript / Context -->
              <div class="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hidden lg:flex flex-col">
                <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">Session Notes</h3>
                <div class="flex-1 text-sm text-gray-500 italic">
                  AI is listening...<br><br>
                  Ready to assist with visual tasks. Show objects to camera for analysis.
                </div>
              </div>
            </div>
          }

          <!-- Tab: Veo Video Gen -->
          @if (activeTab() === 'veo') {
            <div class="h-full flex flex-col md:flex-row gap-8">
              <div class="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                <h3 class="font-bold text-gray-800 text-lg mb-4">Generate Video</h3>
                <p class="text-sm text-gray-500 mb-6">Upload an image and describe how you want to animate it using Veo.</p>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">1. Upload Image</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input type="file" (change)="onFileSelected($event, 'veo')" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer">
                    <i class="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2"></i>
                    <p class="text-xs text-gray-500">Click to upload image</p>
                    @if (veoImagePreview) {
                      <img [src]="veoImagePreview" class="absolute inset-0 w-full h-full object-cover rounded-xl">
                    }
                  </div>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">2. Prompt</label>
                  <textarea [(ngModel)]="veoPrompt" rows="4" class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-slate-800 focus:outline-none" placeholder="e.g., Make the camera pan right and the water flow..."></textarea>
                </div>

                <button (click)="generateVeo()" [disabled]="gemini.isGenerating() || !veoImagePreview" class="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                  @if (gemini.isGenerating()) { <i class="fa-solid fa-spinner fa-spin"></i> Generating... }
                  @else { <i class="fa-solid fa-wand-magic"></i> Generate Video }
                </button>
              </div>

              <div class="flex-1 bg-black rounded-2xl flex items-center justify-center overflow-hidden shadow-lg relative">
                 @if (generatedVideoUrl) {
                   <video [src]="generatedVideoUrl" controls autoplay loop class="w-full h-full object-contain"></video>
                 } @else {
                   <div class="text-center text-gray-500">
                     <i class="fa-solid fa-film text-6xl mb-4 opacity-20"></i>
                     <p>Generated video will appear here</p>
                   </div>
                 }
              </div>
            </div>
          }

          <!-- Tab: Image Editor -->
          @if (activeTab() === 'image') {
            <div class="h-full flex flex-col md:flex-row gap-8">
              <div class="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                <h3 class="font-bold text-gray-800 text-lg mb-4">AI Image Editor</h3>
                <p class="text-sm text-gray-500 mb-6">Modify images using natural language prompts.</p>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">1. Upload Image</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input type="file" (change)="onFileSelected($event, 'edit')" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer">
                    <i class="fa-solid fa-image text-3xl text-gray-400 mb-2"></i>
                    <p class="text-xs text-gray-500">Click to upload image</p>
                    @if (editImagePreview) {
                      <img [src]="editImagePreview" class="absolute inset-0 w-full h-full object-cover rounded-xl">
                    }
                  </div>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">2. Edit Instruction</label>
                  <textarea [(ngModel)]="editPrompt" rows="4" class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-slate-800 focus:outline-none" placeholder="e.g., Add a retro filter, remove the background person..."></textarea>
                </div>

                <button (click)="generateEdit()" [disabled]="gemini.isGenerating() || !editImagePreview" class="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                  @if (gemini.isGenerating()) { <i class="fa-solid fa-spinner fa-spin"></i> Processing... }
                  @else { <i class="fa-solid fa-palette"></i> Edit Image }
                </button>
              </div>

              <div class="flex-1 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200 relative">
                 @if (editedImageUrl) {
                   <img [src]="editedImageUrl" class="w-full h-full object-contain p-4">
                   <a [href]="editedImageUrl" download="edited-image.jpg" class="absolute bottom-6 right-6 bg-white shadow-lg text-navy w-12 h-12 rounded-full flex items-center justify-center hover:bg-gold transition-colors"><i class="fa-solid fa-download"></i></a>
                 } @else {
                   <div class="text-center text-gray-400">
                     <i class="fa-regular fa-image text-6xl mb-4 opacity-20"></i>
                     <p>Edited image result</p>
                   </div>
                 }
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    /* Custom scrollbar for chat */
    .overflow-y-auto::-webkit-scrollbar { width: 6px; }
    .overflow-y-auto::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 3px; }
  `]
})
export class DashboardComponent {
  logout = output<void>();
  gemini = inject(GeminiService);
  
  activeTab = signal<'chat' | 'video' | 'veo' | 'image'>('chat');
  
  // Chat State
  chatInput = '';
  chatHistory = signal<{role: string, text: string}[]>([
    { role: 'model', text: 'Hello! I am your personal AI Cloud College tutor. How can I help you learn today?' }
  ]);

  // Video State
  isCallActive = signal(false);
  @ViewChild('userVideo') userVideoElement!: ElementRef<HTMLVideoElement>;

  // Veo State
  veoPrompt = '';
  veoImagePreview: string | null = null;
  veoImageBase64: string | null = null; // Raw base64 for API
  generatedVideoUrl: string | null = null;

  // Edit State
  editPrompt = '';
  editImagePreview: string | null = null;
  editImageBase64: string | null = null;
  editedImageUrl: string | null = null;

  getTabTitle() {
    switch (this.activeTab()) {
      case 'chat': return 'AI Chat Tutor';
      case 'video': return 'Real-time Consultation';
      case 'veo': return 'Veo Video Studio';
      case 'image': return 'Magic Image Editor';
      default: return 'Dashboard';
    }
  }

  // Chat Logic
  async sendMessage() {
    if (!this.chatInput.trim() || this.gemini.isGenerating()) return;

    const msg = this.chatInput;
    this.chatInput = ''; // Clear early
    
    // Optimistic update
    this.chatHistory.update(h => [...h, { role: 'user', text: msg }]);

    const response = await this.gemini.generateChatResponse(
      this.chatHistory().filter(h => h.role !== 'model' || h.text !== 'Error...'), // simplified history filter
      msg
    );

    this.chatHistory.update(h => [...h, { role: 'model', text: response }]);
  }

  // Video Logic
  async toggleCall() {
    if (this.isCallActive()) {
      // Stop
      const stream = this.userVideoElement.nativeElement.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      this.userVideoElement.nativeElement.srcObject = null;
      this.isCallActive.set(false);
    } else {
      // Start
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.userVideoElement.nativeElement.srcObject = stream;
        this.isCallActive.set(true);
      } catch (e) {
        console.error("Camera error", e);
        alert("Could not access camera. Please allow permissions.");
      }
    }
  }

  // File Handling
  onFileSelected(event: Event, type: 'veo' | 'edit') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      
      if (type === 'veo') {
        this.veoImagePreview = result;
        this.veoImageBase64 = base64Data;
      } else {
        this.editImagePreview = result;
        this.editImageBase64 = base64Data;
      }
    };
    reader.readAsDataURL(file);
  }

  // Veo Generation
  async generateVeo() {
    if (!this.veoImageBase64 || !this.veoPrompt) return;
    try {
      this.generatedVideoUrl = null;
      const url = await this.gemini.generateVideo(this.veoPrompt, this.veoImageBase64);
      this.generatedVideoUrl = url;
    } catch (e) {
      alert("Failed to generate video. Please try again.");
    }
  }

  // Image Edit Generation
  async generateEdit() {
    if (!this.editImageBase64 || !this.editPrompt) return;
    try {
      this.editedImageUrl = null;
      const url = await this.gemini.editImage(this.editImageBase64, this.editPrompt);
      this.editedImageUrl = url;
    } catch (e) {
      alert("Failed to edit image. Please try again.");
    }
  }
}