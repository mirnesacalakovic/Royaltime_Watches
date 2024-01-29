namespace APIGateway.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public BasketDto Basket { get; set; }
        public List<WishlistItemDto> WishlistItems { get; set; }
    }
}