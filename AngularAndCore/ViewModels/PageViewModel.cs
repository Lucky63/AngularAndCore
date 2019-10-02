using AngularAndCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndCore.ViewModels
{
	public class PageViewModel
	{		
		public List<CustomerViewModel> CustomerViewModels { get; set; }
		public int TotalPage { get; set; }
	}
}
