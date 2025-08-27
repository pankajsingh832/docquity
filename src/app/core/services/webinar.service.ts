import { Injectable, signal, computed } from '@angular/core';
import { Webinar, WebinarFilter, WebinarCategory, Instructor } from '../models/webinar.model';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
  private webinarsSignal = signal<Webinar[]>(this.generateMockData());
  private filterSignal = signal<WebinarFilter>({});

  // Public readonly signals
  webinars = this.webinarsSignal.asReadonly();
  filter = this.filterSignal.asReadonly();

  // Computed filtered webinars
  filteredWebinars = computed(() => {
    const webinars = this.webinarsSignal();
    const filter = this.filterSignal();
    
    return webinars.filter(webinar => {
      if (filter.category && webinar.category !== filter.category) {
        return false;
      }
      
      if (filter.isLive !== undefined && webinar.isLive !== filter.isLive) {
        return false;
      }
      
      if (filter.isUpcoming !== undefined && webinar.isUpcoming !== filter.isUpcoming) {
        return false;
      }
      
      if (filter.searchTerm) {
        const searchTerm = filter.searchTerm.toLowerCase();
        return webinar.title.toLowerCase().includes(searchTerm) ||
               webinar.description.toLowerCase().includes(searchTerm) ||
               webinar.instructor.name.toLowerCase().includes(searchTerm);
      }
      
      return true;
    });
  });

  // Computed categories for navigation
  liveWebinars = computed(() => 
    this.filteredWebinars().filter(w => w.isLive)
  );

  upcomingWebinars = computed(() => 
    this.filteredWebinars().filter(w => w.isUpcoming)
  );

  continueWatching = computed(() =>
    this.filteredWebinars().filter(w => !w.isLive && !w.isUpcoming).slice(0, 5)
  );

  cardiologyWebinars = computed(() =>
    this.filteredWebinars().filter(w => w.category === WebinarCategory.CARDIOLOGY)
  );

  webinarsYouMayLike = computed(() =>
    this.filteredWebinars().filter(w => !w.isLive && !w.isUpcoming).slice(0, 4)
  );

  updateFilter(filter: Partial<WebinarFilter>): void {
    this.filterSignal.update(current => ({ ...current, ...filter }));
  }

  clearFilter(): void {
    this.filterSignal.set({});
  }

  getWebinarById(id: string): Webinar | undefined {
    return this.webinarsSignal().find(w => w.id === id);
  }

  private generateMockData(): Webinar[] {
    const instructors: Instructor[] = [
      {
        id: '1',
        name: 'Pfizer Indo...',
        title: 'Medical Professional',
        organization: 'Pfizer Indonesia',
        avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=48&h=48&fit=crop&crop=face'
      },
      {
        id: '2',
        name: 'Bayer',
        title: 'Medical Professional',
        organization: 'Bayer',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&crop=face'
      },
      {
        id: '3',
        name: 'Dr. Rayni',
        title: 'Pediatrician',
        organization: 'PDG Indonesia',
        avatarUrl: 'https://images.unsplash.com/photo-1594824501508-3493b3a11b1b?w=48&h=48&fit=crop&crop=face'
      }
    ];

    return [
      // Continue watching webinars with exact titles from the image
      {
        id: '1',
        title: 'New Perspectives in The Covid19 Management',
        description: 'Latest insights in COVID-19 treatment and management strategies',
        instructor: instructors[0],
        date: new Date('2025-07-15T10:00:00'),
        duration: '24:50',
        isLive: false,
        isUpcoming: false,
        credits: 0,
        participants: 150,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=320&h=180&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['10 min left']
      },
      {
        id: '2',
        title: 'Perspectives in The Covid19 Management',
        description: 'Comprehensive COVID-19 management review and best practices',
        instructor: instructors[1],
        date: new Date('2025-07-10T10:00:00'),
        duration: '24:50',
        isLive: false,
        isUpcoming: false,
        credits: 0,
        participants: 180,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=320&h=180&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['10 min left']
      },
      {
        id: '3',
        title: 'New Perspectives in The 12',
        description: 'Advanced medical perspectives and treatment approaches',
        instructor: instructors[1],
        date: new Date('2025-07-20T10:00:00'),
        duration: '24:50',
        isLive: false,
        isUpcoming: false,
        credits: 0,
        participants: 120,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=320&h=180&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['10 min left']
      },
      {
        id: '4',
        title: 'New Perspectives in The 12',
        description: 'Continued exploration of medical perspectives',
        instructor: instructors[1],
        date: new Date('2025-07-18T10:00:00'),
        duration: '24:50',
        isLive: false,
        isUpcoming: false,
        credits: 0,
        participants: 95,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=320&h=180&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['10 min left']
      },
      {
        id: '5',
        title: 'More Than Skin Deep: Treating Eczema and Allergy',
        description: 'Comprehensive approach to eczema and allergy treatment',
        instructor: instructors[2],
        date: new Date('2025-07-22T10:00:00'),
        duration: '24:50',
        isLive: false,
        isUpcoming: false,
        credits: 0,
        participants: 110,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=320&h=180&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['5 min left']
      },
      // Live webinars - matching the image exactly
      {
        id: '6',
        title: 'Controversies in Bipolar Disorder (BP-1): Implications for Asthama from',
        description: 'Comprehensive discussion on bipolar disorder management',
        instructor: {
          id: '4',
          name: 'PDGI Indonesia',
          title: 'Medical Professional',
          organization: 'PDGI Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-08-26T10:00:00'),
        duration: '24:50',
        isLive: true,
        isUpcoming: false,
        credits: 2,
        participants: 200,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=320&h=180&fit=crop',
        category: WebinarCategory.RESPIRATORY,
        tags: ['Manage chronic and complex diseases'],
        cardType: 'live-video'
      },
      {
        id: '7',
        title: 'Virus is like any other respiratory virus that causes common',
        description: 'Understanding respiratory viruses and their management',
        instructor: {
          id: '5',
          name: 'GSK',
          title: 'Medical Professional',
          organization: 'GSK',
          avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-08-26T11:00:00'),
        duration: '24:50',
        isLive: true,
        isUpcoming: false,
        credits: 1.5,
        participants: 200,
        thumbnailUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=320&h=180&fit=crop',
        category: WebinarCategory.RESPIRATORY,
        tags: ['Expiring in 23h 30m', 'Manage chronic and complex diseases'],
        cardType: 'live-video'
      },
      {
        id: '8',
        title: 'Virus is like any other respiratory virus that causes common',
        description: 'Advanced perspectives on respiratory virus management',
        instructor: {
          id: '6',
          name: 'Bayer',
          title: 'Medical Professional',
          organization: 'Bayer',
          avatarUrl: 'https://images.unsplash.com/photo-1594824501508-3493b3a11b1b?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-08-26T12:00:00'),
        duration: '24:50',
        isLive: true,
        isUpcoming: false,
        credits: 2,
        participants: 200,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=320&h=180&fit=crop',
        category: WebinarCategory.RESPIRATORY,
        tags: ['Manage chronic and complex diseases'],
        cardType: 'live-video'
      },
      // Upcoming webinars
      {
        id: '7',
        title: 'Allergy X-Series ep.1 Asthma from Pediatric Allergy Perspective',
        description: 'Comprehensive guide to pediatric asthma management from allergy perspective',
        instructor: {
          id: '7',
          name: 'dr. Erwanto Budi Winulyo',
          title: 'Pediatric Allergist',
          organization: 'Medical Professional',
          avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-08-28T10:00:00'),
        duration: '45:00',
        isLive: false,
        isUpcoming: true,
        credits: 1.5,
        participants: 0,
        thumbnailUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=300&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['Manage chronic and complex diseases'],
        isNotificationEnabled: false
      },
      {
        id: '11',
        title: '101 Hal tentang PPDS Bedah Umum FKUI dan Karir Bedah Umum',
        description: 'Complete guide to General Surgery residency program at FKUI and career prospects',
        instructor: {
          id: '8',
          name: 'dr. Yudianty Lesmana',
          title: 'General Surgeon',
          organization: 'FKUI',
          avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-08-30T14:00:00'),
        duration: '60:00',
        isLive: false,
        isUpcoming: true,
        credits: 2.0,
        participants: 0,
        thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
        category: WebinarCategory.GENERAL,
        tags: ['Surgery Career'],
        isNotificationEnabled: false
      },
      {
        id: '12',
        title: 'Pemeriksaan Rotavirus Pada Feses',
        description: 'Diagnostic approaches for rotavirus detection in stool samples',
        instructor: {
          id: '9',
          name: 'dr. Sukma SrPK(K)',
          title: 'Clinical Pathologist',
          organization: 'Medical Professional',
          avatarUrl: 'https://images.unsplash.com/photo-1594824501508-3493b3a11b1b?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-09-01T15:00:00'),
        duration: '50:00',
        isLive: false,
        isUpcoming: true,
        credits: 2.0,
        participants: 0,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
        category: WebinarCategory.GENERAL,
        tags: ['Laboratory Diagnosis'],
        isNotificationEnabled: false
      },
      // Cardiology webinars
      {
        id: '8',
        title: 'The Covid19 Management of Parox Health caretime',
        description: 'Comprehensive approach to COVID-19 management in cardiology',
        instructor: {
          id: '4',
          name: 'PDGI Indonesia',
          title: 'Medical Professional',
          organization: 'PDGI Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-07-20T10:00:00'),
        duration: '24:50',
        isLive: false,
        isUpcoming: false,
        credits: 2,
        participants: 120,
        thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=320&h=180&fit=crop',
        category: WebinarCategory.CARDIOLOGY,
        tags: ['Cardiology'],
        cardType: 'blue-medical'
      },
      {
        id: '9',
        title: 'New Perspectives in The Covid19 Management of Parox Health caretime...',
        description: 'Advanced perspectives on COVID-19 cardiology management',
        instructor: {
          id: '5',
          name: 'PDGI Indonesia',
          title: 'Medical Professional',
          organization: 'PDGI Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-01-07T12:30:00'),
        duration: '24:50',
        isLive: false,
        isUpcoming: true,
        credits: 3,
        participants: 0,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=320&h=180&fit=crop',
        category: WebinarCategory.CARDIOLOGY,
        tags: ['Goes live on 7 Jan 2025, 12:30 PM'],
        cardType: 'green-medical',
        isNotificationEnabled: false
      },
      {
        id: '10',
        title: 'Metapneumovirus is like any other respiratory virus that causes common',
        description: 'Understanding metapneumovirus and respiratory conditions',
        instructor: {
          id: '6',
          name: 'Bayer Indonesia',
          title: 'Medical Professional',
          organization: 'Bayer Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1594824501508-3493b3a11b1b?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-12-15T10:00:00'),
        duration: '24:50',
        isLive: true,
        isUpcoming: false,
        credits: 1.5,
        participants: 200,
        thumbnailUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=320&h=180&fit=crop',
        category: WebinarCategory.CARDIOLOGY,
        tags: ['till 15 Dec 2024'],
        cardType: 'live-video'
      },
      // Additional webinars for "Webinars you may like" section
      {
        id: '13',
        title: 'Perspectives in The Covid19 Management of Parox Health caretime',
        description: 'Comprehensive approach to COVID-19 management perspectives',
        instructor: {
          id: '10',
          name: 'PDGI Indonesia',
          title: 'Medical Professional',
          organization: 'PDGI Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-08-15T10:00:00'),
        duration: '45:00',
        isLive: false,
        isUpcoming: false,
        credits: 1.5,
        participants: 20,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=320&h=180&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['Manage chronic and complex diseases'],
        cardType: 'blue-medical'
      },
      {
        id: '14',
        title: 'New Perspectives in The Covid19 Management of Parox Health caretime',
        description: 'Advanced perspectives on COVID-19 health management',
        instructor: {
          id: '11',
          name: 'PDGI Indonesia',
          title: 'Medical Professional',
          organization: 'PDGI Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-07-15T10:00:00'),
        duration: '50:00',
        isLive: false,
        isUpcoming: false,
        credits: 2,
        participants: 20,
        thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=320&h=180&fit=crop',
        category: WebinarCategory.INTERNAL_MEDICINE,
        tags: ['Manage chronic and complex diseases'],
        cardType: 'green-medical'
      },
      {
        id: '15',
        title: 'More Than Skin Deep: Treating Eczema and Allergy',
        description: 'Comprehensive guide to eczema and allergy treatment approaches',
        instructor: {
          id: '12',
          name: 'PDGI Indonesia',
          title: 'Dermatologist',
          organization: 'PDGI Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1594824501508-3493b3a11b1b?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-06-15T14:00:00'),
        duration: '60:00',
        isLive: false,
        isUpcoming: false,
        credits: 2,
        participants: 20,
        thumbnailUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=320&h=180&fit=crop',
        category: WebinarCategory.GENERAL,
        tags: ['Dermatology and Allergy'],
        cardType: 'blue-medical'
      },
      {
        id: '16',
        title: 'Immunization for a Healthier Tomorrow',
        description: 'Essential immunization strategies for better health outcomes',
        instructor: {
          id: '13',
          name: 'PDGI Indonesia',
          title: 'Immunologist',
          organization: 'PDGI Indonesia',
          avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=48&h=48&fit=crop&crop=face'
        },
        date: new Date('2025-05-15T10:00:00'),
        duration: '45:00',
        isLive: false,
        isUpcoming: false,
        credits: 1.5,
        participants: 24,
        thumbnailUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=320&h=180&fit=crop',
        category: WebinarCategory.GENERAL,
        tags: ['Immunization Strategies'],
        cardType: 'default'
      }
    ];
  }
}
