using AngularAndCore.Models;
using AngularAndCore.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndCore.Controllers
{
	[Route("api/products")]
	public class ProductController : Controller
	{
		CustomerContext db;
		public ProductController(CustomerContext context)
		{
			db = context;
			if (!db.Products.Any())
			{
				db.Products.Add(new Product { NameProduct = "iPhone X", Description = "Best phone", Price = 343434 });
				db.Products.Add(new Product { NameProduct = "Galaxy S8", Description = "Samsungphone", Price = 6556 });
				db.Products.Add(new Product { NameProduct = "Pixel 2", Description = "Googlecompany phone", Price = 676754 });
				db.SaveChanges();
			}
		}

		[HttpGet("[action]")]
		[HttpGet("[action]/{page}")]
		[HttpGet("[action]/{page}/{size}")]
		[HttpGet("[action]/{page}/{size}/{order}")]
		public IActionResult GetProductsMain(int page = 1, int size = 3, string order = "")
		{
			var products = db.Products.AsQueryable();
			switch (order)
			{
				case "Name":
					products = products.OrderBy(s => s.NameProduct);
					break;
				case "NameDesc":
					products = products.OrderByDescending(s => s.NameProduct);
					break;
				case "Description":
					products = products.OrderBy(s => s.Description);
					break;
				case "DescriptionDesc":
					products = products.OrderByDescending(s => s.Description);
					break;

				case "Price":
					products = products.OrderBy(s => s.Price);
					break;
				case "PriceDesc":
					products = products.OrderByDescending(s => s.Price);
					break;

			}

			List<ProductViewModel> prodvm = products
				.Skip((page - 1) * size)
				.Take(size)
				.ToList()
				.Select(c => new ProductViewModel
			{
				Id = c.Id,
				NameProduct = c.NameProduct,
				Description = c.Description,
				Price = c.Price

			}).ToList();
			return Ok(prodvm);
			
		}

		[HttpGet("[action]")]
		public IActionResult GetProductsCount()
		{
			var count = db.Products.Count();
			int size = 5;
			var res = Math.Ceiling(count / (double)size);
			List<int> c = new List<int>();

			for (var i = 1; i <= res; i++)
			{
				c.Add(i);
			}
			return Ok(c);

		}	


		[HttpGet]
		public IEnumerable<ProductViewModel> Get()
		{
			List<ProductViewModel> prodvm = db.Products.Select(c => new ProductViewModel
			{
				Id = c.Id,
				NameProduct = c.NameProduct,
				Description = c.Description,
				Price = c.Price

			}).ToList();
			return prodvm.ToList();
			
		}

		[HttpGet("{id}")]
		public Product Get(int id)
		{
			Product product = db.Products.FirstOrDefault(x => x.Id == id);
			return product;
		}

		[HttpPost]
		public IActionResult Post([FromBody]Product product)
		{
			if (ModelState.IsValid)
			{
				db.Products.Add(product);
				db.SaveChanges();
				return Ok(product);
			}
			return BadRequest(ModelState);
		}

		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody]Product product)
		{
			if (ModelState.IsValid)
			{
				db.Update(product);
				db.SaveChanges();
				return Ok(product);
			}
			return BadRequest(ModelState);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			Product product = db.Products.FirstOrDefault(x => x.Id == id);
			if (product != null)
			{
				db.Products.Remove(product);
				db.SaveChanges();
			}
			return Ok(product);
		}
	}
}
