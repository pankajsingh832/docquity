import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-webinar-card',
  imports: [CommonModule],
  templateUrl: './webinar-card.component.html',
  styleUrl: './webinar-card.component.scss'
})
export class WebinarCardComponent {
  webinar = input.required<Webinar>();

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNDQgNzJIMTc2VjEwOEgxNDRWNzJaIiBmaWxsPSIjREVFMkU2Ii8+CjxwYXRoIGQ9Ik0xNTIgODhMMTY4IDk2TDE1MiAxMDRWODhaIiBmaWxsPSIjOUM5Q0EwIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2QzY3N0QiPldlYmluYXI8L3RleHQ+Cjwvc3ZnPgo=';
  }

  onAvatarError(event: any): void {
    const firstLetter = this.webinar().instructor.name.charAt(0).toUpperCase();
    event.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#6C757D"/>
        <text x="12" y="16" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="white">${firstLetter}</text>
      </svg>
    `)}`;
  }
}
