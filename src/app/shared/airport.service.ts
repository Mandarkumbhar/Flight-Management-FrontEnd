import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Airport } from "../scheduled-flight/airport";

@Injectable({
    providedIn: 'root'
  })
export class AirportService{
public baseUrl:string = "http://localhost:9191/FMS/admin/airports"
  constructor(private http:HttpClient) { }
  
 
  getAllAirports():Observable<Airport[]>{
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + sessionStorage.getItem('token') });
     return  <Observable<Airport[]>>this.http.get(this.baseUrl, {headers})
    
  }
}