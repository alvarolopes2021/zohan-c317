import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';
import { AdsService } from 'src/app/services/ads.service';
import { ErrorHandler } from 'src/app/services/errorHandler';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.css']
})
export class AddAdsComponent implements OnInit {

  form: FormGroup = new FormGroup({
    ad: new FormControl('')
  });

  errors: Map<string, string> = new Map<string, string>();

  constructor(private adsService: AdsService) { }

  ngOnInit(): void {
  }

  createAd() {
    try {
      let formValue = this.form;
      let request = formValue.get("ad")?.value;

      if (request === null || request === undefined)
        return alert("error");

      this.adsService.createAd(request)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

        if (value instanceof Map) {
          this.errors = value;
        }

        console.log(value);

      });

    }
    catch (e) {
      console.warn(e);
    }
  }

}
