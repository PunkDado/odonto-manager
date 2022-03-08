import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDentistaComponent } from './editar-dentista.component';

describe('EditarDentistaComponent', () => {
  let component: EditarDentistaComponent;
  let fixture: ComponentFixture<EditarDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDentistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
