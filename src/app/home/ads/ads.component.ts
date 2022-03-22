import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { AdsService } from 'src/app/services/ads.service';
import { ErrorHandler } from 'src/app/services/errorHandler';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  ad?: string | null;

  constructor(private adsService : AdsService) { }

  ngOnInit(): void {
    this.adsService.getAds()?.pipe(catchError(ErrorHandler.handleError)).subscribe((ads) => {

      this.ad = ads[0].adDescription;

      let adh3 = document.getElementById("ad");

      if(adh3 !== null && adh3 !== undefined && this.ad !== null && this.ad !== undefined)
        adh3.innerText = this.ad;
      
    });
  }

}
