import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-progress-img',
  templateUrl: './progress-img.page.html',
  styleUrls: ['./progress-img.page.scss'],
})
export class ProgressImgPage implements OnInit {

  @ViewChild('slider', { read: ElementRef, static: false })slider: ElementRef;

  item: any;
  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.item = this.navParams.get('item');

  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
