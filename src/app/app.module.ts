import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicrotiterPlateModule } from './microtiter-plate.module';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MicrotiterPlateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
