import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-suggested-webinar-card',
  imports: [CommonModule],
  templateUrl: './suggested-webinar-card.component.html',
  styleUrl: './suggested-webinar-card.component.scss'
})
export class SuggestedWebinarCardComponent {
  webinar = input.required<Webinar>();

  onImageError(event: any) {
    // Try local placeholder first, then a reliable fallback
    const target = event.target;
    if (target.src.includes('placeholder.jpg')) {
      // If placeholder also fails, use a solid color background
      target.style.display = 'none';
      target.parentElement.style.backgroundColor = '#e9ecef';
      target.parentElement.style.display = 'flex';
      target.parentElement.style.alignItems = 'center';
      target.parentElement.style.justifyContent = 'center';
      target.parentElement.innerHTML = '<div style="color: #6c757d; font-size: 14px;">Image not available</div>';
    } else {
      target.src = 'assets/images/placeholder.jpg';
    }
  }

  onInstructorImageError(event: any) {
    // Use a simple avatar placeholder
    const target = event.target;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNlOWVjZWYiLz4KPHN2ZyB4PSIxMiIgeT0iMTAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyOCI+CjxwYXRoIGQ9Ik0xMiA2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6bTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMnYySDEydi0yeiIgZmlsbD0iIzZjNzU3ZCIvPgo8L3N2Zz4KPC9zdmc+';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }

  getExpiryDays(): number {
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 30); // Assuming 30 days expiry
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
