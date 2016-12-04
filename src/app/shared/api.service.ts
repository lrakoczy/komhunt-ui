import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IPrediction } from '../predictions/prediction';

@Injectable()
export class ApiService {
  private _predictionsUrl = 'data/predictions.json';

  title = 'KomHunt';

  constructor(private _http: Http) { }

  getPredictions(): Observable<IPrediction[]> {
      return this._http.get(this._predictionsUrl)
          .map((response: Response) => <IPrediction[]> response.json())
          .do(data => console.log('All: ' +  JSON.stringify(data)))
          .catch(this.handleError);
  }

  getPrediction(id: number): Observable<IPrediction> {
      return this.getPredictions()
          .map((products: IPrediction[]) => products.find(p => p.segment.id === id));
  }

  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
