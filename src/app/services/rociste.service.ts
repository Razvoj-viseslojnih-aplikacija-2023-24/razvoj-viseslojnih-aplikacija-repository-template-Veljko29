import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROCISTE_URL, ROCISTE_BY_PREDMET_URL, ROCISTE_BY_UCESNIK_URL} from '../constants';
import {Rociste} from '../models/rociste';

@Injectable({
  providedIn: 'root'
})
export class RocisteService {

  constructor(private httpClient:HttpClient) { }

  public getAllRocistes():Observable<any>{
    return this.httpClient.get(`${ROCISTE_URL}`);
  }
  public getRocistetByPredmet(predmetId:number):Observable<any>{
    return this.httpClient.get(`${ROCISTE_BY_PREDMET_URL}/${predmetId}`);
  }

  public getRocisteByUcesnik(ucesnikId:number):Observable<any>{
    return this.httpClient.get(`${ROCISTE_BY_UCESNIK_URL}/${ucesnikId}`);
  }


  public addRociste(rociste:Rociste):Observable<any>{
    return this.httpClient.post(`${ROCISTE_URL}`, rociste);
  }

  public updateRociste(rociste:Rociste):Observable<any>{
    return this.httpClient.put(`${ROCISTE_URL}/id/${rociste.id}`, rociste);
  }

  public deleteRociste(rocisteId:number):Observable<any>{
    return this.httpClient.delete(`${ROCISTE_URL}/id/${rocisteId}`, {responseType:"text"});
  }
}
