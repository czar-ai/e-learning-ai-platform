import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page.component';
import { DashboardComponent } from './components/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LandingPageComponent, DashboardComponent],
  template: `
    @if (isLoggedIn()) {
      <app-dashboard (logout)="isLoggedIn.set(false)"></app-dashboard>
    } @else {
      <app-landing-page (login)="isLoggedIn.set(true)"></app-landing-page>
    }
  `
})
export class AppComponent {
  isLoggedIn = signal(false);
}