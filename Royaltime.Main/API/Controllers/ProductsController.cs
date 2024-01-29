using System.Text.Json;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context; //treba nam private readonly parametar da bismo imali injection 
        private readonly IMapper mapper;
        private readonly ImageService imageService;

        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            this._context = context;
            this.mapper = mapper;
            this.imageService = imageService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Models, productParams.Genders)
            .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}",  Name = "GetProduct")] //api/products/3   dobijamo 3. product
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null) 
                return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var models = await _context.Products.Select(p => p.Model).Distinct().ToListAsync();
            var genders = await _context.Products.Select(p => p.Gender).Distinct().ToListAsync();

            
            return Ok(new {brands, models, genders});
        }

        [Authorize(Roles = "Admin,Brand")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto) 
        {
            var product = mapper.Map<Product>(productDto);

            if(productDto.File != null) { 
                var imageResult = await imageService.AddImageAsync(productDto.File);

                if(imageResult.Error != null) return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetProduct", new {id = product.Id}, product);

            return BadRequest(new ProblemDetails {Title = "Problem creating product"});
        }

        [Authorize(Roles = "Admin, Brand")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);
            if(product == null) return NotFound();

            mapper.Map(productDto, product);

            if(productDto.File != null) 
            {
                var imageResult = await imageService.AddImageAsync(productDto.File);

                if(imageResult.Error != null) 
                    return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});

                if (!string.IsNullOrEmpty(product.PublicId))
                    await imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails {Title = "Problem updating product"});
        }

        [Authorize(Roles = "Admin,Brand")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
                await imageService.DeleteImageAsync(product.PublicId);

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails {Title = "Problem deleting product"});
        }
    }
}