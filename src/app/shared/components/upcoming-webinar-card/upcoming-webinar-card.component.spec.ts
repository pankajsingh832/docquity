import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingWebinarCardComponent } from './upcoming-webinar-card.component';

describe('UpcomingWebinarCardComponent', () => {
  let component: UpcomingWebinarCardComponent;
  let fixture: ComponentFixture<UpcomingWebinarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingWebinarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingWebinarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
