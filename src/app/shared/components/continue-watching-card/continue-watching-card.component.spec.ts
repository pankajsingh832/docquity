import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueWatchingCardComponent } from './continue-watching-card.component';

describe('ContinueWatchingCardComponent', () => {
  let component: ContinueWatchingCardComponent;
  let fixture: ComponentFixture<ContinueWatchingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueWatchingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinueWatchingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
