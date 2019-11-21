import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../../services/call-api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AngularDelegate, ModalController } from '@ionic/angular';
import { ExerciseModalPage } from '../exercise-modal/exercise-modal.page';


@Component({
  selector: 'app-routines',
  templateUrl: './routines.page.html',
  styleUrls: ['./routines.page.scss'],
})
export class RoutinesPage implements OnInit {
  day: { name: string; }[];
  items: { expanded: boolean; meal: string; exer: string }[];

  // Recibir userID, desde el dashboard
  userData: any;
  routine: any = [];
  // maximo y minimo de dias para iterar
  maxDays: any;
  minDays: any;
  daysNumber: any;
  dayController: any = [];
  dayValue: any;
  currentRoutine: any;

  iteratedRoutine: any = [];

  constructor(public callApi: CallApiService, public activatedRoute: ActivatedRoute,
              public loading: LoadingController, public toastC: ToastController, public modalCtrl: ModalController) {

    this.activatedRoute.queryParams.subscribe((res) => {
      this.userData = res;
      console.log(this.userData.id);
    });

  }

  ngOnInit() {
    this.getRoutines();
    console.log(this.userData.id);
  }

  clickRoutine(day) {
    console.log(day);
  }

  async getRoutines() {
    this.routine.length = 0;
    const loading = await this.loading.create({
      message: 'Obteniendo Datos...'
    });
    await loading.present();
    this.callApi.getRoutine(this.userData.id).subscribe(routine => {
      this.routine = routine;
      console.log(this.routine);
      // Filtrar elementos
      this.filter();
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

  filter() {
    // Encontrar el día minimo para iterar
    this.minDays = this.routine[0].day_id;

    // Encontrar el máximo de días;
    this.maxDays = this.routine[this.routine.length - 1].day_id;
    this.daysNumber = ((this.maxDays + 1) - this.minDays);

    // Llenar el array para iterar correctamente
    for (let i = this.minDays; i <= this.maxDays; i++) {
      const checker = this.routine.filter(iterator => iterator.day_id === i);
      this.iteratedRoutine.push(checker);
    }

    // Generar Botones
    for (let j = 1; j <= this.daysNumber; j++) {
      this.dayController.push(j);
    }
    console.log(this.iteratedRoutine);
    console.log(this.dayController);
  }

  getRoutine(day) {
    // Generar Rutina iterable
    this.currentRoutine = this.iteratedRoutine[day - 1];
    console.log(this.currentRoutine);
  }

  showExModal(exercise) {
    this.modalCtrl.create({
      component: ExerciseModalPage,
      componentProps: {
        exercise
      }
    }).then(modal => {
      modal.present();
    });
  }

}
