import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController, ToastController } from '@ionic/angular';

const apiMenu = 'http://api.adarawellness.site/menuGet/';
const apiRoutine = 'http://api.adarawellness.site/api/routines/';
const apiAuthentication = 'http://api.adarawellness.site/patientsLogin?';
const postDocument = 'http://api.adarawellness.site/api/postDoc';
const apiImage = 'http://api.adarawellness.site/api/images/';
const getDocument = 'http://api.adarawellness.site/api/documents/';
const getRecipes = 'http://api.adarawellness.site/api/recipes/';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  fileTransfer: FileTransferObject;
  constructor(private httpC: HttpClient, private transfer: FileTransfer, private file: File, public loading: LoadingController,
              private toast: ToastController) { }

  getMenu(id) {
    const query = apiMenu;
    return this.httpC.get(query + parseInt(id));
  }

  authenticateUser(info) {
    const data = apiAuthentication;
    return this.httpC.get(data + info);
  }

  getRoutine(id) {
    const query = apiRoutine;
    return this.httpC.get(query + parseInt(id));
  }

  getImages(id) {
    const query = apiImage;
    return this.httpC.get(query + parseInt(id));
  }

  uploadDoc(path, name) {
    this.fileTransfer = this.transfer.create();

    const query = postDocument;
    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: name,
      mimeType: 'application/pdf',
      chunkedMode: false,
    };

    return this.fileTransfer.upload(path, query, options).then((data) => {
      console.log('Exito subiendo archivo al servidor');
      console.log(data);
    }, err => {
      console.log(err);
      console.log('ERROR FATAL D:');
    });

  }

  getDocument(id) {
    const query = getDocument;
    return this.httpC.get(query + parseInt(id));
  }

  getRecipes(id) {
    const query = getRecipes;
    return this.httpC.get(query + parseInt(id));
  }

  async downloadDoc(url, name) {
    this.fileTransfer = this.transfer.create();

    const toast = await this.toast.create({
      message: 'Descargando Archivo...',
      duration: 3500,
    });
    toast.present();
    return this.file.checkDir(this.file.externalRootDirectory, 'WellnessPalDownloads').then(
      _ => this.file.checkFile(this.file.externalRootDirectory, 'WellnessPalDownloads/' + name + '.pdf')
    ).then( _ => { alert('Ya has descargado ese archivo');  })
      .catch(err =>
        this.fileTransfer.download(url, this.file.externalRootDirectory + 'WellnessPalDownloads/' + name + '.pdf')).then((data) => {
          alert('Archivo guardado en: ' + data.nativeURL);
        })
      .catch((err) => {
        console.log(err);
      })
      .catch(
        err => this.file.createDir(this.file.externalRootDirectory, 'WellnessPalDownloads', false)
          .then(response => {
            alert('Archivo guardado en: ' + response.fullPath);
            this.fileTransfer.download(url, this.file.externalRootDirectory + 'WellnessPalDownloads/' + name + '.pdf').then((entry) => {
              alert('Error guardando archivo2: ' + err);
            });
          }).catch( async err => {
            alert('No fue posible crear el directorio "WellnessPalDownloads, error: "' + err);
          })
      );
  }

}
