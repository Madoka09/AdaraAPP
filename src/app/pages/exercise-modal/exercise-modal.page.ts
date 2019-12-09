import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';


@Component({
  selector: 'app-exercise-modal',
  templateUrl: './exercise-modal.page.html',
  styleUrls: ['./exercise-modal.page.scss'],
})
export class ExerciseModalPage implements OnInit {

  exercise: any;
  videoId: any;
  constructor(private navParams: NavParams, private modalController: ModalController, private youtube: YoutubeVideoPlayer,
              private toast: ToastController ) { }

  ngOnInit() {
    this.exercise = this.navParams.get('exercise');
    console.log(this.exercise);
  }

  close() {
    this.modalController.dismiss();
  }

  async openVideo(url) {
    // obtener id de video
    const id = url.split('v=');

    // Comprobar que sea un video valido
    if (id[1] === undefined || id[1] === null || id[1] === '') {
      const toast = await this.toast.create({
        message: 'Este ejercicio no tiene un video.',
        duration: 3500,
      });
      toast.present();
    } else {
      this.youtube.openVideo(id[1]);
    }
  }

}
