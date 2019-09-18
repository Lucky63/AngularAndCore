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
			//return db.Products.Include(x => x.CustomerProducts).ToList();
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
