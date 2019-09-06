using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AngularAndCore.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AngularAndCore
{
	public class Startup
	{
		public void ConfigureServices(IServiceCollection services)
		{
			string connectionString = "Server=(localdb)\\mssqllocaldb;Database=CUSdb;Trusted_Connection=True;";
			services.AddDbContext<CustomerContext>(options => options.UseSqlServer(connectionString));

			services.AddMvc();
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();

				app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
				{
					HotModuleReplacement = true
				});
			}

			app.UseDefaultFiles();
			app.UseStaticFiles();
			app.UseMvc();
			app.Run(async (context) =>
			{
				context.Response.ContentType = "text/html";
				await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
			});
		}
	}
}
