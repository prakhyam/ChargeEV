import { ChartsModule } from 'ng2-charts';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { OwnerService } from '../owner.service';
import { Label } from 'ng2-charts';
import { DashboardService } from '../services/dashboard.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    submenu?: RouteInfo[]; 
}

interface Station {
  City: string;
  Latitude: number;
  Longitude: number;
  Num_Level_2: number | null;
  Num_level_1: number | null;
  State: string;
  Station_Name: string;
  ZIP: number;
  ID: number;
}


@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss']
})
export class OwnerDashboardComponent implements OnInit {
  stations: any[] = []; 
  location = 'San Jose City Hall';

  menuItems = [
    { title: 'Dashboard', icon: 'dashboard_icon' },
    { title: 'Station Management', icon: 'station_management_icon' },
    { title: 'Transactions', icon: 'transactions_icon' }
  ];
  activeMenuItem: string = '';
  activeSubmenu: string = '';
  showSubmenu: boolean = false;
  ngAfterViewInit(): void {
   
  }

  constructor(private ownServ: OwnerService) { }

  setActive(path: string): void {
    this.activeMenuItem = path;
    if (path === 'Station Management') {
      this.fetchStations();
    }
}


fetchStations() {
  this.ownServ.getStations().subscribe(
    (data: any) => { 
      const stationsData = Array.isArray(data) ? data : [data];
      this.stations = stationsData.map(station => ({
        ...station,
        Num_Level_2: station.Num_Level_2 ? station.Num_Level_2.toString() : 'N/A', 
        Num_level_1: station.Num_level_1 ? station.Num_level_1.toString() : 'N/A'
      }));
    },
    error => console.error('Error fetching stations:', error)
  );
}

isActive(path: string): boolean {
    return this.activeMenuItem === path;
}




  ngOnInit(): void {
  
  }

  toggleMaintenance(stationId: number, currentStatus: boolean) {
    const newMaintenanceStatus = !currentStatus;
    this.ownServ.updateMaintenance(stationId.toString(), newMaintenanceStatus).subscribe(
      response => {
        console.log('Maintenance status updated', response);
        // Optionally refresh the station list here
        this.fetchStations();
      },
      error => console.error('Error updating maintenance status:',error)
    );
  }

  usageChartData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { 
        label: 'Usage', 
        data: [65, 59, 80, 81, 56, 55, 40], 
        fill: false, 
        borderColor: 'rgb(75, 192, 192)' 
      }
    ]
  };

  revenueChartData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { 
        label: 'Revenue', 
        data: [28, 48, 40, 19, 86, 27, 90], 
        backgroundColor: 'rgb(255, 99, 132)' 
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{ ticks: { beginAtZero: true } }]
    }
  };

 
}


