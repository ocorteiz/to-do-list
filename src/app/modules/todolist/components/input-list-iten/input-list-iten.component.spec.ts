import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListItenComponent } from './input-list-iten.component';

describe('InputListItenComponent', () => {
  let component: InputListItenComponent;
  let fixture: ComponentFixture<InputListItenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputListItenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputListItenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
