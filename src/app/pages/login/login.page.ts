import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CallApiService } from '../../services/call-api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  arguments: any = {};
  constructor(private callApi: CallApiService, public loading: LoadingController, public toastC: ToastController, 
              private router: Router ) { }

  ngOnInit() {
  }

  async getElement() {
    const loading = await this.loading.create({
      message: 'Iniciando Sesión...'
    });
    await loading.present();
    this.callApi.authenticateUser('username=' + this.username + '&' + 'password=' + this.password)
    .subscribe( async data => {
      this.arguments = data;
      if (this.arguments === 0) {
        const toast = await this.toastC.create({
          message: 'Compruebe los campos y vuelva a intentarlo',
          duration: 3000
        });
        toast.present();
        await loading.dismiss();
      } else {
        const toast = await this.toastC.create({
          message: 'Bienvenido, ' + this.username,
          duration: 3000
        });
        await loading.dismiss();
        toast.present();
        this.router.navigate(['/dashboard'], {queryParams: this.arguments});
      }
      console.log(this.arguments);
    }, async err => {
      const toast = await this.toastC.create({
        message: 'Error inesperado',
        duration: 3000
      });
      toast.present();
      await loading.dismiss();
      console.log(err);
    });
  }



}
