import { Time } from "@angular/common";
import { Airport } from "./airport";

export interface Schedule{
    sourceAirport:Airport;
    destinationAirport:Airport;
    scheduleDate:Date;
    arraivalTime:Time;
    departureTime:Time;

}