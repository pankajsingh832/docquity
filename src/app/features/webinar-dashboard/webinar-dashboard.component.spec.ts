import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarDashboardComponent } from './webinar-dashboard.component';

describe('WebinarDashboardComponent', () => {
  let component: WebinarDashboardComponent;
  let fixture: ComponentFixture<WebinarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebinarDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebinarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
