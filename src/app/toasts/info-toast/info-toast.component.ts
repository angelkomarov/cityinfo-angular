import { Component, OnInit } from '@angular/core';
import { AppToastService } from 'src/app/services/app-toast.service';

@Component({
  selector: 'app-info-toast',
  templateUrl: './info-toast.component.html',
  styleUrls: ['./info-toast.component.scss'],
})
export class InfoToastComponent implements OnInit {

  constructor(private toastService: AppToastService) { } //!!AK7.1 Import my custom toast service

  ngOnInit() {
  }

}
