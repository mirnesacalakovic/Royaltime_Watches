using APIGateway.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Royaltime.APIGateway.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<Urls> _urls;

        public PaymentsController(HttpClient httpClient, IOptions<Urls> urls)
        {
            _httpClient = httpClient;
            _urls = urls;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            if (Request.Headers.ContainsKey("Authorization")) {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Payments}/api/payments", new { });
            if (response.IsSuccessStatusCode)
            {
                var basket = await response.Content.ReadFromJsonAsync<BasketDto>();
                return Ok(basket);
            }
            return BadRequest("Error while adding item to basket");
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            if (Request.Headers.ContainsKey("Authorization")) {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }
            
            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Payments}/api/payments/webhook", new { });
            if (response.IsSuccessStatusCode)
            {
                var basket = await response.Content.ReadFromJsonAsync<BasketDto>();
                return Ok(basket);
            }
            return BadRequest("Error while adding item to basket");
        }
    }
}
