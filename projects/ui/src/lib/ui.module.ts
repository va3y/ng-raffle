import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { InputTextComponent } from './input-text/input-text.component';
import { RadioComponent } from './radio/radio.component';



@NgModule({
  imports: [
    ButtonComponent,
    DocumentUploadComponent,
    InputTextComponent,
    RadioComponent
  ],
  exports: [
    ButtonComponent,
    DocumentUploadComponent,
    InputTextComponent,
    RadioComponent
  ]
})
export class UiModule { }
