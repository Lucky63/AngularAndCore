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
	[Route("api/customers")]
	public class CustomerController : Controller
	{
		CustomerContext db;
		public CustomerController(CustomerContext context)
		{
			db = context;
			if (!db.Customers.Any())
			{
				db.Customers.Add(new Customer { Name = "Jon", Address = "Apple", PhoneNumber = 79900 });
				db.Customers.Add(new Customer { Name = "Bob", Address = "Samsung", PhoneNumber = 49900 });
				db.Customers.Add(new Customer { Name = "Bill", Address = "Google", PhoneNumber = 52900 });
				db.SaveChanges();
			}
		}
		[HttpGet]
		public IEnumerable<CustomerViewModel> Get()
		{
			
			List<CustomerViewModel> cusvm = db.Customers.Include(x => x.CustomerProducts).ThenInclude(x => x.Product).ToList().Select(c => new CustomerViewModel
			{
			Id = c.Id,
			Name = c.Name,
			Address = c.Address,
			PhoneNumber = c.PhoneNumber,
			Products = c.CustomerProducts.Select(x=>new ProductViewModel(x)).ToList()
		}).ToList();
			return cusvm.ToList();
			//return db.Customers.Include(x=> x.CustomerProducts).ThenInclude(x=>x.Product).ToList();
		}

		[HttpGet("{id}")]
		public CustomerViewModel Get(int id)
		{
			List<CustomerViewModel> cusid = db.Customers.Include(x => x.CustomerProducts).ThenInclude(x => x.Product).ToList().Select(c => new CustomerViewModel
			{
				Id = c.Id,
				Name = c.Name,
				Address = c.Address,
				PhoneNumber = c.PhoneNumber,
				Products = c.CustomerProducts.Select(x => new ProductViewModel(x)).ToList()
			}).ToList();


			CustomerViewModel customer = cusid.FirstOrDefault(x => x.Id == id);
			
			return customer;
		}
		//Добавление пользователя
		[HttpPost]
		public IActionResult Post([FromBody]Customer customer)
		{
			if (ModelState.IsValid)
			{
				db.Customers.Add(customer);
				db.SaveChanges();
				return Ok(customer);
			}
			return BadRequest(ModelState);
		}
		//Редактирование пользователя
		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody]CustomerViewModel customer)
		{
			if (ModelState.IsValid)
			{
				Customer customerOne = db.Customers.Include(x => x.CustomerProducts).ThenInclude(x => x.Product).FirstOrDefault(x=>x.Id==id);
				List<int> idprod=new List<int>();
				foreach(var t in customerOne.CustomerProducts)
				{
					idprod.Add(t.ProductId);
				}

				if (customer.Products != null)
				{
					foreach(var n in customer.Products)
					{
						foreach(var b in idprod)
						{
							if(b !=n.Productid)
							{
								customerOne.CustomerProducts.Add(new CustomerProduct() { ProductId = n.Productid });
							}
						}
						
					}
				}
				db.Update(customerOne);
				db.SaveChanges();
				return Ok(customerOne);
			}
			return BadRequest(ModelState);
		}
		//Удаление пользователя
		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			Customer customer = db.Customers.FirstOrDefault(x => x.Id == id);
			if (customer != null)
			{
				db.Customers.Remove(customer);
				db.SaveChanges();
			}
			return Ok(customer);
		}
	}
}
