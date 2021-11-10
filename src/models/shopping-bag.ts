import { ShoppingItem } from "./shopping-item";

export interface ShoppingBag {
  shoppingBagId:number;
  timeCreated:number;
  items:ShoppingItem[];
  }