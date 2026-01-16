import { Component, AfterViewInit, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="w-full overflow-hidden bg-deep text-white selection:bg-neon-blue selection:text-black">
      
      <!-- Announcement Bar -->
      <div class="bg-gradient-to-r from-blue-900 to-purple-900 text-center py-2 px-4 text-xs md:text-sm font-medium tracking-wide z-50 relative">
        <span class="mr-2">🚀 LAUNCH SPECIAL:</span>
        <span class="opacity-90">Get all 9 courses for $999 (Save $792) + 3 months AI Tutor Pro FREE</span>
        <a href="#pricing" class="ml-2 underline hover:text-neon-blue transition-colors">Claim Bundle Deal →</a>
      </div>

      <!-- Navbar -->
      <nav class="fixed top-8 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-6" id="navbar">
        <div class="container mx-auto max-w-7xl glass rounded-2xl px-6 py-4 flex justify-between items-center shadow-2xl shadow-blue-900/10 backdrop-blur-md bg-[#0A0F1C]/80">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
               <span class="text-white font-bold text-lg">AI</span>
             </div>
             <span class="text-xl font-bold font-serif tracking-tight leading-none">AI Cloud<br>College</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
            <div class="relative group cursor-pointer py-2">
              <span class="hover:text-white transition-colors flex items-center gap-1">Courses <i class="fa-solid fa-chevron-down text-xs"></i></span>
              <!-- Dropdown -->
              <div class="absolute top-full left-0 mt-2 w-72 glass bg-[#0A0F1C] p-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border border-white/10 shadow-2xl">
                <div class="max-h-80 overflow-y-auto">
                  @for (course of courses; track course.name) {
                    <a href="#courses" class="block py-3 px-4 hover:bg-white/5 rounded-lg text-xs hover:text-neon-blue transition-colors truncate border-b border-white/5 last:border-0">
                      {{course.name}}
                    </a>
                  }
                </div>
                <div class="p-2 border-t border-white/10 bg-white/5 mt-1">
                  <a href="#courses" class="block text-center text-xs text-neon-purple font-bold hover:text-white">View All Courses →</a>
                </div>
              </div>
            </div>
            <a href="#ai-tutor" class="hover:text-white transition-colors relative group">
              AI Tutor
              <span class="absolute -top-3 -right-3 w-2 h-2 bg-neon-blue rounded-full animate-pulse"></span>
            </a>
            <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
            <a href="#how-it-works" class="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" class="hover:text-white transition-colors">FAQ</a>
          </div>

          <!-- CTAs -->
          <div class="flex items-center gap-4">
            <button (click)="onLogin()" class="hidden md:block text-sm font-medium hover:text-white text-gray-400 transition-colors">Login</button>
            <button href="#courses" class="bg-gradient-main text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105">
              Browse Courses
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="relative pt-40 pb-20 lg:pt-56 lg:pb-32 container mx-auto px-6 max-w-7xl">
        <!-- Background Effects -->
        <div class="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="lg:w-1/2 z-10 hero-content opacity-0 translate-y-8">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-neon-blue/30 mb-8">
              <span class="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
              <span class="text-[10px] md:text-xs font-bold tracking-widest uppercase text-cyan-300">The World's First Emotionally-Intelligent AI Learning Platform</span>
            </div>
            
            <h1 class="text-5xl lg:text-7xl font-bold leading-tight mb-8 font-serif">
              Stop Learning Alone. <br/>
              <span class="text-gradient">Start Learning with an AI Mentor Who Sees You.</span>
            </h1>
            
            <p class="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl">
              AI Cloud College isn't another video course library. It's the only platform where an AI avatar tutor watches your screen, hears your questions, and coaches you through real cloud labs—like having a senior engineer on-call 24/7.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 mb-12">
              <button href="#courses" class="bg-white text-deep px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                Browse All Courses <span class="text-xs opacity-70 font-normal ml-1">($199/course)</span>
              </button>
              <button class="glass px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <i class="fa-regular fa-circle-play text-xl"></i> Watch AI Tutor Demo
              </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <div>
                <p class="text-2xl font-bold text-white">5,000+</p>
                <p class="text-xs text-gray-500 uppercase tracking-wide">Learners</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">9</p>
                <p class="text-xs text-gray-500 uppercase tracking-wide">Expert Courses</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">162+</p>
                <p class="text-xs text-gray-500 uppercase tracking-wide">Hands-On Labs</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-white">24/7</p>
                <p class="text-xs text-gray-500 uppercase tracking-wide">AI Availability</p>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 relative hero-media opacity-0 translate-x-8">
            <div class="relative glass rounded-2xl p-2 border-white/10 shadow-2xl shadow-cyan-500/20 overflow-hidden group cursor-pointer">
              <!-- Simulated Video UI -->
              <div class="relative bg-black rounded-xl overflow-hidden aspect-video">
                <img src="https://picsum.photos/800/600?random=tech" class="w-full h-full object-cover opacity-60">
                <div class="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div class="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                    <i class="fa-solid fa-play text-3xl text-white ml-1"></i>
                  </div>
                </div>
                
                <!-- AI Overlay -->
                <div class="absolute bottom-4 right-4 w-32 h-40 bg-gray-900 rounded-lg border border-neon-blue shadow-lg overflow-hidden">
                  <img src="https://picsum.photos/200/300?random=avatar" class="w-full h-full object-cover">
                  <div class="absolute bottom-2 left-2 flex gap-1">
                     <div class="w-1 h-3 bg-neon-blue rounded-full animate-bounce"></div>
                     <div class="w-1 h-3 bg-neon-blue rounded-full animate-bounce delay-75"></div>
                     <div class="w-1 h-3 bg-neon-blue rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-center text-xs text-gray-500 mt-4 italic">15-second loop: Student shares screen → AI helps fix error → Success</p>
          </div>
        </div>
      </header>

      <!-- Problem Agitation -->
      <section class="py-24 bg-[#0D1221]">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="text-center mb-16">
            <p class="text-neon-purple font-bold tracking-widest text-xs uppercase mb-3">Sound Familiar?</p>
            <h2 class="text-3xl md:text-5xl font-bold mb-6">You've Tried Everything. Nothing Sticks.</h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (prob of problems; track prob.title) {
              <div class="glass p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                <div class="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i [class]="'fa-solid ' + prob.icon"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">{{prob.title}}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{prob.description}}</p>
              </div>
            }
          </div>
          
          <p class="text-center text-xl text-gray-300 mt-16 max-w-3xl mx-auto border-t border-white/5 pt-10">
            What if learning felt like pair programming with a patient senior engineer—available whenever you needed them?
          </p>
        </div>
      </section>

      <!-- Solution Reveal -->
      <section class="py-24 relative overflow-hidden" id="ai-tutor">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D1221]/50 pointer-events-none"></div>
        <div class="container mx-auto px-6 max-w-7xl relative z-10">
          <div class="flex flex-col lg:flex-row gap-16 items-center mb-24">
            <div class="lg:w-1/2">
              <p class="text-neon-blue font-bold tracking-widest text-xs uppercase mb-3">Introducing A New Way To Learn</p>
              <h2 class="text-4xl md:text-5xl font-bold mb-6 font-serif">Meet Your AI Avatar Mentor</h2>
              <p class="text-xl text-gray-300 mb-8">Not a chatbot. Not a video. A human-like AI tutor who teaches you through conversation, sees your screen, and adapts to how you're feeling.</p>
              
              <div class="glass p-8 rounded-2xl border-l-4 border-l-neon-purple mb-8">
                <h3 class="font-bold text-lg mb-2 text-white">This Is What Learning Should Feel Like</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Imagine being stuck on a Kubernetes deployment. You click 'Call My Tutor.' Within seconds, an AI avatar appears—your chosen mentor. They see your terminal, understand your error, and walk you through the fix step by step. When they sense you're frustrated, they slow down.
                </p>
              </div>
              
              <button class="text-neon-blue font-bold hover:text-white transition-colors flex items-center gap-2 group">
                See It In Action <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
            
            <div class="lg:w-1/2 grid grid-cols-2 gap-4">
               @for (avatar of avatars; track avatar.name) {
                 <div class="glass p-4 rounded-xl text-center hover:bg-white/10 transition-all cursor-pointer group">
                   <div class="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-neon-blue transition-colors">
                     <img [src]="'https://picsum.photos/200/200?random=' + avatar.name" class="w-full h-full object-cover">
                   </div>
                   <h4 class="font-bold text-white">{{avatar.name}}</h4>
                   <p class="text-xs text-neon-purple mb-2">{{avatar.personality}}</p>
                   <p class="text-[10px] text-gray-500 line-clamp-2">{{avatar.style}}</p>
                 </div>
               }
            </div>
          </div>
        </div>
      </section>

      <!-- AI Interaction Demo (NEW SECTION) -->
      <section class="py-24 bg-[#0A0F1C] border-y border-white/5">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="text-center mb-16">
            <p class="text-neon-blue font-bold tracking-widest text-xs uppercase mb-3">See It In Action</p>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Your AI Tutor Understands You</h2>
            <p class="text-gray-400">Real examples of how our AI avatar helps learners overcome obstacles</p>
          </div>

          <div class="grid lg:grid-cols-3 gap-8">
            @for (demo of interactionExamples; track demo.scenario) {
              <div class="glass rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                <div class="p-6 bg-gradient-to-br from-white/5 to-transparent border-b border-white/5">
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-xs font-bold px-2 py-1 rounded bg-white/10 text-gray-300">{{demo.type}}</span>
                    <i [class]="'fa-solid ' + demo.icon + ' ' + demo.color"></i>
                  </div>
                  <h3 class="text-lg font-bold text-white mb-2">{{demo.scenario}}</h3>
                </div>
                <div class="p-6 space-y-4">
                  <!-- Student Msg -->
                  <div class="flex gap-3 items-start">
                    <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs">You</div>
                    <div class="bg-gray-800 rounded-lg rounded-tl-none p-3 text-sm text-gray-300">
                      {{demo.student}}
                    </div>
                  </div>
                  <!-- AI Msg -->
                  <div class="flex gap-3 items-start flex-row-reverse">
                    <div class="w-8 h-8 rounded-full bg-neon-blue/20 flex-shrink-0 flex items-center justify-center text-xs text-neon-blue">AI</div>
                    <div class="bg-neon-blue/10 border border-neon-blue/20 rounded-lg rounded-tr-none p-3 text-sm text-gray-200">
                      {{demo.ai}}
                    </div>
                  </div>
                  <p class="text-center text-green-400 text-xs font-bold pt-2"><i class="fa-solid fa-check-circle"></i> {{demo.outcome}}</p>
                </div>
              </div>
            }
          </div>
          
          <div class="text-center mt-12">
            <button (click)="onLogin()" class="glass border border-neon-blue text-neon-blue px-8 py-3 rounded-lg font-bold hover:bg-neon-blue hover:text-black transition-colors">
              Experience AI Tutoring Yourself
            </button>
          </div>
        </div>
      </section>

      <!-- Differentiation -->
      <section class="py-20 bg-[#080C17]">
        <div class="container mx-auto px-6 max-w-7xl">
           <div class="text-center mb-16">
             <h2 class="text-3xl font-bold mb-4">This Isn't Your Average Learning Platform</h2>
             <p class="text-gray-400">See why 5,000+ learners switched to AI Cloud College</p>
           </div>

           <div class="overflow-x-auto pb-6">
             <table class="w-full text-left border-collapse min-w-[800px]">
               <thead>
                 <tr>
                   <th class="p-4 text-gray-500 font-medium text-sm">Feature</th>
                   <th class="p-4 text-gray-500 font-medium text-sm">Traditional Courses</th>
                   <th class="p-4 text-gray-500 font-medium text-sm">AI Chatbot Platforms</th>
                   <th class="p-4 text-neon-blue font-bold text-lg bg-white/5 rounded-t-xl">AI Cloud College</th>
                 </tr>
               </thead>
               <tbody>
                 @for (row of comparisonRows; track row.feature) {
                   <tr class="border-b border-white/5">
                     <td class="p-4 font-bold text-white">{{row.feature}}</td>
                     <td class="p-4 text-gray-400 text-sm">{{row.traditional}}</td>
                     <td class="p-4 text-gray-400 text-sm">{{row.chatbot}}</td>
                     <td class="p-4 text-white font-medium bg-white/5 border-l border-r border-white/5 relative">
                       <i class="fa-solid fa-check text-green-400 mr-2"></i> {{row.ai_cloud}}
                     </td>
                   </tr>
                 }
               </tbody>
             </table>
           </div>
           
           <div class="text-center mt-12">
             <button (click)="onLogin()" class="bg-white text-deep px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
               Try Free for 7 Days
             </button>
           </div>
        </div>
      </section>

      <!-- Benefits Bento -->
      <section class="py-24 container mx-auto px-6 max-w-7xl">
        <div class="text-center mb-16">
          <p class="text-neon-purple font-bold tracking-widest text-xs uppercase mb-3">Built For Real Results</p>
          <h2 class="text-3xl md:text-5xl font-bold">Everything You Need to Go from Learning to Earning</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
          <!-- Large 1 -->
          <div class="md:col-span-2 md:row-span-2 glass p-8 rounded-3xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl group-hover:bg-neon-blue/20 transition-colors"></div>
            <i class="fa-solid fa-video text-4xl text-neon-blue mb-6"></i>
            <h3 class="text-2xl font-bold mb-4">AI Video Calls On-Demand</h3>
            <p class="text-gray-400 leading-relaxed max-w-md">Stuck on a lab? Click 'Call My Tutor' and your AI avatar joins instantly. Share your screen, talk through problems, get unstuck in minutes instead of hours.</p>
            <div class="mt-8 bg-black/50 rounded-xl h-48 w-full border border-white/10 flex items-center justify-center">
              <span class="text-xs text-gray-500">[One-click Call GIF Placeholder]</span>
            </div>
          </div>
          
          <!-- Medium 1 -->
          <div class="glass p-8 rounded-3xl flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <i class="fa-solid fa-terminal text-3xl text-green-400 mb-4"></i>
              <h3 class="text-xl font-bold mb-2">162+ Real Cloud Labs</h3>
              <p class="text-sm text-gray-400">Practice in actual AWS, Azure, and GCP environments. No simulation.</p>
            </div>
            <div class="text-3xl font-bold text-white mt-4">162+ Labs</div>
          </div>

          <!-- Medium 2 -->
          <div class="glass p-8 rounded-3xl flex flex-col justify-between hover:border-white/20 transition-colors">
             <div>
              <i class="fa-solid fa-layer-group text-3xl text-purple-400 mb-4"></i>
              <h3 class="text-xl font-bold mb-2">9 Comprehensive Courses</h3>
              <p class="text-sm text-gray-400">Clear progression, hands-on projects, and career-focused outcomes.</p>
            </div>
            <div class="text-xl font-bold text-white mt-4">$199 <span class="text-sm font-normal text-gray-500">per course</span></div>
          </div>

          <!-- Large 2 -->
          <div class="md:col-span-2 md:row-span-1 glass p-8 rounded-3xl flex items-center gap-8">
            <div class="flex-1">
              <i class="fa-solid fa-brain text-3xl text-pink-500 mb-4"></i>
              <h3 class="text-2xl font-bold mb-2">Emotion-Aware Coaching</h3>
              <p class="text-gray-400 text-sm">Our AI detects when you're frustrated, confused, or bored through your voice and text patterns. It automatically adjusts.</p>
            </div>
            <div class="hidden md:block w-1/3 bg-black/30 h-full rounded-xl border border-white/5"></div>
          </div>

          <!-- Small 1 -->
           <div class="glass p-6 rounded-3xl flex flex-col justify-center items-center text-center">
             <i class="fa-solid fa-certificate text-3xl text-gold mb-3"></i>
             <h3 class="font-bold">Certificates Included</h3>
           </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="py-24 bg-[#0D1221]" id="how-it-works">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="text-center mb-16">
            <p class="text-neon-blue font-bold tracking-widest text-xs uppercase mb-3">Simple To Start</p>
            <h2 class="text-4xl font-bold mb-4">From Purchase to Job-Ready in 4 Steps</h2>
            <p class="text-gray-400">No complicated onboarding. Start learning in under 5 minutes.</p>
          </div>

          <div class="grid md:grid-cols-4 gap-8 relative">
            <!-- Connecting Line -->
            <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            @for (step of steps; track step.number) {
              <div class="relative z-10">
                <div class="w-24 h-24 bg-[#0A0F1C] border border-white/20 rounded-full flex items-center justify-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 mb-6 mx-auto shadow-xl">
                  {{step.number}}
                </div>
                <div class="text-center">
                  <h3 class="text-xl font-bold mb-3">{{step.title}}</h3>
                  <p class="text-sm text-gray-400 mb-4">{{step.description}}</p>
                  <span class="text-xs font-mono text-neon-purple px-2 py-1 bg-neon-purple/10 rounded">{{step.time}}</span>
                </div>
              </div>
            }
          </div>
          
          <div class="text-center mt-16">
            <button href="#courses" class="bg-gradient-main text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Browse All 9 Courses
            </button>
            <p class="mt-4 text-sm text-gray-500">Or <a href="#pricing" class="underline hover:text-white">Get Complete Bundle — $999</a></p>
          </div>
        </div>
      </section>

      <!-- Social Proof -->
      <section class="py-24 relative">
        <div class="container mx-auto px-6 max-w-7xl">
           <div class="text-center mb-16">
             <h2 class="text-4xl font-bold mb-4">They Stopped Struggling. They Started Shipping.</h2>
             <p class="text-gray-400">Join thousands who transformed their careers</p>
           </div>

           <!-- Featured Testimonial -->
           <div class="glass p-10 rounded-3xl border-neon-blue/20 mb-12 flex flex-col md:flex-row gap-10 items-center">
             <div class="md:w-1/3 text-center">
               <div class="w-32 h-32 rounded-full border-4 border-neon-blue mx-auto mb-4 overflow-hidden">
                 <img src="https://picsum.photos/300/300?random=marcus" class="w-full h-full object-cover">
               </div>
               <h3 class="text-xl font-bold">Marcus Chen</h3>
               <p class="text-neon-blue text-sm font-bold">Cloud Engineer at Shopify</p>
               <p class="text-xs text-gray-500 mt-1">Career changed in 4 months</p>
             </div>
             <div class="md:w-2/3 relative">
               <i class="fa-solid fa-quote-left text-4xl text-white/10 absolute -top-6 -left-6"></i>
               <p class="text-xl md:text-2xl leading-relaxed italic text-gray-200">
                 "I'd failed three times trying to learn Kubernetes from videos. The first time I got stuck on AI Cloud College, I clicked 'Call Tutor' and Alex literally walked me through my YAML file on a video call. I was deployed in 10 minutes. That moment changed everything for me."
               </p>
             </div>
           </div>

           <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             @for (t of testimonials; track t.name) {
               <div class="glass p-6 rounded-xl hover:bg-white/5 transition-colors">
                 <p class="text-sm text-gray-300 mb-4">"{{t.quote}}"</p>
                 <div class="border-t border-white/5 pt-4">
                   <p class="font-bold text-white text-sm">{{t.name}}</p>
                   <p class="text-xs text-gray-500">{{t.title}}</p>
                   <p class="text-xs text-green-400 mt-1"><i class="fa-solid fa-check-circle"></i> {{t.result}}</p>
                 </div>
               </div>
             }
           </div>
           
           <!-- Logos -->
           <div class="mt-16 pt-16 border-t border-white/5 text-center">
             <p class="text-sm text-gray-500 mb-8 uppercase tracking-widest">Our learners work at</p>
             <div class="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
               <i class="fa-brands fa-google text-2xl"></i>
               <i class="fa-brands fa-aws text-2xl"></i>
               <i class="fa-brands fa-microsoft text-2xl"></i>
               <i class="fa-brands fa-stripe text-2xl"></i>
               <i class="fa-brands fa-shopify text-2xl"></i>
               <i class="fa-brands fa-meta text-2xl"></i>
             </div>
           </div>
        </div>
      </section>

      <!-- Courses -->
      <section class="py-24 bg-[#080C17]" id="courses">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p class="text-neon-blue font-bold tracking-widest text-xs uppercase mb-2">9 Comprehensive Courses • $199 Each</p>
              <h2 class="text-4xl font-bold font-serif">Master Cloud Skills That Get You Hired</h2>
              <p class="text-gray-400 mt-2 max-w-2xl">Each course includes hands-on labs, AI tutor support, and real-world projects. One price. Complete access.</p>
            </div>
            <div class="bg-white/5 rounded-lg p-4 text-sm">
              <span class="block text-2xl font-bold text-white">$199</span>
              <span class="text-gray-500">per course / lifetime access</span>
            </div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (course of courses; track course.id) {
              <div class="glass rounded-2xl overflow-hidden border border-white/5 group hover:border-neon-blue/50 transition-all duration-300 flex flex-col">
                <div class="p-6 bg-gradient-to-br from-white/5 to-transparent">
                  <div class="flex justify-between items-start mb-4">
                     <div class="w-12 h-12 bg-[#0A0F1C] rounded-lg flex items-center justify-center text-2xl shadow-lg">
                       <i [class]="'fa-solid ' + course.icon" [class.text-neon-blue]="!course.level_color_red" [class.text-red-400]="course.level_color === 'red'"></i>
                     </div>
                     @if (course.ai_enhanced) {
                       <span class="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-1 rounded-full border border-purple-500/30">
                         🤖 AI-POWERED
                       </span>
                     }
                  </div>
                  <h3 class="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">{{course.name}}</h3>
                  <div class="flex gap-2 text-xs font-mono mb-4">
                    <span [class.text-green-400]="course.level==='Beginner'" [class.text-orange-400]="course.level==='Intermediate'" [class.text-red-400]="course.level==='Advanced'">{{course.level}}</span>
                    <span class="text-gray-600">•</span>
                    <span class="text-gray-400">{{course.duration}}</span>
                    <span class="text-gray-600">•</span>
                    <span class="text-gray-400">{{course.labs}} Labs</span>
                  </div>
                  <p class="text-gray-400 text-sm leading-relaxed mb-6 h-20">{{course.description}}</p>
                </div>
                
                <div class="mt-auto border-t border-white/5 p-4 bg-black/20 flex justify-between items-center">
                  <span class="font-bold text-white">$199</span>
                  <button class="text-sm font-bold text-neon-blue hover:text-white transition-colors">View Details →</button>
                </div>
              </div>
            }
          </div>

          <!-- Bundle Offer -->
          <div class="mt-16 glass rounded-3xl p-8 md:p-12 border border-neon-purple/30 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40 pointer-events-none"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div>
                 <span class="bg-gold text-navy px-3 py-1 rounded text-xs font-bold uppercase mb-4 inline-block">Best Value</span>
                 <h3 class="text-3xl font-bold mb-2">🎓 COMPLETE CLOUD MASTER BUNDLE</h3>
                 <p class="text-gray-300 mb-6 max-w-xl">Get ALL 9 courses for the price of 6. Includes 162+ labs, lifetime access, and 3 months of AI Tutor Pro.</p>
                 <ul class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-400 mb-8">
                   <li class="flex items-center gap-2"><i class="fa-solid fa-check text-green-400"></i> All 9 courses</li>
                   <li class="flex items-center gap-2"><i class="fa-solid fa-check text-green-400"></i> Lifetime Access</li>
                   <li class="flex items-center gap-2"><i class="fa-solid fa-check text-green-400"></i> Priority AI Access</li>
                   <li class="flex items-center gap-2"><i class="fa-solid fa-check text-green-400"></i> Job Placement</li>
                 </ul>
               </div>
               <div class="text-center bg-[#0A0F1C]/80 p-8 rounded-2xl border border-white/10 backdrop-blur">
                 <p class="text-gray-500 line-through text-sm mb-1">$1,791</p>
                 <p class="text-5xl font-bold text-white mb-2">$999</p>
                 <p class="text-green-400 text-sm font-bold mb-6">Save $792 (44% off)</p>
                 <button class="bg-gradient-main text-white px-8 py-4 rounded-lg font-bold w-full hover:scale-105 transition-transform shadow-lg shadow-purple-500/25">
                   Get Complete Bundle
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section class="py-24" id="pricing">
         <div class="container mx-auto px-6 max-w-7xl">
           <div class="text-center mb-16">
             <p class="text-neon-purple font-bold tracking-widest text-xs uppercase mb-3">Simple, Transparent Pricing</p>
             <h2 class="text-4xl font-bold mb-4">One Price Per Course. No Hidden Fees.</h2>
           </div>

           <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <!-- Single Course -->
             <div class="glass p-8 rounded-2xl flex flex-col">
               <h3 class="text-2xl font-bold mb-2">Single Course</h3>
               <p class="text-gray-400 text-sm mb-6">Start with one focused skill</p>
               <div class="text-4xl font-bold mb-8">$199 <span class="text-sm font-normal text-gray-500">one-time</span></div>
               
               <ul class="space-y-4 mb-8 flex-1">
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> Full course content</li>
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> All hands-on labs included</li>
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> Lifetime access & updates</li>
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> Basic AI Chat Support</li>
               </ul>
               <button class="w-full py-4 border border-white/20 rounded-lg font-bold hover:bg-white hover:text-black transition-colors">Choose a Course</button>
             </div>

             <!-- Bundle -->
             <div class="glass p-8 rounded-2xl flex flex-col border border-neon-blue/50 relative">
               <div class="absolute top-0 right-0 bg-neon-blue text-black text-xs font-bold px-3 py-1 rounded-bl-lg">BEST VALUE</div>
               <h3 class="text-2xl font-bold mb-2">Complete Bundle</h3>
               <p class="text-gray-400 text-sm mb-6">Master everything</p>
               <div class="text-4xl font-bold mb-2">$999 <span class="text-sm font-normal text-gray-500">one-time</span></div>
               <p class="text-green-400 text-xs font-bold mb-6">Save $792 today</p>
               
               <ul class="space-y-4 mb-8 flex-1">
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> All 9 courses (162+ labs)</li>
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> 9 Certificates</li>
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> 3 Months AI Tutor Pro FREE</li>
                 <li class="flex items-center gap-3 text-sm text-gray-300"><i class="fa-solid fa-check text-neon-blue"></i> Priority Support</li>
               </ul>
               <button class="w-full py-4 bg-neon-blue text-black rounded-lg font-bold hover:bg-white transition-colors">Get All 9 Courses</button>
             </div>
           </div>
           
           <!-- AI Addon -->
           <div class="mt-16 max-w-4xl mx-auto border-t border-white/10 pt-16">
             <h3 class="text-2xl font-bold text-center mb-8">Supercharge Your Learning with AI Tutor Pro</h3>
             <div class="grid md:grid-cols-3 gap-6">
               <div class="glass p-6 rounded-xl opacity-60">
                 <h4 class="font-bold">AI Tutor Basic</h4>
                 <p class="text-2xl font-bold my-2">Free</p>
                 <p class="text-xs text-gray-400 mb-4">Included with every course</p>
                 <ul class="text-xs space-y-2 mb-4">
                   <li>• Unlimited AI Chat</li>
                   <li>• Course Q&A</li>
                 </ul>
                 <button class="w-full py-2 border border-white/10 rounded text-sm text-gray-400 cursor-default">Included</button>
               </div>
               
               <div class="glass p-6 rounded-xl border border-neon-purple relative">
                 <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-purple text-white text-[10px] font-bold px-2 py-0.5 rounded">RECOMMENDED</div>
                 <h4 class="font-bold text-white">AI Tutor Pro</h4>
                 <p class="text-2xl font-bold my-2 text-neon-purple">$99<span class="text-sm text-gray-400 font-normal">/mo</span></p>
                 <p class="text-xs text-gray-400 mb-4">The full mentor experience</p>
                 <ul class="text-xs space-y-2 mb-4 text-gray-300">
                   <li>• Unlimited AI Voice Calls</li>
                   <li>• Screen Sharing Support</li>
                   <li>• Emotion-Aware Coaching</li>
                 </ul>
                 <button class="w-full py-2 bg-neon-purple text-white rounded text-sm font-bold hover:bg-neon-purple/80">Add to Course</button>
               </div>

               <div class="glass p-6 rounded-xl opacity-80">
                 <h4 class="font-bold">AI Tutor Elite</h4>
                 <p class="text-2xl font-bold my-2">$199<span class="text-sm text-gray-400 font-normal">/mo</span></p>
                 <p class="text-xs text-gray-400 mb-4">Maximum acceleration</p>
                 <ul class="text-xs space-y-2 mb-4">
                   <li>• Unlimited Video Calls</li>
                   <li>• 1-on-1 Strategy</li>
                   <li>• Job Placement</li>
                 </ul>
                 <button class="w-full py-2 border border-white/20 rounded text-sm hover:bg-white/5">Go Elite</button>
               </div>
             </div>
           </div>
         </div>
      </section>

      <!-- FAQ -->
      <section class="py-24 bg-[#080C17]" id="faq">
        <div class="container mx-auto px-6 max-w-4xl">
           <div class="text-center mb-16">
             <p class="text-neon-blue font-bold tracking-widest text-xs uppercase mb-3">Got Questions?</p>
             <h2 class="text-3xl font-bold">Everything You Need to Know</h2>
           </div>

           <div class="space-y-4">
             @for (faq of faqs; track faq.question; let i = $index) {
               <div class="glass rounded-xl overflow-hidden">
                 <button (click)="toggleFaq(i)" class="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors">
                   <span class="font-bold text-gray-200">{{faq.question}}</span>
                   <i class="fa-solid transition-transform duration-300" [class.fa-plus]="activeFaq !== i" [class.fa-minus]="activeFaq === i" [class.rotate-180]="activeFaq === i"></i>
                 </button>
                 <div class="px-6 pb-6 text-gray-400 text-sm leading-relaxed" [class.hidden]="activeFaq !== i">
                   {{faq.answer}}
                 </div>
               </div>
             }
           </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="py-24 bg-gradient-to-b from-[#080C17] to-blue-900/20">
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <p class="text-neon-purple font-bold tracking-widest text-xs uppercase mb-4">Your Cloud Career Starts Now</p>
          <h2 class="text-4xl md:text-6xl font-bold mb-8 font-serif">Stop Watching. Start Building. <br/> Stop Struggling. Start Succeeding.</h2>
          <p class="text-xl text-gray-300 mb-10">9 comprehensive courses. 162+ hands-on labs. AI tutors available 24/7 via chat, voice, and video.</p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <button class="bg-gradient-main text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all hover:-translate-y-1">
              Browse All Courses
              <span class="block text-xs font-normal opacity-80 mt-1">Starting at $199 • 30-day guarantee</span>
            </button>
            <button class="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all hover:-translate-y-1">
              Get Complete Bundle
              <span class="block text-xs font-normal opacity-80 mt-1">All 9 courses + 3mo AI Tutor Pro</span>
            </button>
          </div>
          <p class="text-sm text-gray-500">🎓 Launch pricing — Bundle discount won't last forever</p>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-[#05080F] pt-20 pb-10 border-t border-white/5">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="grid md:grid-cols-4 gap-12 mb-16">
            <div class="col-span-1 md:col-span-1">
              <div class="flex items-center gap-2 mb-6">
                 <div class="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-md flex items-center justify-center">
                   <span class="text-white font-bold">AI</span>
                 </div>
                 <span class="text-xl font-bold font-serif">AI Cloud College</span>
              </div>
              <p class="text-gray-500 text-sm mb-6">Learn Tech with AI That Sees You. The world's first emotionally intelligent learning platform.</p>
              <div class="flex gap-4">
                <a href="#" class="text-gray-400 hover:text-white"><i class="fa-brands fa-twitter"></i></a>
                <a href="#" class="text-gray-400 hover:text-white"><i class="fa-brands fa-linkedin"></i></a>
                <a href="#" class="text-gray-400 hover:text-white"><i class="fa-brands fa-discord"></i></a>
              </div>
            </div>
            
            <div>
              <h4 class="font-bold text-white mb-6">Learning Paths</h4>
              <ul class="space-y-3 text-sm text-gray-400">
                <li><a href="#" class="hover:text-neon-blue">Cloud Engineering</a></li>
                <li><a href="#" class="hover:text-neon-blue">DevOps Mastery</a></li>
                <li><a href="#" class="hover:text-neon-blue">AI & Machine Learning</a></li>
                <li><a href="#" class="hover:text-neon-blue">Platform Engineering</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-white mb-6">Platform</h4>
              <ul class="space-y-3 text-sm text-gray-400">
                <li><a href="#" class="hover:text-neon-blue">How It Works</a></li>
                <li><a href="#" class="hover:text-neon-blue">Meet AI Avatars</a></li>
                <li><a href="#" class="hover:text-neon-blue">Pricing</a></li>
                <li><a href="#" class="hover:text-neon-blue">Labs & Projects</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-white mb-6">Newsletter</h4>
              <p class="text-xs text-gray-500 mb-4">Join 10,000+ subscribers.</p>
              <div class="flex gap-2">
                <input type="email" placeholder="Enter your email" class="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-neon-blue">
                <button class="bg-white/10 px-3 py-2 rounded hover:bg-white/20 text-white"><i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
          
          <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>&copy; 2024 AI Cloud College. All rights reserved.</p>
            <div class="flex gap-6 mt-4 md:mt-0">
               <span>SOC 2 Compliant</span>
               <span>GDPR Compliant</span>
               <span>256-bit Encryption</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class LandingPageComponent implements AfterViewInit {
  login = output<void>();
  activeFaq: number | null = null;

  problems = [
    { icon: 'fa-video', title: 'Video Course Graveyards', description: "You've bought courses that sit at 12% completion. Passive video watching doesn't build job-ready skills." },
    { icon: 'fa-search-minus', title: 'Stack Overflow Rabbit Holes', description: "Hours lost debugging alone. By the time you find the answer, you've forgotten what you were building." },
    { icon: 'fa-comments', title: 'No One to Ask', description: "Stuck at 11 PM on a lab exercise? Forums take days. Mentors cost $200/hour. You give up." },
    { icon: 'fa-robot', title: 'One-Size-Fits-None', description: "Courses don't know if you're confused or bored. They just keep playing while you zone out." }
  ];

  avatars = [
    { name: 'Alex', personality: 'The Patient Guide', style: 'Breaks down complex concepts into simple analogies. Never rushes.' },
    { name: 'Jordan', personality: 'The Efficiency Expert', style: 'Straight to the point. Challenges you to think.' },
    { name: 'Morgan', personality: 'The Deep Technician', style: "Loves the 'why' behind systems. Goes deep on architecture." },
    { name: 'Casey', personality: 'The Motivator', style: 'High energy. Celebrates wins. Keeps you accountable.' }
  ];

  interactionExamples = [
    {
      scenario: "Stuck on a Kubernetes Error",
      type: "Video Call",
      student: "[Shares screen] I've been stuck on this CrashLoopBackOff for an hour!",
      ai: "I can see the issue—your container is exiting because the health check is failing. Let me highlight the line... see how the readinessProbe path doesn't match?",
      icon: "fa-video",
      color: "text-neon-blue",
      outcome: "Resolved in 3 minutes"
    },
    {
      scenario: "Feeling Overwhelmed",
      type: "Emotion-Aware Chat",
      student: "This is impossible. Maybe I'm not cut out for this.",
      ai: "[Detects frustration] I hear you. Terraform can be overwhelming at first. Let's step back and rebuild your confidence with something smaller. One win at a time.",
      icon: "fa-heart-pulse",
      color: "text-pink-500",
      outcome: "Continued learning"
    },
    {
      scenario: "Late Night Question",
      type: "Voice Call",
      student: "[2:34 AM] Can you explain VPC peering? My interview is tomorrow.",
      ai: "Absolutely. Picture two houses that need to share a fence. VPC peering is like building a private gate between them that only they can use...",
      icon: "fa-microphone",
      color: "text-purple-400",
      outcome: "Interview prep at any hour"
    }
  ];

  comparisonRows = [
    { feature: 'Learning Support', traditional: 'Watch videos alone', chatbot: 'Text-based Q&A', ai_cloud: 'Live video calls with AI avatar' },
    { feature: 'When You\'re Stuck', traditional: 'Search forums for hours', chatbot: 'Generic text responses', ai_cloud: 'Avatar sees your screen & guides you' },
    { feature: 'Emotional Awareness', traditional: 'None', chatbot: 'None', ai_cloud: 'Detects frustration & adapts teaching' },
    { feature: 'Hands-On Practice', traditional: 'Set up your own environment', chatbot: 'No lab integration', ai_cloud: 'Integrated cloud labs' },
    { feature: 'Availability', traditional: 'Pre-recorded only', chatbot: 'Text support only', ai_cloud: '24/7 video, voice & chat' }
  ];

  steps = [
    { number: '01', title: 'Choose Your Course', description: 'Pick from 9 comprehensive courses. Each is $199 with lifetime access.', time: '1 minute' },
    { number: '02', title: 'Meet Your AI Tutor', description: 'Select an AI avatar mentor that matches your learning style.', time: '2 minutes' },
    { number: '03', title: 'Learn with Real Labs', description: 'Dive into video lessons and labs. AI tutor is one click away.', time: 'At your pace' },
    { number: '04', title: 'Build & Get Certified', description: 'Complete real projects. Get AI-powered interview prep.', time: 'Weeks, not years' }
  ];

  testimonials = [
    { quote: "The emotion detection is real. When I was getting frustrated, my AI tutor literally said, 'Let's take a breath.'", name: "Aisha Thompson", title: "DevOps Engineer at Stripe", result: "Landed $145K role" },
    { quote: "I'm a visual learner. Being able to screenshare with an AI and say 'show me what's wrong' is exactly how my brain works.", name: "David Okonkwo", title: "Platform Engineer at Netflix", result: "Promoted in 6 months" },
    { quote: "As a mom learning at night, the AI tutor doesn't care if I call at 2 AM. It's patient and available.", name: "Jennifer Walsh", title: "Junior Cloud Developer", result: "Career switch at 38" },
    { quote: "AI Cloud College is the first platform where I actually completed something—and built a real project.", name: "Ryan Park", title: "Solutions Architect at AWS", result: "First course: 100% complete" }
  ];

  courses = [
    { id: 1, icon: 'fa-cloud', name: 'Intro to Cloud Architecture', level: 'Beginner', duration: '6 weeks', labs: 12, description: 'Start here. Learn foundational concepts, core services, and architectural thinking.', ai_enhanced: false },
    { id: 2, icon: 'fa-sitemap', name: 'Advanced Cloud Architecture', level: 'Advanced', duration: '8 weeks', labs: 18, level_color: 'red', description: 'Design enterprise-grade, fault-tolerant systems. Master multi-region deployments.', ai_enhanced: false },
    { id: 3, icon: 'fa-brain', name: 'Cloud Architect Leveraging AI', level: 'Advanced', duration: '8 weeks', labs: 15, level_color: 'purple', description: 'Integrate LLMs and ML pipelines into your designs.', ai_enhanced: true },
    { id: 4, icon: 'fa-shield-halved', name: 'Cybersecurity in the Cloud', level: 'Intermediate', duration: '8 weeks', labs: 20, level_color: 'orange', description: 'Protect infrastructure. Master compliance, pen-testing, and incident response.', ai_enhanced: false },
    { id: 5, icon: 'fa-database', name: 'Data Engineering with AI', level: 'Intermediate', duration: '10 weeks', labs: 22, level_color: 'purple', description: 'Build modern data pipelines enhanced by AI. From ETL to real-time streaming.', ai_enhanced: true },
    { id: 6, icon: 'fa-rocket', name: 'Cloud DevOps with AI', level: 'Intermediate', duration: '10 weeks', labs: 25, level_color: 'purple', description: 'Supercharge DevOps with AI. Automate CI/CD and intelligent monitoring.', ai_enhanced: true },
    { id: 7, icon: 'fa-server', name: 'Storage in the Cloud', level: 'Intermediate', duration: '6 weeks', labs: 14, level_color: 'orange', description: 'Master every storage paradigm. Object, block, file, DBs, and caching.', ai_enhanced: false },
    { id: 8, icon: 'fa-network-wired', name: 'Hybrid Cloud Architecture', level: 'Advanced', duration: '8 weeks', labs: 16, level_color: 'red', description: 'Bridge on-prem and cloud. Design hybrid and multi-cloud architectures.', ai_enhanced: false },
    { id: 9, icon: 'fa-robot', name: 'Cloud Automation', level: 'Intermediate', duration: '8 weeks', labs: 20, level_color: 'orange', description: 'Eliminate manual work. Master Terraform, Ansible, and scripting.', ai_enhanced: false }
  ];

  faqs = [
    { question: 'How much do courses cost?', answer: 'Each course is $199 with lifetime access. Or get the Complete Bundle for $999 (saving $792).' },
    { question: 'What is included in the $199?', answer: 'Lifetime access, all hands-on labs (no extra fees), certificate, downloadable resources, and basic AI chat support.' },
    { question: 'How do AI video calls work?', answer: 'With AI Tutor Pro, click "Call My Tutor" to start a WebRTC video call. The avatar sees your screen and guides you in real-time.' },
    { question: 'Are labs real?', answer: '100% real. You work in actual AWS, Azure, and GCP consoles, not simulations. We provision the environment for you.' },
    { question: 'Is the bundle worth it?', answer: 'Yes, if you want a career. You get 9 courses ($1,791 value) plus 3 months of AI Tutor Pro ($297 value) for just $999.' }
  ];

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    gsap.to('.hero-content', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.to('.hero-media', { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
  }

  onLogin() {
    this.login.emit();
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? null : index;
  }
}