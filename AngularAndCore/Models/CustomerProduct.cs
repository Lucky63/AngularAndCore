﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAndCore.Models
{
	public class CustomerProduct
	{
		public int CustomerId { get; set; }
		public Customer Customer { get; set; }

		public int ProductId { get; set; }
		public Product Product { get; set; }
	}
}
