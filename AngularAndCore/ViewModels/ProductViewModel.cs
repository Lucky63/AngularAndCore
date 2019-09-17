using AngularAndCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndCore.ViewModels
{
	public class ProductViewModel
		
	{
		public ProductViewModel(CustomerProduct cp)
		{
			Customerid = cp.CustomerId;
			Productid = cp.ProductId;
			NameProduct = cp.Product.NameProduct;
		}
		public int Customerid { get; set; }
		public int Productid { get; set; }

		public string NameProduct { get; set; }

	}
}
