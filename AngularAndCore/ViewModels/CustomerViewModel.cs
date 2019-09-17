using AngularAndCore.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndCore.Models
{
	public class CustomerViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int PhoneNumber { get; set; }
		public string Address { get; set; }
		public List<ProductViewModel> Products { get; set; }
	}
}
