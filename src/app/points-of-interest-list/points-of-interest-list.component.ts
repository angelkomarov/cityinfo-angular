import { Component, OnInit } from '@angular/core';
import { CityInfoService } from '../services/city-info.service'; 
import { City } from '../models/city.model';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
//!!AK6.import 3 modal routines 
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PointOfInterest } from '../models/point-of-interest.model';
import { Subscription, Subject } from 'rxjs';
import { AppToastService } from '../services/app-toast.service';
import { ErrrorHandler } from '../utility/errror-handler';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-points-of-interest-list',
  templateUrl: './points-of-interest-list.component.html',
  styleUrls: ['./points-of-interest-list.component.scss']
})
export class PointsOfInterestListComponent implements OnInit {
  cities$: City[];
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  delCityid: number;
  delPo: PointOfInterest;
  //!!AK6.2 declare modal service ref
  modalRef: NgbModalRef;
  closeResult: string;
  errrorHandler: ErrrorHandler  =  new ErrrorHandler(); 
  notifier$ = new Subject();  

  //!!AK4.2.1 inject router - to use routing
  constructor(private cityInfoSvc: CityInfoService, private router: Router, private modalService: NgbModal, 
    public toastService: AppToastService) { } //!!AK7.4.1 inject toast service

  ngOnInit() {
    this.loadPointsOfInterest();
  }
  //!!AK4.2 event binding for edit point of interest
  onClick($event, cityid, id){
    //!!AK4.2.2 routing to edit point of interest
    this.router.navigateByUrl('pointOfInterest/' + cityid + '/' + id); 
  }      

  onShowModal(deleteModal, cityid, po){ 
    this.delCityid = cityid;
    this.delPo = po;
    //!!AK6.3 call modalService to open modal
    this.modalRef = this.modalService.open(deleteModal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static', centered: true});
    this.modalRef.result.then((result) => { //modalRef.close
      this.closeResult = `Modal Closed with: ${result}`;  
      console.log(this.closeResult);
      //call the service
      this.cityInfoSvc.deletePointOfInterest(this.delCityid, this.delPo.id).pipe(takeUntil(this.notifier$))
      .subscribe(
        result => { 
          console.log("delete PO " , result);
          //!!AK7.4 call toast service
          this.toastService.showSuccess( "Success", 'Point Of Interest has been deleted'); 
          this.loadPointsOfInterest();
        },
        err => {
          console.log("delete PO error:", err)
          this.toastService.showError("Error", this.errrorHandler.getHttpErrorText(err));
        },
        () => console.log('delete PO success!!!')      
      );
    }, (dismissed) => { //modalRef.dismiss (cancel, Esc, click on background)
      this.closeResult = `Modal Dismissed ${this.getDismissReason(dismissed)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private loadPointsOfInterest() {
    this.cityInfoSvc.getPointsOfInterest().pipe(takeUntil(this.notifier$))
    .subscribe(
      data => { this.cities$ = data},
            err => {
              console.log("Getting poins of interest  error:", err);
              this.toastService.showError("Error", this.errrorHandler.getHttpErrorText(err));
            },
            () => console.log('done loading points of interest')      
    );
  }
}

