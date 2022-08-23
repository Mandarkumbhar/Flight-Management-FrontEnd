import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  adminHome():void{
    this.router.navigateByUrl('/admin');
  }

  flights():void{
    this.router.navigateByUrl('/admin/flights');
  }
  addFlights():void{
    this.router.navigateByUrl('/admin/flights/addFlight');
  }
  scheduleFlight():void{
    this.router.navigateByUrl('/admin/scheduleFlight');
  }
  scheduledFlights():void{
    this.router.navigateByUrl('/admin/scheduledFlights');
  }
  bookings():void{
    this.router.navigateByUrl('/admin/bookings');
  }
  }


