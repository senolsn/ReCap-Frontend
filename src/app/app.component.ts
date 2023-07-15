import { BrandService } from './services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ColorService } from './services/color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ReCapProject-Frontend';
  constructor() {}

  ngOnInit(): void {}
}
