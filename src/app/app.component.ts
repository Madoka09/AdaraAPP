import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { File } from '@ionic-native/file/ngx'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private file: File,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    let dummy = JSON.stringify({
      dummy: 'permissionGranted'
    });
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#000000');
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.file.writeFile(this.file.externalRootDirectory, 'permission', dummy, {replace: true}).then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    });
  }
}
