import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  imports: [CommonModule],
  template: `
    <div class="section-header d-flex justify-content-between align-items-center mb-4">
      <div class="section-title">
        <h4 class="mb-0 fw-bold">{{ title() }}</h4>
        @if (subtitle()) {
          <p class="text-muted mb-0 mt-1">{{ subtitle() }}</p>
        }
      </div>
      
      @if (showViewAll()) {
        <button class="btn btn-link text-decoration-none p-0 view-all-btn">
          View all
          <i class="bi bi-arrow-right ms-1"></i>
        </button>
      }
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: 1.5rem;
    }

    .section-title h4 {
      color: #2c3e50;
      font-size: 1.5rem;
      
      @media (max-width: 768px) {
        font-size: 1.25rem;
      }
    }

    .section-title p {
      font-size: 0.9rem;
    }

    .view-all-btn {
      color: #007bff;
      font-weight: 500;
      font-size: 0.9rem;
      transition: color 0.3s ease;
      
      &:hover {
        color: #0056b3;
        
        i {
          transform: translateX(2px);
        }
      }
      
      i {
        transition: transform 0.3s ease;
      }
    }

    @media (max-width: 768px) {
      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  showViewAll = input<boolean>(true);
}
