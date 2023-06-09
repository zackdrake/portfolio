import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingProgressBarComponent } from './reading-progress-bar.component';

describe('ReadingProgressBarComponent', () => {
  let component: ReadingProgressBarComponent;
  let fixture: ComponentFixture<ReadingProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
