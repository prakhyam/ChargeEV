import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private apiUrl = 'http://localhost:5001'; 

  constructor(private http: HttpClient) { }

  getStations(): Observable<any> {
  
  //console.log(this.http.get(`http://localhost:5001/getStations`));
    return this.http.get(`http://localhost:5001/getStations`);
  }

  updateMaintenance(stationId: string, status: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/stations/${stationId}/maintenance`, { maintenance: status });
  }
}
