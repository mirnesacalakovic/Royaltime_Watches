using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } //table in our database
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; } 
        public DbSet<WishlistItem> WishlistItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne()
                .HasForeignKey<UserAddress>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                    new Role{Id = 1, Name = "Member", NormalizedName = "MEMBER"},
                    new Role{Id = 2, Name = "Admin", NormalizedName = "ADMIN"},
                    new Role{Id = 3, Name = "Brand", NormalizedName = "BRAND"}
                );
            builder.Entity<User>()
                .HasMany(u => u.WishlistItem)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId);
                
            builder.Entity<Product>()
                .HasMany(p => p.Wishlist)
                .WithOne(u => u.Product)
                .HasForeignKey(u => u.ProductId);
        }

    }
}