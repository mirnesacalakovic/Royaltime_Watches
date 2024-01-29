using System.ComponentModel.DataAnnotations;

namespace APIGateway.DTOs
{
    public class UpdateProductDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Price { get; set; }
        public IFormFile File { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Gender { get; set; }
        public string DialColor { get; set; }
        public string StrapType { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        [Range(0, 200)]
        public int QuantityInStock { get; set; }
    }
}