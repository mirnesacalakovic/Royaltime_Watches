using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIGateway.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string Brands { get; set; }
        public string Models { get; set; }
        public string Genders { get; set; }

        internal string ToQueryString()
        {
            var queryString = new StringBuilder();

            if (!string.IsNullOrEmpty(OrderBy))
            {
                queryString.Append($"orderBy={Uri.EscapeDataString(OrderBy)}&");
            }

            if (!string.IsNullOrEmpty(SearchTerm))
            {
                queryString.Append($"searchTerm={Uri.EscapeDataString(SearchTerm)}&");
            }

            if (!string.IsNullOrEmpty(Brands))
            {
                queryString.Append($"brands={Uri.EscapeDataString(Brands)}&");
            }

            if (!string.IsNullOrEmpty(Models))
            {
                queryString.Append($"models={Uri.EscapeDataString(Models)}&");
            }

            if (!string.IsNullOrEmpty(Genders))
            {
                queryString.Append($"genders={Uri.EscapeDataString(Genders)}&");
            }

            queryString.Append($"pageNumber={PageNumber}&pageSize={PageSize}");

            return queryString.ToString();
        }
    }
}