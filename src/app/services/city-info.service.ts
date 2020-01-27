//!!AK3.1 Add Service file - exec from terminal "ng generate service data": to create this file
//it will use HttpClient to  fetch / add data.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //.1 - import Angular HttpClient
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../models/city.model';
import { PointOfInterest } from '../models/point-of-interest.model';

@Injectable({
  providedIn: 'root'
})
export class CityInfoService {
  //!!AK3.2 - create an instance of HttpClient through dependency injection within the constructor
  constructor(private http: HttpClient) { }

  getCities() : Observable<City[]> {
     return this.http.get<City[]>('https://localhost:44313/api/cities/async')
     .pipe(map(result => result));
  }

  getPointsOfInterest() : Observable<City[]> {
    return this.http.get<City[]>('https://localhost:44313/api/cities/async/pointsofinterest')
    .pipe(map(result => result));
  }
  
  getPointOfInterest(cityId: number, poId: number) : Observable<PointOfInterest> {
    return this.http.get<PointOfInterest>('https://localhost:44313/api/cities/async/'
    + cityId + '/pointsofinterest/' + poId).pipe(map(result => {
      console.log("Service.getPointOfInterest: ", result);
      return result
    }));
  }

  createPointOfInterest(cityId: number, po: PointOfInterest) : Observable<any> {
    let body = JSON.stringify(po);
    return this.http.post<any>('https://localhost:44313/api/cities/async/'
    + cityId + '/pointsofinterest/', po).pipe(map(result => { 
      console.log("service.createPointOfInterest: ", result) 
      return result
    }));
  }
  
  updatePointOfInterest(cityId: number, po: PointOfInterest) : Observable<any> {
    let body = JSON.stringify(po);
    return this.http.put<any>('https://localhost:44313/api/cities/async/'
    + cityId + '/pointsofinterest/' + po.id, po).pipe(map(result => { 
      console.log("service.updatePointOfInterest: ", result) 
      return result
    }));
  }  

  deletePointOfInterest(cityId: number,  poId: number) : Observable<any> {
    return this.http.delete<any>('https://localhost:44313/api/cities/async/'
    + cityId + '/pointsofinterest/' + poId).pipe(map(result => { 
      console.log("service.deletePointOfInterest: ", result) 
      return result
    }));
  }    
}
