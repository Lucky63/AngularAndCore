import { Product } from "./product";

export class Customer {
	constructor(
		public id?: number,
		public name?: string,
		public phoneNumber?: number,
		public address?: string,
		public products?: Product[]) { }
}