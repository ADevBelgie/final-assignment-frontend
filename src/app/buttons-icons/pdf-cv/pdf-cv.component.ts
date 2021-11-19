import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-cv',
  templateUrl: `
  <pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              [original-size]="false"
              style="style="width: 400px; height: 500px"
  ></pdf-viewer>
  `,
  styleUrls: ['./pdf-cv.component.scss']
})
export class PdfCvComponent implements OnInit {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor() { }

  ngOnInit(): void {
  }

}
