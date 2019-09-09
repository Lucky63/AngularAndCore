import { CustomerProduct } from "./customerProduct";

export class Customer {
	constructor(
		public id?: number,
		public name?: string,
		public phoneNumber?: number,
		public address?: string,
		public customerProducts?: CustomerProduct[]) { }
}