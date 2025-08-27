import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebinarService } from '../../core/services/webinar.service';
import { WebinarCardComponent } from '../../shared/components/webinar-card/webinar-card.component';
import { ContinueWatchingCardComponent } from '../../shared/components/continue-watching-card/continue-watching-card.component';
import { UpcomingWebinarCardComponent } from '../../shared/components/upcoming-webinar-card/upcoming-webinar-card.component';
import { SuggestedWebinarCardComponent } from '../../shared/components/suggested-webinar-card/suggested-webinar-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

interface Speaker {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  isLive: boolean;
}

interface Topic {
  id: string;
  name: string;
  count: number;
  isActive: boolean;
}

interface Filters {
  specialty: boolean;
  topics: boolean;
  speakers: boolean;
  pharmaAssociations: boolean;
}

@Component({
  selector: 'app-webinar-dashboard',
  imports: [CommonModule, FormsModule, WebinarCardComponent, ContinueWatchingCardComponent, UpcomingWebinarCardComponent, SuggestedWebinarCardComponent, SectionHeaderComponent],
  templateUrl: './webinar-dashboard.component.html',
  styleUrl: './webinar-dashboard.component.scss'
})
export class WebinarDashboardComponent {
  private webinarService = inject(WebinarService);

  liveWebinars = this.webinarService.liveWebinars;
  upcomingWebinars = this.webinarService.upcomingWebinars;
  continueWatching = this.webinarService.continueWatching;
  cardiologyWebinars = this.webinarService.cardiologyWebinars;
  webinarsYouMayLike = this.webinarService.webinarsYouMayLike;

  // Search and filter properties
  searchQuery = signal<string>('');
  filters = signal<Filters>({
    specialty: false,
    topics: false,
    speakers: false,
    pharmaAssociations: false
  });

  // Computed filtered webinars
  filteredWebinarsYouMayLike = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const webinars = this.webinarsYouMayLike();
    
    if (!query) {
      return webinars;
    }
    
    return webinars.filter(webinar => 
      webinar.title.toLowerCase().includes(query) ||
      webinar.instructor.name.toLowerCase().includes(query) ||
      webinar.description?.toLowerCase().includes(query)
    );
  });

  // Top speakers data
  topSpeakers = signal<Speaker[]>([
    {
      id: '1',
      name: 'Dr Chong wui',
      specialty: 'Gastrologist, General Phys...',
      avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
      isLive: true
    },
    {
      id: '2',
      name: 'Dr Wuyama Guramg',
      specialty: 'Gastroenterologist, Surgeon',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
      isLive: false
    },
    {
      id: '3',
      name: 'Dr Wuyama Guramg',
      specialty: 'Gastroenterologist, Surgeon',
      avatarUrl: 'https://images.unsplash.com/photo-1594824501508-3493b3a11b1b?w=80&h=80&fit=crop&crop=face',
      isLive: false
    },
    {
      id: '4',
      name: 'Dr Wuyama Guramg',
      specialty: 'Cardiologist',
      avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face',
      isLive: false
    },
    {
      id: '5',
      name: 'Dr Shanya suian',
      specialty: 'Orthodontist',
      avatarUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&crop=face',
      isLive: false
    }
  ]);

  // Browse topics data
  browseTopics = signal<Topic[]>([
    { id: '1', name: 'Cardiologist', count: 4, isActive: false },
    { id: '2', name: 'Emergency', count: 2, isActive: false },
    { id: '3', name: 'General Medicine', count: 9, isActive: false },
    { id: '4', name: 'General Medicine', count: 4, isActive: false },
    { id: '5', name: 'Emergency Medicine', count: 8, isActive: false },
    { id: '6', name: 'General Medicine', count: 4, isActive: false },
    { id: '7', name: 'Emergency Medicine', count: 8, isActive: false },
    { id: '8', name: 'Cardiologist', count: 4, isActive: false },
    { id: '9', name: 'General Medicine', count: 9, isActive: false },
    { id: '10', name: 'General Medicine', count: 4, isActive: false },
    { id: '11', name: 'Emergency', count: 2, isActive: false },
    { id: '12', name: 'Cardiologist', count: 4, isActive: false }
  ]);

  getProgressPercentage(index: number): number {
    // Return different progress percentages for variety
    const progressValues = [75, 45, 85, 30, 60, 90, 20, 65];
    return progressValues[index % progressValues.length];
  }

  // Filter update methods
  updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  updateSpecialtyFilter(value: boolean): void {
    this.filters.update(f => ({ ...f, specialty: value }));
  }

  updateTopicsFilter(value: boolean): void {
    this.filters.update(f => ({ ...f, topics: value }));
  }

  updateSpeakersFilter(value: boolean): void {
    this.filters.update(f => ({ ...f, speakers: value }));
  }

  updatePharmaAssociationsFilter(value: boolean): void {
    this.filters.update(f => ({ ...f, pharmaAssociations: value }));
  }
}
