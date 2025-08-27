import { Component, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasEvents: boolean;
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  dateSelected = output<Date>();
  
  currentDate = signal(new Date());
  selectedDate = signal<Date | null>(null);
  
  currentMonth = computed(() => this.currentDate().getMonth());
  currentYear = computed(() => this.currentDate().getFullYear());
  
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  calendarDays = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const today = new Date();
    const selectedDate = this.selectedDate();
    
    // First day of the month and last day
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Start from the first Sunday of the calendar grid
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
    
    // Create 42 days (6 weeks) for the calendar grid
    const days: CalendarDay[] = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();
      
      // Mock some events (you can replace this with actual event data)
      const hasEvents = Math.random() > 0.8 && isCurrentMonth;
      
      days.push({
        date: new Date(currentDate),
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected: !!isSelected,
        hasEvents
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  });
  
  get currentMonthName(): string {
    return this.monthNames[this.currentMonth()];
  }
  
  previousMonth(): void {
    const newDate = new Date(this.currentDate());
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentDate.set(newDate);
  }
  
  nextMonth(): void {
    const newDate = new Date(this.currentDate());
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentDate.set(newDate);
  }
  
  selectDate(day: CalendarDay): void {
    if (day.isCurrentMonth) {
      this.selectedDate.set(day.date);
      this.dateSelected.emit(day.date);
    }
  }
  
  goToToday(): void {
    const today = new Date();
    this.currentDate.set(today);
    this.selectedDate.set(today);
    this.dateSelected.emit(today);
  }
}
