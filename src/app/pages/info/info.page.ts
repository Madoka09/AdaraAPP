import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public items: any = [];
  public containers: any = [];

  constructor(public modalCtrl: ModalController) {
    this.items = [
      { expanded: false, title: '¿Qué es Porción?', content: '1'},
      { expanded: false, title: 'Medidas Caseras', content: '2' },
      { expanded: false, title: 'Sugerencias', content: '3' },
      { expanded: false, title: 'Entendiendo las indicaciones de tu Plan', content: '4' },
      { expanded: false, title: 'Métodos de medición para tus alimentos', content: '5' },
      { expanded: false, title: 'Indicaciones generales sobre el Ejercicio', content: '6'}
    ];

    this.containers = [
      { }
    ];

  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  openImg(img) {
    this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}
