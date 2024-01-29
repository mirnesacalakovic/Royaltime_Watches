using System.ComponentModel.DataAnnotations.Schema;

namespace APIGateway.Entities
{
    [Table("BasketItems")]//data anotations
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; } //dodajemo i parenta ovde da bismo dobili međusobnu zavisnost između Basketa i basketItemsa
        public Basket Basket { get; set; }
    }
}