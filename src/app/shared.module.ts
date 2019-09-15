import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ]
  })
  
  export class SharedModule { }