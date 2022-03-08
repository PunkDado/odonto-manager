import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirDentistaComponent } from './inserir-dentista.component';

describe('InserirDentistaComponent', () => {
  let component: InserirDentistaComponent;
  let fixture: ComponentFixture<InserirDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirDentistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
