using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetCoreSqlDb.Models;
using DotNetCoreSqlDb.Models.ViewModel;
using Newtonsoft.Json;
using DotNetCoreSqlDb.Service;

namespace DotNetCoreSqlDb.Controllers
{
    public class HomeController : Controller
    {
        private readonly MyDatabaseContext _context;

        public HomeController(MyDatabaseContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult News()
        {
            List<RotoNews> model = _context.RotoNewsList.OrderByDescending(x => x.DateTime).ToList();
            ViewBag.Players = _context.RotoPlayerList.ToList();
            return View(model);
        }

        [HttpPost]
        public string RefreshNews()
        {
            string returnMessage = string.Empty;
            string host = "https://www.rotoworld.com";
            int offset = 10;
            int loop = 100;
            string json = string.Empty;
            int insertedRecords = 0;
            List<RotoNews> model = new List<RotoNews>();
            List<RotoPlayer> players = new List<RotoPlayer>();

            List<RotoNews> newsListToBeAdd = new List<RotoNews>();
            List<RotoPlayer> playersToBeAdd = new List<RotoPlayer>();

            string error = "success";
            try
            {

                List<string> playerList = _context.RotoPlayerList.Select(x => x.PlayerKey).Distinct().ToList();
                string firstNews = string.Empty;
                if (_context.RotoNewsList.Count() > 0)
                {
                    firstNews = _context.RotoNewsList.OrderByDescending(x => x.DateTime).Select(x => x.NewsKey).FirstOrDefault();
                }

                for (int i = 0; i < loop; i++)
                {
                    json = RestSharpHelper.RestSharpGet(
                        host,
                        string.Format("/api/player_news?sort=-created&page[limit]={0}&page[offset]={1}&filter[league]=11&include=player,position,team,team.secondary_logo,player.image,related_players,related_teams", offset, offset * i));
                    Response result = JsonConvert.DeserializeObject<Response>(json);
                    foreach (RotoNewsData data in result.data)
                    {
                        // Check player id, if not found, then create new row
                        if (firstNews == data.id)
                        {
                            i = loop;
                            break;
                        }

                        // Insert news
                        RotoNews item = new RotoNews();
                        item.JsonString = JsonConvert.SerializeObject(data);
                        item.Detail = data.attributes.analysis.value;
                        item.NewsKey = data.id;
                        item.Title = data.attributes.headline;
                        DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                        dtDateTime = dtDateTime.AddSeconds(long.Parse(data.attributes.created)).ToLocalTime();
                        item.DateTime = dtDateTime;
                        item.Player = data.relationships.player.data.id;

                        if (!playerList.Contains(item.Player))
                        {
                            playerList.Add(item.Player);

                            RotoPlayer player = new RotoPlayer();
                            string json2 = RestSharpHelper.RestSharpGet(host, data.relationships.player.links.related.Replace(host, string.Empty));
                            RotoPlayerResponse result2 = JsonConvert.DeserializeObject<RotoPlayerResponse>(json2);
                            player.JsonString = JsonConvert.SerializeObject(result2.data);
                            player.Name = result2.data.attributes.name;
                            player.PlayerKey = result2.data.attributes.uuid;

                            playersToBeAdd.Add(player);
                        }

                        newsListToBeAdd.Add(item);
                        insertedRecords++;
                    }
                }

                _context.RotoPlayerList.AddRange(playersToBeAdd);
                _context.RotoNewsList.AddRange(newsListToBeAdd);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                error = ex.Message + " | " + ex.InnerException.Message;
            }

            return error;
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
