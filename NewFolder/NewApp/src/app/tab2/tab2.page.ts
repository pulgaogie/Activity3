import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  option={
    slidesPerview:1.5,
    centerSlides:false,
    loop:true,
    spaceBetween:true,
    initialSlide:5,
    speed:400,

  }
}
