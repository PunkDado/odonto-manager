import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dentista } from 'src/app/shared/models/dentista.model';

@Component({
  selector: 'app-modal-dentista',
  templateUrl: './modal-dentista.component.html',
  styleUrls: ['./modal-dentista.component.css']
})
export class ModalDentistaComponent implements OnInit {

  @Input() dentista!: Dentista;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
