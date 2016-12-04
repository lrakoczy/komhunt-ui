import { Component, OnInit } from '@angular/core';

import { IPrediction } from './prediction';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'my-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {

  predictions: IPrediction[];
  errorMessage: string;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    console.log('Loading predictions');
    this._apiService.getPredictions()
      .subscribe(result => this.predictions = result,
        error => this.errorMessage = <any>error);
    console.log('Predictions loaded: ' + this.predictions);
  }

}
