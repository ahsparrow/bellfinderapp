import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type Tower = {
  towerId: number;
  place: string;
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

  getDove(): Observable<Tower[]> {
    return this.http.get<Tower[]>('assets/dove.json');
  }
}
