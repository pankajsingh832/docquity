import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div class="container-fluid px-4">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <div class="logo-circle me-2">
            <i class="bi bi-play-circle-fill text-primary"></i>
          </div>
          <span class="fw-bold text-dark">Webinar Platform</span>
        </a>

        <!-- Mobile menu toggle -->
        <button 
          class="navbar-toggler border-0" 
          type="button" 
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen()">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Menu -->
        <div class="collapse navbar-collapse" [class.show]="isMobileMenuOpen()">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active fw-medium" routerLink="/" routerLinkActive="active">
                <i class="bi bi-house me-1"></i>Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-medium" routerLink="/webinars">
                <i class="bi bi-camera-video me-1"></i>Webinars
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-medium" routerLink="/calendar">
                <i class="bi bi-calendar me-1"></i>Calendar
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-medium" routerLink="/notifications">
                <i class="bi bi-bell me-1"></i>Notifications
              </a>
            </li>
          </ul>

          <!-- Right side items -->
          <div class="d-flex align-items-center gap-3">
            <!-- Search -->
            <div class="search-container d-none d-md-block">
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                  <i class="bi bi-search text-muted"></i>
                </span>
                <input 
                  type="text" 
                  class="form-control border-start-0 bg-light" 
                  placeholder="Search webinars..."
                  style="box-shadow: none;">
              </div>
            </div>

            <!-- Profile -->
            <div class="dropdown">
              <button 
                class="btn btn-link text-decoration-none p-0 dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown">
                <div class="d-flex align-items-center">
                  <div class="profile-avatar me-2">
                    <img 
                      src="/assets/images/avatar.jpg" 
                      alt="Profile" 
                      class="rounded-circle"
                      width="32" 
                      height="32"
                      onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTBDNi45IDEwIDYgOS4xIDYgOEM2IDYuOSA2LjkgNiA4IDZDOS4xIDYgMTAgNi45IDEwIDhDMTAgOS4xIDkuMSAxMCA4IDEwWk04IDEyQzEwLjY3IDEyIDEzIDEzLjM0IDEzIDE2SDE2VjE2SDNWMTZDMTM2IDEzLjM0IDUuMzMgMTIgOCAxMloiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+Cjwvc3ZnPgo='">
                  </div>
                  <span class="d-none d-md-inline text-dark">John Doe</span>
                </div>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
                <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1030;
    }

    .logo-circle i {
      font-size: 1.5rem;
    }

    .navbar-brand {
      font-size: 1.25rem;
    }

    .nav-link {
      color: #6c757d !important;
      transition: color 0.3s ease;
      
      &:hover {
        color: #007bff !important;
      }
      
      &.active {
        color: #007bff !important;
        font-weight: 600;
      }
    }

    .search-container {
      width: 300px;
    }

    .input-group-text {
      border: 1px solid #e9ecef;
    }

    .form-control {
      border: 1px solid #e9ecef;
      
      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
    }

    .profile-avatar img {
      object-fit: cover;
    }

    .dropdown-toggle::after {
      display: none;
    }

    @media (max-width: 768px) {
      .navbar-nav {
        margin-top: 1rem;
      }
      
      .nav-link {
        padding: 0.75rem 0;
        border-bottom: 1px solid #f8f9fa;
      }
    }
  `]
})
export class HeaderComponent {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }
}
