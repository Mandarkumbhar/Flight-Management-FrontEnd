import { Flight } from "./flight";
import { Schedule } from "./Schedule";


export interface ScheduledFlight{

    scheduledFlightIdLong:number;
    flight:Flight;
    availableSeats:number;
    schedule:Schedule;
    cost:number;
    scheduledStatus:ScheduledStatus;
}

export enum ScheduledStatus{
    SCHEDULED,CANCELLED
}