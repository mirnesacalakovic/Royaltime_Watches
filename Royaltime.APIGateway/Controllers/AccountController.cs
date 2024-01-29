using APIGateway.DTOs;
using APIGateway.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Royaltime.APIGateway.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<Urls> _urls;

        public AccountController(HttpClient httpClient, IOptions<Urls> urls)
        {
            _httpClient = httpClient;
            _urls = urls;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Account}/api/account/login", loginDto);
            if (response.IsSuccessStatusCode)
            {
                var user = await response.Content.ReadFromJsonAsync<UserDto>();
                return Ok(user);
            }
            return BadRequest("Invalid login attempt");
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Account}/api/account/register", registerDto);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Invalid register attempt");
        }

        [Authorize]
        [HttpPost("brandRegister")]
        public async Task<ActionResult> BrandRegister(RegisterDto registerDto)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Account}/api/account/brandRegister", registerDto);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Invalid register attempt");
        }

        [Authorize]
        [HttpGet("brands")]
        public async Task<ActionResult<List<UserDto>>> GetBrands()
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Account}/api/account/brands");
            if (response.IsSuccessStatusCode)
            {
                var brands = await response.Content.ReadFromJsonAsync<List<UserDto>>();
                return Ok(brands);
            }
            return BadRequest("Invalid register attempt");
        }


        [HttpPost("verifyEmail")]
        public async Task<ActionResult> VerifyEmail(string token, string email)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Account}/api/account/verifyEmail", new { token, email });
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Invalid register attempt");
        }

        [HttpGet("resendEmailConfirmationLink")]
        public async Task<ActionResult> ResendEmailConfirmationLink(string email)
        {
            var response = await _httpClient.GetAsync($"{_urls.Value.Account}/api/account/resendEmailConfirmationLink?email={email}");
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Invalid register attempt");
        }

        [HttpPost("forgotPassword")]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Account}/api/account/forgotPassword", email);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Invalid register attempt");
        }

        [HttpPost("resetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Account}/api/account/resetPassword", resetPasswordDto);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Invalid register attempt");
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Account}/api/account/currentUser");
            if (response.IsSuccessStatusCode)
            {
                var user = await response.Content.ReadFromJsonAsync<UserDto>();
                return Ok(user);
            }
            return BadRequest("Invalid auth attempt");
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Account}/api/account/savedAddress");
            if (response.IsSuccessStatusCode)
            {
                if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
                {
                    return NoContent();
                }
                var userAddress = await response.Content.ReadFromJsonAsync<UserAddress>();
                return Ok(userAddress);
            }
            return BadRequest("Invalid register attempt");
        }
    }
}
