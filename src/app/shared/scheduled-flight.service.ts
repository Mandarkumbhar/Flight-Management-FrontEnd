import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ScheduledFlight } from "../scheduled-flight/scheduled-flight"
const headers = new HttpHeaders({ Authorization: 'Bearer ' + sessionStorage.getItem('token') });
@Injectable({
    providedIn: 'root'
  })
export class ScheduledFlightService{
    public baseUrl:string = "http://localhost:9191/FMS/admin/scheduledFlights"
  constructor(private http:HttpClient) { }
 
  getAllFlights():Observable<ScheduledFlight[]>{
     return  <Observable<ScheduledFlight[]>>this.http.get(this.baseUrl,{headers})
    
  }

  getFlight(flightId: number): Observable<ScheduledFlight> {
      return <Observable<ScheduledFlight>>this.http.get(this.baseUrl +"/"+ flightId,{headers})
  }

  createFlight(flight: ScheduledFlight): Observable<ScheduledFlight> {
    return  <Observable<ScheduledFlight>>this.http.post(this.baseUrl, flight,{headers})
  }
  cancelFlight(flight: ScheduledFlight): Observable<ScheduledFlight> {
    return  <Observable<ScheduledFlight>>this.http.put(this.baseUrl+"/cancel", flight)
  }
  getFlightByDate(sourceAirportId: number, destinationAirportId: number, scheduledDate: Date): Observable<ScheduledFlight[]> {
    return <Observable<ScheduledFlight[]>>this.http.get(this.baseUrl + "ByAirportAndDate?date="+ scheduledDate +
                                                         "&destinationAirportId=" + destinationAirportId + 
                                                         "&sourceAirportId=" + sourceAirportId,{headers})
}

  

  updateFlight(flight: ScheduledFlight): Observable<ScheduledFlight> {
      console.log(flight);
    return <Observable<ScheduledFlight>>this.http.put(this.baseUrl , flight,{headers})
  }
}