import { Product } from "./product";

export class IndexProduct {
	constructor(
		public products: Product[] = [],
		public totalPage: number[] = [], ) { }
}