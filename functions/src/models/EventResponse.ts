import TravelEvent from "./TravelEvent";

interface EventsArray {
  events: TravelEvent[];
}

export default interface EventResponse {
  _embedded: EventsArray;
}
