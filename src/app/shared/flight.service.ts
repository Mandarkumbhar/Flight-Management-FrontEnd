import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Flight } from "../scheduled-flight/flight";
const headers = new HttpHeaders({ Authorization: 'Bearer ' + sessionStorage.getItem('token') });
@Injectable({
    providedIn: 'root'
  })

  
export class FlightService{
    public baseUrl:string = "http://localhost:9191/FMS/admin/flights"
  constructor(private http:HttpClient) { }
 
  
  getAllFlights():Observable<Flight[]>{
    
     return  <Observable<Flight[]>>this.http.get(this.baseUrl,{headers})
    
  }

  getFlight(flightId: number): Observable<Flight> {
      return <Observable<Flight>>this.http.get(this.baseUrl +"/"+ flightId,{headers})
  }

  createFlight(flight: Flight): Observable<Flight> {
    return  <Observable<Flight>>this.http.post(this.baseUrl, flight,{headers})
  }

  deleteFlight(flightId: number): Observable<{}> {
    return <Observable<Flight>>this.http.delete(this.baseUrl +"/"+ flightId, {headers})
  }

  updateFlight(flight: Flight): Observable<Flight> {
    return <Observable<Flight>>this.http.put(this.baseUrl, flight,{headers})
  }
}