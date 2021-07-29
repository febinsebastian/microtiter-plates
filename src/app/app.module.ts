import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PlateSelectorComponent } from './plate-selector/plate-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    PlateSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
