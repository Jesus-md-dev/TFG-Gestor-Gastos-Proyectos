import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.css'],
})
export class ImageTextComponent implements OnInit {
  constructor() {}
  @Input()
  imageSrc: String = 'en.png';
  @Input()
  text: string = '';
  @Input()
  imageTextOrder: boolean = true;
  ngOnInit(): void {}
}
