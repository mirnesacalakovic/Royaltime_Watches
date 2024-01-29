using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIGateway.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Royaltime.APIGateway.Controllers
{
    public class WishlistController : BaseApiController
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<Urls> _urls;

        public WishlistController(HttpClient httpClient, IOptions<Urls> urls)
        {
            _httpClient = httpClient;
            _urls = urls;
        }

        [HttpGet(Name = "GetWishlist")]
        public async Task<ActionResult> GetWishlist()
        {
            if (Request.Headers.ContainsKey("Authorization")) {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Main}/api/wishlist");
            if (response.IsSuccessStatusCode)
            {
                var wishlist = await response.Content.ReadFromJsonAsync<List<WishlistItemDto>>();
                return Ok(wishlist);
            }
            return BadRequest("Error while getting wishlist");
        }

        [HttpPost("add/{productId}")]
        public async Task<ActionResult<WishlistItemDto>> AddItemToWishlist(int productId)
        {
            if (Request.Headers.ContainsKey("Authorization")) {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Main}/api/wishlist/add/{productId}", new { });
            if (response.IsSuccessStatusCode)
            {
                var wishlistItem = await response.Content.ReadFromJsonAsync<WishlistItemDto>();
                return Ok(wishlistItem);
            }
            return BadRequest("Error while adding item to wishlist");
        }

        [HttpDelete("remove/{productId}")]
        public async Task<ActionResult> RemoveWishlistItem(int productId)
        {
            if (Request.Headers.ContainsKey("Authorization")) {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }
            
            var response = await _httpClient.DeleteAsync($"{_urls.Value.Main}/api/wishlist/remove/{productId}");
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Error while removing item from wishlist");
        }
    }
}