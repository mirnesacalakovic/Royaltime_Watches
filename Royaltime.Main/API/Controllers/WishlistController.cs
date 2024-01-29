using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class WishlistController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public WishlistController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet(Name = "GetWishlist")]
        public async Task<ActionResult> GetWishlist()
        {
            var wishlist = await RetrieveWishlist(GetBuyerId());

            if (wishlist == null) return NotFound();

            return Ok(wishlist);
        }
        [HttpPost("add/{productId}")]
        public async Task<ActionResult<WishlistItemDto>> AddItemToWishlist(int productId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == GetBuyerId());
            if (user == null) return Unauthorized();
            var wishlistItem = new WishlistItem
            {
                UserId = user.Id,
                ProductId = productId
            };

            var item = await _context.WishlistItems.SingleOrDefaultAsync(i => i.UserId == user.Id && i.ProductId == productId);
            if (item != null) return BadRequest("Item already in wishlist");

            _context.WishlistItems.Add(wishlistItem);
            await _context.SaveChangesAsync();

            var wishlistItemDB = await _context.WishlistItems
                    .Include(i => i.Product)
                    .Include(i => i.User)
                    .ProjectTo<WishlistItemDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(i => i.UserId == user.Id && i.ProductId == productId);

            return Ok(wishlistItemDB);
        }
        [HttpDelete("remove/{productId}")]
        public async Task<ActionResult> RemoveWishlistItem(int productId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == GetBuyerId());
            if (user == null) return Unauthorized();
            var wishlistItem = await _context.WishlistItems.SingleOrDefaultAsync(i => i.UserId == user.Id && i.ProductId == productId);
            if (wishlistItem == null) return NotFound();
            _context.WishlistItems.Remove(wishlistItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private async Task<List<WishlistItemDto>> RetrieveWishlist(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == buyerId);

            return await _context.WishlistItems
                    .Include(i => i.Product)
                    .Where(i => i.UserId == user.Id)
                    .Select(i => _mapper.Map<WishlistItemDto>(i))
                    .ToListAsync();
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
    }
}