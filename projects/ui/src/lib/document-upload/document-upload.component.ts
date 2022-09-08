import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-document-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
