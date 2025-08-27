import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, CalendarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobileMenuOpen = signal(false);
  isCalendarOpen = signal(false);
  selectedCalendarDate = signal<Date | null>(null);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleCalendar(): void {
    this.isCalendarOpen.update(open => !open);
  }

  onDateSelected(date: Date): void {
    this.selectedCalendarDate.set(date);
    this.isCalendarOpen.set(false);
    console.log('Selected date:', date);
  }

  closeCalendar(): void {
    this.isCalendarOpen.set(false);
  }

  onProfileImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2Qzc1N0QiLz4KPHRleHQgeD0iMTYiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+SkQ8L3RleHQ+Cjwvc3ZnPgo=';
  }
}
