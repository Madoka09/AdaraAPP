import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController } from '@ionic/angular';

const apiMenu = 'http://api.adarawellness.site/menuGet/';
const apiRoutine = 'http://api.adarawellness.site/api/routines/';
const apiAuthentication = 'http://api.adarawellness.site/patientsLogin?';
const postDocument = 'http://api.adarawellness.site/api/postDoc';
const apiImage = 'http://api.adarawellness.site/api/images/';
const getDocument = 'http://api.adarawellness.site/api/documents/';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(private httpC: HttpClient, private transfer: FileTransfer, private file: File, public loading: LoadingController) { }
  fileTransfer: FileTransferObject = this.transfer.create();

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

  async downloadDoc(url, name) {
    const loading = await this.loading.create({
      message: 'Descargando Archivo...'
    });
    await loading.present()
    return this.file.checkDir(this.file.externalRootDirectory, 'WellnessPalDownloads').then(
      _ => this.file.checkFile(this.file.externalRootDirectory, 'WellnessPalDownloads/' + name + '.pdf')
    ).then(async _ => { alert('Ya has descargado ese archivo'); await loading.dismiss(); })
      .catch(err =>
        this.fileTransfer.download(url, this.file.externalRootDirectory + 'WellnessPalDownloads/' + name + '.pdf')).then( async (data) => {
          alert('Archivo guardado en: ' + data.nativeURL);
          await loading.dismiss();
        })
      .catch( async (err) => {
        await loading.dismiss();
        console.log(err);
      })
      .catch(
        err => this.file.createDir(this.file.externalRootDirectory, 'WellnessPalDownloads', false)
          .then(async response => {
            alert('Archivo guardado en: ' + response.fullPath);
            await loading.dismiss();
            this.fileTransfer.download(url, this.file.externalRootDirectory + 'WellnessPalDownloads/' + name + '.pdf').then( async (entry) => {
              alert('Error guardando archivo2: ' + err);
              await loading.dismiss();
            });
          }).catch( async err => {
            alert('No fue posible crear el directorio "WellnessPalDownloads, error: "' + err);
            await loading.dismiss();
          })
      );
  }

}
