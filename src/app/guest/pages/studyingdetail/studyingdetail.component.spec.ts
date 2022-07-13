import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyingdetailComponent } from './studyingdetail.component';

describe('StudyingdetailComponent', () => {
  let component: StudyingdetailComponent;
  let fixture: ComponentFixture<StudyingdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyingdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
