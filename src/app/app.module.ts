import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { InfoPageModule } from './pages/info/info.module';
import { ImageModalPageModule } from './pages/image-modal/image-modal.module';
import { ProgressImgPageModule } from './pages/progress-img/progress-img.module';
import { ExerciseModalPageModule } from './pages/exercise-modal/exercise-modal.module';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  // tslint:disable-next-line: max-line-length
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ComponentsModule, InfoPageModule, ImageModalPageModule, HttpClientModule, ProgressImgPageModule, ExerciseModalPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileOpener,
    FileTransfer,
    YoutubeVideoPlayer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
