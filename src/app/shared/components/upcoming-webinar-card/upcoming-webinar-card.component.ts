import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-upcoming-webinar-card',
  imports: [CommonModule],
  templateUrl: './upcoming-webinar-card.component.html',
  styleUrl: './upcoming-webinar-card.component.scss'
})
export class UpcomingWebinarCardComponent {
  webinar = input.required<Webinar>();

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTcyIiBoZWlnaHQ9IjMzNiIgdmlld0JveD0iMCAwIDU3MiAzMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1NzIiIGhlaWdodD0iMzM2IiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0yNTYgMTM2SDMxNlYyMDBIMjU2VjEzNloiIGZpbGw9IiNERUUyRTYiLz4KPHBhdGggZD0iTTI3MiAxNjhMMjk2IDE4MEwyNzIgMTkyVjE2OFoiIGZpbGw9IiM5QzlDQTAiLz4KPHR5eHQgeD0iMjg2IiB5PSIyMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZDNjc3RCI+V2ViaW5hcjwvdGV4dD4KPC9zdmc+Cg==';
  }

  onInstructorImageError(event: any): void {
    const firstLetter = this.webinar().instructor.name.charAt(0).toUpperCase();
    event.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#6C757D"/>
        <text x="12" y="16" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="white">${firstLetter}</text>
      </svg>
    `)}`;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  }

  getExpiryDays(): number {
    // Calculate days until expiry (mock calculation)
    return 20;
  }
}
