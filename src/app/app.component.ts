import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <div class="container-fluid px-4">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      background-color: #f8f9fa;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .main-content {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      
      .container-fluid {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'webinar-platform';
}
