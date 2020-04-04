//!!AK0 main module: defines all used components 
//!!!AK0.1 Component imports: class / filename
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  //!!AK3.1.1 - import build in Angular HttpClient here as well

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CityListComponent } from './city-list/city-list.component';
import { PointsOfInterestListComponent } from './points-of-interest-list/points-of-interest-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //bootstrap has been added
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PointOfInterestComponent } from './point-of-interest/point-of-interest.component';
import { FormsModule } from '@angular/forms'; //!!AK5 import angular forms
import { InfoToastComponent } from './toasts/info-toast/info-toast.component'; 

@NgModule({
  declarations: [ //!!AK0.2 component classes
    AppComponent,
    SidebarComponent,
    CityListComponent,
    PointsOfInterestListComponent,
    PointOfInterestComponent,
    InfoToastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  //!!AK5 import ref angular forms
    AppRoutingModule,
    NgbModule, //bootstrap has been added
    HttpClientModule,  //!!AK3.1.1 Add imporrted Ref to HttpClient
    FontAwesomeModule,
  ],
  providers: [], //!!AK0.3 services
  bootstrap: [AppComponent] //!!AK0.4 module statrup component
})
export class AppModule { }
