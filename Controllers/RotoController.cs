using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCoreSqlDb.Models;
using DotNetCoreSqlDb.Models.API;
using DotNetCoreSqlDb.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreSqlDb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RotoController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public RotoController(MyDatabaseContext context)
        {
            _context = context;
        }

        public RotoService Service = new RotoService();

        #region snippet_GetAll
        [HttpGet]
        public IEnumerable<RotoNewsAPIModel> GetAll(string key = "")
        {
            List<RotoNewsAPIModel> all = Service.RotoNewsList(_context);
            List<RotoNewsAPIModel> model = new List<RotoNewsAPIModel>();
            foreach (RotoNewsAPIModel news in all)
            {
                if (news.NewsKey == key)
                {
                    break;
                }
                model.Add(news);
            }
            return model;
        }
        #endregion
    }
}