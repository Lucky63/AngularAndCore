using AngularAndCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndCore.ViewModels
{
	public class IndexViewModel
	{
		public IEnumerable<CustomerViewModel> Customers { get; set; }
		public List<int> TotalPage { get; set; }
	}
}
