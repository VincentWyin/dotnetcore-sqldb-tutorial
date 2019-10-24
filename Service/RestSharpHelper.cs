using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Service
{
    public class RestSharpHelper
    {
        public static List<T> Deserialize<T>(string json)
        {
            return JsonConvert.DeserializeObject<List<T>>(json);
        }

        /// <summary>
        /// https://github.com/restsharp/RestSharp/wiki/Getting-Started
        /// </summary>
        /// <param name="host">server host</param>
        /// <param name="url">api path and parameters</param>
        /// <returns>result message</returns>
        public static string RestSharpGet(string host, string url)
        {
            string message = string.Empty;

            var client = new RestClient();

            Uri baseUri = null;

            if (Uri.TryCreate(host, UriKind.Absolute, out baseUri))
            {
                client.BaseUrl = baseUri;
                client.Encoding = Encoding.UTF8;

                var requestGet = new RestRequest(url, Method.GET);

                IRestResponse responseGet = client.Execute(requestGet);

                if (responseGet.ErrorException != null)
                {
                    message = string.Format("Error retrieving response.  Check inner details for more info.{0}", responseGet.ErrorException);
                }
                else
                {
                    message = responseGet.Content;
                }
            }
            else
            {
                message = string.Format("Host {0} is not a valid Uri.", host);
            }

            return message;
        }

        /// <summary>
        /// https://github.com/restsharp/RestSharp/wiki/Getting-Started
        /// </summary>
        /// <param name="host">server host</param>
        /// <param name="url">api path</param>
        /// <param name="jsonbody">json body data</param>
        /// <param name="contenttype">content type</param>
        /// <param name="method">Post method</param>
        /// <returns>result message</returns>
        public static string RestSharpPost(string host, string url, string jsonbody, string contenttype = "application/json; charset=utf-8", Method method = Method.POST)
        {
            string message = string.Empty;

            var client = new RestClient();

            Uri baseUri = null;

            if (Uri.TryCreate(host, UriKind.Absolute, out baseUri))
            {
                client.BaseUrl = baseUri;
                client.Encoding = Encoding.UTF8;

                var requestPost = new RestRequest(url, method);
                requestPost.AddParameter(contenttype, jsonbody, ParameterType.RequestBody);

                IRestResponse responsePost = client.Execute(requestPost);

                if (responsePost.ErrorException != null)
                {
                    message = string.Format("Error retrieving response.  Check inner details for more info.{0}", responsePost.ErrorException);
                }
                else
                {
                    message = responsePost.Content;
                }
            }
            else
            {
                message = string.Format("Host {0} is not a valid Uri.", host);
            }

            return message;
        }
    }
}
