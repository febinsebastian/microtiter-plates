import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateSelectorComponent } from './plate-selector.component';

describe('PlateSelectorComponent', () => {
  let component: PlateSelectorComponent;
  let fixture: ComponentFixture<PlateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
