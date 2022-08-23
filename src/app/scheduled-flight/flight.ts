export interface Flight{
    flightId:number;
    carrierName:string;
    flightModel:string;
    seatCapacity:number;
}
export interface FlightResolved {
    flight: Flight;
    error?: any;
  }