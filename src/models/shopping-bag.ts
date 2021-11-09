import { ShoppingItem } from "./shopping-item";

export interface ShoppingBag {
  shoppingBagId:number;
  TimeCreated:number;
  Items:ShoppingItem[];
  }