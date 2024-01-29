using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIGateway.DTOs;
using APIGateway.Entities;
using APIGateway.Extensions;
using APIGateway.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Royaltime.APIGateway.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<Urls> _urls;

        public ProductsController(HttpClient httpClient, IOptions<Urls> urls)
        {
            _httpClient = httpClient;
            _urls = urls;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            StringValues paginationHeaderReq;
            var getResult = Request.Headers.TryGetValue("pagination", out paginationHeaderReq);

            if (getResult)
            {
                var paginationHeaderMetaData = JsonConvert.DeserializeObject<MetaData>(paginationHeaderReq.FirstOrDefault());

                if (paginationHeaderMetaData != null)
                {
                    _httpClient.DefaultRequestHeaders.Add("pagination", paginationHeaderMetaData.ToString());
                }
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Main}/api/products?{productParams.ToQueryString()}");
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var paginationHeader = response.Headers.GetValues("pagination").FirstOrDefault();
                if (paginationHeader != null)
                {
                    var paginationData = JsonConvert.DeserializeObject<MetaData>(paginationHeader);
                    Response.AddPaginationHeader(paginationData);
                }
                return Ok(result);
            }
            return BadRequest("Error while getting products");
        }

        [HttpGet("{id}", Name = "GetProduct")] //api/products/3   dobijamo 3. product
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Main}/api/products/{id}");
            if (response.IsSuccessStatusCode)
            {
                var product = await response.Content.ReadFromJsonAsync<Product>();
                return Ok(product);
            }
            return BadRequest("Error while getting product");
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.GetAsync($"{_urls.Value.Main}/api/products/filters");
            if (response.IsSuccessStatusCode)
            {
                var filters = await response.Content.ReadAsStringAsync();
                return Ok(filters);
            }
            return BadRequest("Error while getting filters");
        }

        [Authorize(Roles = "Admin,Brand")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.PostAsJsonAsync($"{_urls.Value.Main}/api/products", productDto);
            if (response.IsSuccessStatusCode)
            {
                var product = await response.Content.ReadFromJsonAsync<Product>();
                return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
            }
            return BadRequest("Error while creating product");
        }

        [Authorize(Roles = "Admin, Brand")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto productDto)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.PutAsJsonAsync($"{_urls.Value.Main}/api/products", productDto);
            if (response.IsSuccessStatusCode)
            {
                var product = await response.Content.ReadFromJsonAsync<Product>();
                return Ok(product);
            }
            return BadRequest("Error while updating product");
        }

        [Authorize(Roles = "Admin,Brand")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var tokenWithBearer = Request.Headers["Authorization"].ToString();
                var token = tokenWithBearer.Split(" ")[1];
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.DeleteAsync($"{_urls.Value.Main}/api/products/{id}");
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            return BadRequest("Error while deleting product");
        }
    }
}