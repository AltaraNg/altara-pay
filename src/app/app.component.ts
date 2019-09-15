import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { timer, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
})
export class AppComponent {
  
showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)

      this.authService.getToken();
    });
  }
}
