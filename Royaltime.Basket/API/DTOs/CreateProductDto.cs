using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Price { get; set; }
        [Required]
        public IFormFile File { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string DialColor { get; set; }
        [Required]
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