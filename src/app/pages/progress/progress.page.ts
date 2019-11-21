import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProgressImgPage } from '../progress-img/progress-img.page';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  userData: any;
  imageRoutes: any;
  rawDocumentData: any = [];
  objectDocumentData: any = [];

  constructor(public callApi: CallApiService, public activatedRoute: ActivatedRoute, public modalCtrl: ModalController,
    private file: File) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userData = res;
    });
  }

  ngOnInit() {
    this.getImages();
    this.getDocInfo();
  }

  getImages() {
    this.callApi.getImages(this.userData.id).subscribe(res => {
      this.imageRoutes = res;
      console.log(this.imageRoutes);
    }, err => {
      console.log(err);
    });
  }

  getDocInfo() {
    this.callApi.getDocument(this.userData.id).subscribe(res => {
      this.rawDocumentData = res;

      // Generar objeto iterable
      this.processDocumentData();
      console.log(this.rawDocumentData);
    }, err => {
      console.log(err);
    });
  }

  processDocumentData() {
    // Obtener maximo iterador
    const maxIterator = (this.rawDocumentData.length - 1);

    // Construir objeto iterable
    for (let i = 0; i <= maxIterator; i++) {
      this.objectDocumentData.push(
        {
          name: this.rawDocumentData[i][0],
          path: this.rawDocumentData[i][1]
        }
      );
    }
    console.log(this.objectDocumentData);
  }

  downloadDoc(url, name) {
    this.callApi.downloadDoc(url, name);
  }

  openImg(item) {
    this.modalCtrl.create({
      component: ProgressImgPage,
      componentProps: {
        item: item
      }
    }).then(modal => {
      modal.present();
    });
  }

}
