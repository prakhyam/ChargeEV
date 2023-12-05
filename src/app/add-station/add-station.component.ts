import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Station {
  id: string;
  name: string;
  location: string;
  city: string;
  zipCode: string;
  capacity: number;
}
@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss']
})
export class AddStationComponent implements OnInit {
  stations: Station[] = [];
  currentStation: Station = this.getNewStation();
  editing = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadStations();
  }

  loadStations() {
    // Update the API endpoint below with the correct URL of your API
    this.http.get<Station[]>('/api/stations').subscribe(
      (data: Station[]) => this.stations = data,
      (error) => console.error(error)
    );
  }

  getNewStation(): Station {
    return {
      id: '',
      name: '',
      location: '',
      city: '',
      zipCode: '',
      capacity: 0
    };
  }

  toggleMaintenance(stationId: number, maintenanceStatus: boolean): void {
    // Your logic to handle maintenance status change
    console.log(`Station ID: ${stationId}, Maintenance Status: ${maintenanceStatus}`);
    // You might want to call a service to update the status in the backend
  }

 

  submitStation(formValue: Station) {
    if (this.editing) {
      // Update the API endpoint below with the correct URL of your API
      this.http.put(`/api/stations/${formValue.id}`, formValue).subscribe(
        () => {
          const index = this.stations.findIndex((s) => s.id === formValue.id);
          if (index !== -1) {
            this.stations[index] = formValue;
          }
          this.editing = false;
          this.currentStation = this.getNewStation();
        },
        (error) => console.error(error)
      );
    } else {
      // Update the API endpoint below with the correct URL of your API
      this.http.post<Station>('/api/stations', formValue).subscribe(
        (newStation) => {
          this.stations.push(newStation);
          this.currentStation = this.getNewStation();
        },
        (error) => console.error(error)
      );
    }
  }

  startUpdate(station: Station) {
    this.currentStation = { ...station };
    this.editing = true;
  }

  deleteStation(stationId: string) {
    // Update the API endpoint below with the correct URL of your API
    this.http.delete(`/api/stations/${stationId}`).subscribe(
      () => {
        this.stations = this.stations.filter((s) => s.id !== stationId);
      },
      (error) => console.error(error)
    );
  }
}
