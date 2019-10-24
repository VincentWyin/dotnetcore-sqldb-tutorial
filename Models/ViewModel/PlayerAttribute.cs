using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models.ViewModel
{
    public class PlayerAttribute
    {
        public int id { get; set; }

        public string uuid { get; set; }

        public string name { get; set; }

        public string created { get; set; }

        public string changed { get; set; }

        public string player_id { get; set; }

        public string legacy_id { get; set; }

        public string first_name { get; set; }

        public string last_name { get; set; }

        public string birth_date { get; set; }

        public PlayerPath path { get; set; }

        public string latest_player_news_uuid { get; set; }

        public string latest_player_news_timestamp { get; set; }

        public string metatag { get; set; }

        public string birth_city { get; set; }

        public string birth_country { get; set; }

        public string birth_state { get; set; }

        public string college { get; set; }

        public string contract { get; set; }

        public string debut_year { get; set; }

        public string draft_pick_in_round { get; set; }

        public string draft_pick_overall { get; set; }

        public string draft_pick_supp { get; set; }

        public string draft_round { get; set; }

        public string draft_year { get; set; }

        public string height { get; set; }

        public string jersey { get; set; }

        public string profile { get; set; }

        public string stats_global_id { get; set; }

        public string stats_id { get; set; }

        public string field_player_type_metatags { get; set; }

        public string weight { get; set; }

        public string years_experience { get; set; }
    }
}
