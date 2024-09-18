import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SUD_URL } from '../constants';
import { Sud } from '../models/sud';

@Injectable({
  providedIn: 'root'
})
export class SudService {

  constructor(private httpClient:HttpClient) { }

  public getAllSuds():Observable<any>{
    return this.httpClient.get(`${SUD_URL}`);
  }

  public addSud(sud:Sud):Observable<any>{
    return this.httpClient.post(`${SUD_URL}`, sud);
  }

  public updateSud(sud:Sud):Observable<any>{
    return this.httpClient.put(`${SUD_URL}/id/${sud.id}`, sud);
  }

  public deleteSud(sudId:number):Observable<any>{
    return this.httpClient.delete(`${SUD_URL}/id/${sudId}`, {responseType:"text"});
  }
}
