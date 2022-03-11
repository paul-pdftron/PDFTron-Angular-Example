import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: WebViewerInstance;
  @Output() coreControlsEvent: EventEmitter<string> = new EventEmitter();

  private documentLoaded$: Subject<void>;

  public showPDF = true;

  constructor(private modalService: NgbModal, private ref: ChangeDetectorRef) {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/webviewer-demo-annotated.pdf'
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      this.coreControlsEvent.emit(instance.UI.LayoutMode.Single);

      const { documentViewer, Annotations, annotationManager } = instance.Core;

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '../../files/message-solid.svg',
          onClick: async () => {
            await this.openModal();
          },
          title: 'open modal'
        });
      });

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '../../files/eye-slash-solid.svg',
          onClick: () => {
            this.set();
          },
          title: 'show'
        });
      });

      instance.UI.openElements(['notesPanel']);

      documentViewer.addEventListener('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      documentViewer.addEventListener('documentLoaded', () => {
        this.documentLoaded$.next();
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });
        annotationManager.addAnnotation(rectangleAnnot);
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }

  ngOnInit() {
  }

  getDocumentLoadedObservable() {
    return this.documentLoaded$.asObservable();
  }

  public async openModal() {
    const modalRef = this.modalService.open(ModalComponent, { keyboard: true, backdrop: 'static' });
    modalRef.componentInstance.input1 = 'test for input1';
    modalRef.componentInstance.input2 = 'test for input2';

    // const result = await modalRef.result;
    // if (result) {
    //   modalRef.close();
    // }
  }

  public set() {
    this.showPDF = !this.showPDF;
    // this.ref.detectChanges();
  }
}
