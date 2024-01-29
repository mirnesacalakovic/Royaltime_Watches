namespace APIGateway.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Gender { get; set; }
        public string Model { get; set; }
        public string DialColor { get; set; }
        public string StrapType { get; set; }
        public int QuantityInStock { get; set; }
        public string PublicId { get; set; }
        public ICollection<WishlistItem> Wishlist { get; set; }

    }
}