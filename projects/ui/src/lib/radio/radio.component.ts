import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
