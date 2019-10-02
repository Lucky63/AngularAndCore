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
				db.Customers.Add(new Customer { Name = "Jon", Address = "Apple", PhoneNumber = "79900" });
				db.Customers.Add(new Customer { Name = "Bob", Address = "Samsung", PhoneNumber = "49900" });
				db.Customers.Add(new Customer { Name = "Bill", Address = "Google", PhoneNumber = "52900" });
				db.SaveChanges();
			}
		}
		[HttpGet("[action]")]
		[HttpGet("[action]/{page}")]
		[HttpGet("[action]/{page}/{size}")]
		public IActionResult GetCustomers(int page = 1, int size = 2)
		{		
			
			List<CustomerViewModel> cusvm = db.Customers.Include(x => x.CustomerProducts).ThenInclude(x => x.Product)
				.Skip((page - 1) * size)
				.Take(size).ToList()
				.Select(c => new CustomerViewModel
			{
				Id = c.Id,
				Name = c.Name,
				Address = c.Address,
				PhoneNumber = c.PhoneNumber,
				Products = c.CustomerProducts.Select(x=>new ProductViewModel(x)).ToList()
			}).ToList();

			//int totalPage = db.Customers.Count();
			//PageViewModel pageViewModel = new PageViewModel()
			//{
			//	TotalPage = totalPage,
			//	CustomerViewModels = cusvm
			//};
			
			return Ok(cusvm);
			
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
				Customer customerOne = db.Customers.Include(x=>x.CustomerProducts).ThenInclude(x=>x.Product).FirstOrDefault(x=>x.Id== id);
				customerOne.Name = customer.Name;
				customerOne.Address = customer.Address;
				customerOne.PhoneNumber = customer.PhoneNumber;
				
				if (customerOne.CustomerProducts.Count < customer.Products.Count)
				{
					//Полeчаем айдишники всех продуктов в списке
					List<int> idprodCus = new List<int>();

					foreach (var t in customer.Products)
					{
						idprodCus.Add(t.Productid);
					}
					//Сортируем список
					var res = idprodCus.OrderBy(t => t).ToArray();

					//Список в котором хранится продукт на удаление
					List<int> DubList = new List<int>();

					for(var i = 0; i < res.Length-1; i++)
					{
						
						if (res[i] == res[i + 1])
						{
							DubList.Add(res[i]);
						}
					}
					if(DubList.Count != 0)
					{
						var customerproductdel = customerOne.CustomerProducts.FirstOrDefault(sc => sc.ProductId == DubList[0]);
						customerOne.CustomerProducts.Remove(customerproductdel);
						db.SaveChanges();
					}

					List<int> idprodOne = new List<int>();
					foreach (var t in customerOne.CustomerProducts)
					{
						idprodOne.Add(t.ProductId);
					}


					if (DubList.Count == 1 && customerOne.CustomerProducts.Count+2 == customer.Products.Count - 1)
					{
						int number = idprodCus[idprodCus.Count - 1];
						List<int> listOld = new List<int>();
						List<int> listNew = new List<int>();
						foreach (var t in idprodOne)
						{
							if (number != t)
							{
								listOld.Add(t);
							}
							else
							{
								listNew.Add(number);
							}

						}

						if (listNew.Count == 0)
						{
							customerOne.CustomerProducts.Add(new CustomerProduct() { ProductId = number });
						}
					}					
					else if (DubList.Count == 1 && customerOne.CustomerProducts.Count+1 == customer.Products.Count)
					{
						db.Update(customerOne);
						db.SaveChanges();
						return Ok(customerOne);						
					}
					else if(DubList.Count == 0)
					{
						int number = idprodCus[idprodCus.Count - 1];
						List<int> listOld = new List<int>();
						List<int> listNew = new List<int>();
						foreach (var t in idprodOne)
						{
							if (number != t)
							{
								listOld.Add(t);
							}
							else
							{
								listNew.Add(number);
							}
						}
						if (listNew.Count == 0)
						{
							customerOne.CustomerProducts.Add(new CustomerProduct() { ProductId = number });
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
