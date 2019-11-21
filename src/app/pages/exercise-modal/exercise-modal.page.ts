import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AngularDelegate } from '@ionic/angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';


@Component({
  selector: 'app-exercise-modal',
  templateUrl: './exercise-modal.page.html',
  styleUrls: ['./exercise-modal.page.scss'],
})
export class ExerciseModalPage implements OnInit {

  exercise: any;
  videoId: any;
  constructor(private navParams: NavParams, private modalController: ModalController, private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
    this.exercise = this.navParams.get('exercise');
    console.log(this.exercise);
  }

  close() {
    this.modalController.dismiss();
  }

  openVideo(url) {
    // obtener id de video
    const id = url.split('v=');
    console.log(id[1]);
    this.youtube.openVideo(id[1]);
  }

}
