import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PREDMET_BY_SUD_URL, PREDMET_URL} from '../constants';
import { Predmet } from '../models/predmet';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {

  constructor(private httpClient:HttpClient) { }

  public getAllPredmets():Observable<any>{
    return this.httpClient.get(`${PREDMET_URL}`);
  }
  public getPredmetBySud(sudId:number):Observable<any>{
    return this.httpClient.get(`${PREDMET_BY_SUD_URL}/${sudId}`);
  }

  public addPredmet(predmet:Predmet):Observable<any>{
    return this.httpClient.post(`${PREDMET_URL}`, predmet);
  }

  public updatePredmet(predmet:Predmet):Observable<any>{
    return this.httpClient.put(`${PREDMET_URL}/id/${predmet.id}`, predmet);
  }

  public deletePredmet(predmetId:number):Observable<any>{
    return this.httpClient.delete(`${PREDMET_URL}/id/${predmetId}`, {responseType:"text"});
  }
}
