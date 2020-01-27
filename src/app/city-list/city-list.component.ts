import { Component, OnInit } from '@angular/core';
import { CityInfoService } from '../services/city-info.service'; //!!AK3.3 import ref to our CityInfo Service file
import { City } from '../models/city.model';
import { AppToastService } from '../services/app-toast.service';
import { ErrrorHandler } from '../utility/errror-handler';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  cities$: City[]; //!!AK3.3
  errrorHandler: ErrrorHandler  =  new ErrrorHandler(); 

  constructor(private cityInfoSvc: CityInfoService, //!!AK3.3 inject CityInfo Service
    public toastService: AppToastService) { } 

  ngOnInit() {
    //!!AK3.3.1 use CityInfo Service to get cities
    this.cityInfoSvc.getCities().subscribe(
      data => { this.cities$ = data},
            err => {
              console.log("Getting cities error:", err);
              this.toastService.showError("Error", this.errrorHandler.getHttpErrorText(err));
            },
            () => console.log('done loading cities')      
    );
  }

}
