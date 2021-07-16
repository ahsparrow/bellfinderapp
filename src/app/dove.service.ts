import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type Tower = {
  id: number;
  name: string;
  dedication: string;
  county: string;
  latitude: number;
  longitude: number;
  bells: number;
  weight: number;
  unringable: boolean;
  practice: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoveService {

  constructor(private http: HttpClient) {}

  getDove(): Observable<any> {
    return this.http.get<any>('assets/dove.json');
  }
}
