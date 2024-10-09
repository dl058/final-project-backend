import { ObjectId } from "mongodb";
import TravelEvent from "./TravelEvent";

export default interface Account {
  _id?: ObjectId;
  uid: string;
  display_name: string;
  favorites: TravelEvent[];
}
