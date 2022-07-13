import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudypageComponent } from './studypage.component';

describe('StudypageComponent', () => {
  let component: StudypageComponent;
  let fixture: ComponentFixture<StudypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudypageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
