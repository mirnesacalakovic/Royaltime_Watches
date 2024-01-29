using Microsoft.AspNetCore.Identity;

namespace APIGateway.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }
        public ICollection<WishlistItem> WishlistItem { get; set; }
    }
}