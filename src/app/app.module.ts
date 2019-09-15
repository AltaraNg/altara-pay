import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS, HttpClient, }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule,MatProgressSpinnerModule } from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Angular4PaystackModule } from 'angular4-paystack';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './loader.interceptors';
import {SharedModule} from './shared.module'


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    SharedModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkStepperModule,
    MatStepperModule, 
    MatInputModule, 
    MatButtonModule, 
    MatAutocompleteModule,
    ReactiveFormsModule, 
    FormsModule,
    MatProgressSpinnerModule,
    Angular4PaystackModule
    
  ],
  providers: [
    StatusBar,
    LoaderService,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
