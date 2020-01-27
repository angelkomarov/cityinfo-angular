import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PointOfInterest } from '../models/point-of-interest.model';
import { Subscription } from 'rxjs';
import { CityInfoService } from '../services/city-info.service';
import { AppToastService } from '../services/app-toast.service';
import { ErrrorHandler } from '../utility/errror-handler';

@Component({
  selector: 'app-point-of-interest',
  templateUrl: './point-of-interest.component.html',
  styleUrls: ['./point-of-interest.component.scss']
})

export class PointOfInterestComponent implements OnInit {
  cityId$: number;
  poId$: number;
  poEvtSubs$: Subscription;
  mode$: string;
  po$: PointOfInterest;
  errrorHandler: ErrrorHandler  =  new ErrrorHandler(); 
  
  //!!AK4.3.1 inject route - to receive point of interest from route
  constructor(private route: ActivatedRoute, private router: Router, private cityInfoSvc: CityInfoService,
    public toastService: AppToastService) { }

  ngOnInit() {
    this.poEvtSubs$ = this.route.params.subscribe( params => { 
      this.cityId$ = Number(params.cityid); 
      //!!AK4.3 receive edit point of interest route - params.id = NaN
      this.poId$ = Number(params.id);
    });

    this.po$ = {} as PointOfInterest;
    if (this.cityId$ && this.poId$) { //edit
      this.mode$ = "Edit";
      this.cityInfoSvc.getPointOfInterest(this.cityId$, this.poId$).subscribe(
        data => { this.po$ = data},
        err => {
          console.log("Get PO error:", err);
          this.toastService.showError("Error", this.errrorHandler.getHttpErrorText(err));
        },
        () => console.log('done loading point of interest')      
      );
  
    }
    else { //new record
      this.mode$ = "New";
      this.po$ = {} as PointOfInterest;
    }
  }

  onSubmit() {
    if (this.po$.id) { //edit
      this.cityInfoSvc.updatePointOfInterest(this.cityId$, this.po$).subscribe(
        result => { 
          console.log("update PO " , result);
          this.toastService.showSuccess( "Success", 'Point Of Interest has been updated');
          this.router.navigateByUrl('pointsOfInterest');
        },
        err => {
          console.log("update PO error:", err);
          console.log(this.errrorHandler.getHttpErrorText(err)); 
          this.toastService.showError("Error", this.errrorHandler.getHttpErrorText(err));
        },
        () => console.log('update PO success!!!')      
      );
    }
    else { //new record
      this.cityInfoSvc.createPointOfInterest(this.cityId$, this.po$).subscribe(
        result => { 
          console.log("insert PO " , result);
          this.toastService.showSuccess( "Success", 'Point Of Interest has been created');
          this.router.navigateByUrl('pointsOfInterest')
        },
        err => {
          console.log("insert PO error:", err);
          this.toastService.showError("Error", this.errrorHandler.getHttpErrorText(err));
        },
        () => console.log('insert PO success!!!')      
      );
    }
  }

  ngOnDestroy() {
    this.poEvtSubs$.unsubscribe(); //Cleanup subscribtion
  }

}
