using APIGateway.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Royaltime.APIGateway.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<Urls> _urls;

        public BasketController(HttpClient httpClient, IOptions<Urls> urls)
        {
            _httpClient = httpClient;
            _urls = urls;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Basket}/api/basket");
            if (response.IsSuccessStatusCode)
            {
                var basket = await response.Content.ReadFromJsonAsync<BasketDto>();
                return Ok(basket);
            }
            return BadRequest("Error while getting basket");
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Basket}/api/basket?productId={productId}&quantity={quantity}", new { });
            if (response.IsSuccessStatusCode)
            {
                var basket = await response.Content.ReadFromJsonAsync<BasketDto>();
                return Ok(basket);
            }
            return BadRequest("Error while adding item to basket");
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.DeleteAsync($"{_urls.Value.Basket}/api/basket?productId={productId}&quantity={quantity}");
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Error while removing item from basket");
        }
    }
}
