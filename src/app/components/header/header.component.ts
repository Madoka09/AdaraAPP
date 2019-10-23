import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { InfoPage } from '../../pages/info/info.page';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;
  constructor(public modalController: ModalController, public menu: MenuController, public router: Router,
              public toastC: ToastController) { }

  ngOnInit() {}

  async showInfo() {
    const modal = await this.modalController.create({
      component: InfoPage
    });
    return await modal.present();
  }

  openMenu() {
    this.menu.enable(true, 'userM');
    this.menu.open('userM');
  }

  async logOut() {
    const toast = await this.toastC.create({
      message: '¡Vuelve Pronto!',
      duration: 3000
    });
    toast.present();
    this.router.navigateByUrl('/login');
    this.menu.close('userM');
  }
}
