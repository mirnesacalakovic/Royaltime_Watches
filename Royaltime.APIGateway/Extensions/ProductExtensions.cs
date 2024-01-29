using APIGateway.Entities;

namespace APIGateway.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy){

            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm){
            if(string.IsNullOrWhiteSpace(searchTerm)) return query;
        
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string models, string genders){
            
            var brandList = new List<string>();
            var modelList = new List<string>();
            var genderList = new List<string>();

            if(!string.IsNullOrEmpty(brands))
                brandList.AddRange(brands.ToLower().Split(",").ToList());

            if(!string.IsNullOrEmpty(models))
                modelList.AddRange(models.ToLower().Split(",").ToList());

            if(!string.IsNullOrEmpty(genders))
                genderList.AddRange(genders.ToLower().Split(",").ToList());
            
            query = query.Where(p => brandList.Count == 0 ||brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => modelList.Count == 0 ||modelList.Contains(p.Model.ToLower()));
            query = query.Where(p => genderList.Count == 0 ||genderList.Contains(p.Gender.ToLower()));
        
            return query;
        }
    }
}