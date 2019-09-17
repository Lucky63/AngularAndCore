import { ProductViewModel } from "./productViewModel";

export class CustomerViewModel {
	constructor(
		public id?: number,
		public name?: string,
		public phoneNumber?: number,
		public address?: string,
		public products?: ProductViewModel[]) { }
}