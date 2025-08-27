import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-continue-watching-card',
  imports: [CommonModule],
  templateUrl: './continue-watching-card.component.html',
  styleUrl: './continue-watching-card.component.scss'
})
export class ContinueWatchingCardComponent {
  webinar = input.required<Webinar>();
  progressPercentage = input<number>(75); // Default 75% watched

  getTimeLeft(): number {
    const totalMinutes = this.parseDuration(this.webinar().duration);
    const remainingPercentage = 100 - this.progressPercentage();
    return Math.round((totalMinutes * remainingPercentage) / 100);
  }

  private parseDuration(duration: string): number {
    // Parse duration like "24:50" to minutes
    const parts = duration.split(':');
    return parseInt(parts[0]) + (parseInt(parts[1]) / 60);
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDI0MCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTQ0IiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMDggNTRIMTMyVjkwSDEwOFY1NFoiIGZpbGw9IiNERUUyRTYiLz4KPHBhdGggZD0iTTExNCA2NkwxMjYgNzJMMTE0IDc4VjY2WiIgZmlsbD0iIzlDOUNBMCIvPgo8dGV4dCB4PSIxMjAiIHk9IjEwOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNkM2NzdEIj5XZWJpbmFyPC90ZXh0Pgo8L3N2Zz4K';
  }

  onAvatarError(event: any): void {
    const firstLetter = this.webinar().instructor.name.charAt(0).toUpperCase();
    event.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#6C757D"/>
        <text x="10" y="13" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="white">${firstLetter}</text>
      </svg>
    `)}`;
  }
}
