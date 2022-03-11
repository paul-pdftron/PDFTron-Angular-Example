import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() input1: string;
  @Input() input2: string;

  constructor(public activeModal: NgbActiveModal, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ref.detectChanges();
  }

  public close() {
    this.activeModal.close();
  }

}
