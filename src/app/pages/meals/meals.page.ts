import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../../services/call-api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  public items: any = [];
  public meals: any = [];
  day: any = [];
  startDay = 0;
  endDay = 0;
  menuSize = 5;
  counter = 0;

  // Recibir userID, desde el dashboard
  userData: any;
  weekDay: string;
  constructor(public callApi: CallApiService, public loading: LoadingController,
    public toastC: ToastController, public activatedRoute: ActivatedRoute) {
    this.day = [
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' },
      { name: 'Pulsa el día de nuevo, porfavor.' }
    ];

    this.items = [
      { expanded: false, meal: 'Desayuno', food: this.day[0].name },
      { expanded: false, meal: 'Colación 1', food: this.day[1].name },
      { expanded: false, meal: 'Comida', food: this.day[2].name },
      { expanded: false, meal: 'Colación 2', food: this.day[3].name },
      { expanded: false, meal: 'Cena', food: this.day[4].name }
    ];

    this.activatedRoute.queryParams.subscribe((res) => {
      this.userData = res;
    });
  }

  ngOnInit() {
    this.getMeal();
    console.log(this.userData.id);
  }

  clickDay(day) {
    this.weekDay = day;
    this.findDay(day);
    this.printData();
    console.log(day);
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

  async getMeal() {
    const loading = await this.loading.create({
      message: 'Obteniendo Datos...'
    });
    await loading.present();
    this.callApi.getMenu(this.userData.id).subscribe(menu => {
      this.meals = menu;
      console.log(this.meals);
    }, async err => {
      const toast = await this.toastC.create({
        message: 'Ocurrió un error vuelve a intentarlo',
        duration: 2500
      });
      toast.present();
      console.log(err);
    });
    await loading.dismiss();

  }

  printData() {
    this.createDay();
    console.log(this.day);
    console.log(this.items);
  }

  createDay() {
    this.day.length = 0;
    this.counter = 0;
    for (let i = this.startDay; i < this.endDay; i++) {
      this.day.push(this.meals[i]);
      this.items[this.counter].food = this.meals[i].name;
      this.counter++;
    }
  }

  findDay(day) {
    switch (day) {
      case '1':
        this.startDay = 0;
        this.endDay = this.menuSize;
        break;
      case '2':
        this.startDay = this.menuSize;
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '3':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '4':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '5':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '6':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '7':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '8':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '9':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '10':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '11':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '12':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '13':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '14':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      case '15':
        this.startDay = (this.menuSize * (parseInt(day) - 1));
        this.endDay = (this.menuSize * parseInt(day));
        break;
      default:
        console.log('Error');
    }
  }

}
