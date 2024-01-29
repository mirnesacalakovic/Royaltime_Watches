namespace APIGateway.DTOs
{
    public class WishlistItemDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Model { get; set; }
        public string Gender { get; set; }
        public string StrapType { get; set; }
        public string DialColor { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }

    }
}