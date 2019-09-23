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
			Description = cp.Product.Description;
			Price = cp.Product.Price;
			Id = cp.Product.Id;
		}
		public ProductViewModel(Product p)
		{
			NameProduct = p.NameProduct;
			Description = p.Description;
			Price = p.Price;
			Id = p.Id;
		}
		public ProductViewModel()
		{
			
		}

		public int Customerid { get; set; }
		public int Productid { get; set; }

		public int Id { get; set; }
		public string NameProduct { get; set; }
		public string Description { get; set; }
		public int Price { get; set; }


	}
}
