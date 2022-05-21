import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDentistaComponent } from './modal-dentista.component';

describe('ModalDentistaComponent', () => {
  let component: ModalDentistaComponent;
  let fixture: ComponentFixture<ModalDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDentistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
