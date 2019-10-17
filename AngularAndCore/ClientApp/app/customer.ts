import { Product } from "./product";

export class Customer {
	constructor(
		public id?: number,
		public name?: string,
		public phoneNumber?: string,
		public address?: string,
		public products?: Product[]) { }
}