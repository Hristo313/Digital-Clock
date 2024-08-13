import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { DigitalClockModule } from '../../projects/digital-clock/src/lib/digital-clock.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    DigitalClockModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }