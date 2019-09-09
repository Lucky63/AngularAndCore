import { Customer } from "./customer";
import { Product } from "./product";

export class CustomerProduct {
	constructor(
		public Customerid?: number,
		public customer?: Customer,
		public Productid?: number,
		public product?: Product,
		) { }
}