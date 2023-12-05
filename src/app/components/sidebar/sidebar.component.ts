import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    submenu?: RouteInfo[]; 
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { 
      path: '/table-list', 
      title: 'Station Management',  
      icon:'location_pin', 
      class: '', 
      submenu: [
          { path: '/add-stations', title: ' Add Stations', icon: 'ui-1_simple-add', class: '' },      
      ] 
    },
    { path: '/icons', title: 'TRANSACTIONS',  icon:'shopping_credit-card', class: '' },
  

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems!: any[];
  activeMenuItem: string = '';
  activeSubmenu: string = '';
  showSubmenu: boolean = false;

setActive(path: string) {
    this.activeMenuItem = path;
}
toggleSubmenu(submenuTitle: string): void {
  this.activeSubmenu = this.activeSubmenu === submenuTitle ? '' : submenuTitle;
}

isActive(path: string) {
    return this.activeMenuItem === path;
}
setSubmenuActive(submenu: string) {
  this.activeSubmenu = submenu === this.activeSubmenu ? '' : submenu;
}
isSubmenuActive(submenu: string) {
  return this.activeSubmenu === submenu;
}

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
