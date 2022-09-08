import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-input-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
