import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Webinar } from '../../core/models/webinar.model';

@Component({
  selector: 'app-webinar-card',
  imports: [CommonModule],
  template: `
    <div class="webinar-card h-100" [class.live-card]="webinar().isLive">
      <!-- Thumbnail -->
      <div class="thumbnail-container position-relative">
        <img 
          [src]="webinar().thumbnailUrl" 
          [alt]="webinar().title"
          class="card-img-top thumbnail"
          onerror="this.src='/assets/images/placeholder.jpg'">
        
        <!-- Live indicator -->
        @if (webinar().isLive) {
          <div class="live-indicator">
            <span class="badge bg-danger d-flex align-items-center">
              <i class="bi bi-record-circle-fill me-1"></i>
              Live
            </span>
            <span class="participants-count ms-2">
              <i class="bi bi-people-fill me-1"></i>
              {{ webinar().participants }}
            </span>
          </div>
        }
        
        <!-- Duration -->
        <div class="duration-badge">
          {{ webinar().duration }}
        </div>
        
        <!-- Play button overlay -->
        <div class="play-overlay">
          <button class="btn btn-play">
            <i class="bi bi-play-fill"></i>
          </button>
        </div>
      </div>

      <!-- Card content -->
      <div class="card-body p-3">
        <!-- Credits and tags -->
        <div class="d-flex justify-content-between align-items-start mb-2">
          @if (webinar().credits > 0) {
            <span class="badge bg-warning text-dark">
              <i class="bi bi-star-fill me-1"></i>
              {{ webinar().credits }} Credits
            </span>
          }
          
          @if (webinar().tags && webinar().tags.length > 0) {
            <div class="tags">
              @for (tag of webinar().tags; track tag) {
                <span class="badge bg-light text-muted small">{{ tag }}</span>
              }
            </div>
          }
        </div>

        <!-- Title -->
        <h6 class="card-title mb-2 line-clamp-2">
          {{ webinar().title }}
        </h6>

        <!-- Instructor info -->
        <div class="instructor-info d-flex align-items-center mb-3">
          <img 
            [src]="webinar().instructor.avatarUrl" 
            [alt]="webinar().instructor.name"
            class="instructor-avatar me-2"
            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgNy41QzUuMTc1IDcuNSA0LjUgNi44MjUgNC41IDZDNC41IDUuMTc1IDUuMTc1IDQuNSA2IDQuNUM2LjgyNSA0LjUgNy41IDUuMTc1IDcuNSA2QzcuNSA2LjgyNSA2LjgyNSA3LjUgNiA3LjVaTTYgOUM4LjAwNSA5IDkuNzUgMTAuMDA1IDkuNzUgMTJIMTJWMTJIMFYxMkMwIDEwLjAwNSAxLjk5NSA5IDYgOVoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+Cjwvc3ZnPgo='">
          <div class="instructor-details">
            <div class="instructor-name">by {{ webinar().instructor.name }}</div>
            <div class="instructor-org text-muted small">{{ webinar().instructor.organization }}</div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="card-actions">
          @if (webinar().isLive) {
            <button class="btn btn-primary btn-sm w-100">
              <i class="bi bi-play-circle me-1"></i>
              Watch now
            </button>
          } @else if (webinar().isUpcoming) {
            <div class="d-flex gap-2">
              <button 
                class="btn btn-outline-primary btn-sm flex-grow-1"
                [class.btn-primary]="webinar().isNotificationEnabled"
                [class.text-white]="webinar().isNotificationEnabled">
                <i class="bi" [class.bi-bell]="!webinar().isNotificationEnabled" 
                    [class.bi-bell-fill]="webinar().isNotificationEnabled"></i>
                {{ webinar().isNotificationEnabled ? 'Notified' : 'Notify me' }}
              </button>
              <button class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-calendar-plus"></i>
              </button>
            </div>
          } @else {
            <button class="btn btn-outline-primary btn-sm w-100">
              <i class="bi bi-play-circle me-1"></i>
              Continue watching
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .webinar-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      overflow: hidden;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
      
      &.live-card {
        border: 2px solid #dc3545;
      }
    }

    .thumbnail-container {
      overflow: hidden;
      aspect-ratio: 16/9;
      
      .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    .webinar-card:hover .thumbnail {
      transform: scale(1.05);
    }

    .live-indicator {
      position: absolute;
      top: 12px;
      left: 12px;
      display: flex;
      align-items: center;
      z-index: 2;
      
      .participants-count {
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
      }
    }

    .duration-badge {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .play-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .webinar-card:hover .play-overlay {
      opacity: 1;
    }

    .btn-play {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #007bff;
      transition: all 0.3s ease;
      
      &:hover {
        background: white;
        transform: scale(1.1);
      }
    }

    .card-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #2c3e50;
      line-height: 1.4;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .instructor-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }

    .instructor-name {
      font-size: 0.85rem;
      color: #6c757d;
      font-weight: 500;
    }

    .instructor-org {
      font-size: 0.75rem;
      line-height: 1.2;
    }

    .tags .badge {
      font-size: 0.7rem;
      margin-left: 4px;
    }

    .card-actions {
      margin-top: auto;
    }

    .btn-sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .webinar-card {
        margin-bottom: 1rem;
      }
      
      .card-title {
        font-size: 0.9rem;
      }
      
      .instructor-name {
        font-size: 0.8rem;
      }
    }
  `]
})
export class WebinarCardComponent {
  webinar = input.required<Webinar>();
}
