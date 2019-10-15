using AngularAndCore.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndCore.Models
{
	public class ProductsViewModel
	{
		public IEnumerable<ProductViewModel> Products { get; set; }
		public List<int> TotalPage { get; set; }
	}
}
