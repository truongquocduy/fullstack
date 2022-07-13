import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessfullstackComponent } from './processfullstack.component';

describe('ProcessfullstackComponent', () => {
  let component: ProcessfullstackComponent;
  let fixture: ComponentFixture<ProcessfullstackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessfullstackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessfullstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
