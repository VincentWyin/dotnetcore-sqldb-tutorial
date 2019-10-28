using DotNetCoreSqlDb.Models;
using DotNetCoreSqlDb.Models.API;
using DotNetCoreSqlDb.Models.ViewModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Service
{
    public class RotoService
    {
        public List<RotoNewsAPIModel> RotoNewsList(MyDatabaseContext context)
        {
            List<RotoNews> newsList = context.RotoNewsList.OrderByDescending(x => x.DateTime).ToList();
            List<RotoPlayer> players = context.RotoPlayerList.ToList();
            foreach (RotoNews news in newsList)
            {
                news.Player = players.FirstOrDefault(x => x.PlayerKey == news.Player).Name;
                news.NewsAttribute = JsonConvert.DeserializeObject<RotoNewsData>(news.JsonString).attributes;
            }
            List<RotoNewsAPIModel> model = newsList.Select(x => new RotoNewsAPIModel() {
                DateTime = x.DateTime,
                Detail = x.Detail,
                NewsKey = x.NewsKey,
                Player = x.Player,
                Title = x.Title,
                Injury = x.NewsAttribute.injury == "true",
                Transaction = x.NewsAttribute.transaction == "true"
            }).OrderByDescending(x=>x.DateTime).ToList();

            return model;
        }
    }
}
