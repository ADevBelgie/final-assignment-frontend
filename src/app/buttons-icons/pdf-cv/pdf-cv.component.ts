import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-cv',
  templateUrl: './pdf-cv.component.html',
  styleUrls: ['./pdf-cv.component.scss']
})
export class PdfCvComponent implements OnInit {

  public pdfUrl:string = "/assets/CV Software Developer_15-11.pptx.pdf#view=fit"
  public pdfUrlSafe:SafeResourceUrl
  constructor(public sanitizer: DomSanitizer) {
    this.pdfUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
   }

  ngOnInit(): void {
    
  }

}
