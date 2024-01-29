using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
       public static async Task Initialize(StoreContext context, UserManager<User> userManager)
       {
            if(!userManager.Users.Any()){
                var user = new User {
                    UserName = "bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd"); //automatski cuva ubazu u funk CreateAsync, ne treba saveChangesAsync
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User{
                    UserName = "admin",
                    Email = "admin@test.com"
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});

                var brand = new User {
                    UserName = "brand",
                    Email = "brand@gmail.com"
                };
                await userManager.CreateAsync(brand, "Pa$$w0rd");
                await userManager.AddToRoleAsync(brand, "Brand");
            }

            if(context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Mens Tissot Everytime Sapphire Glass Watch",
                    Description =
                        "Tissot Everytime T1434101103300 is a practical and very impressive Gents watch from Everytime collection. Case is made out of Stainless Steel and the White dial gives the watch that unique look. This model has got 50 metres water resistancy - it can be submerged in water for periods, so can be used for swimming and fishing. It is not recommended for high impact water sports. We ship it with an original box and a guarantee from the manufacturer.",
                    Price = 32527,
                    PictureUrl = "/images/products/tissot-3.jpg",
                    Brand = "Tissot",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Luxury",
                    DialColor = "White",
                    StrapType = "Stainless Steel",
                    QuantityInStock = 14
                },
                new Product
                {
                    Name = "Mens Tissot Chrono XL Watch",
                    Description = "Tissot Chrono XL T1166171609200 is a functional and handsome Gents watch. Case material is Stainless Steel, which stands for a high quality of the item and the Green dial gives the watch that unique look. The features of the watch include (among others) a chronograph. 100 metres water resistance will protect the watch and allows it to get submerged in the water for everyday usage including swimming, but not high impact water sports. We ship it with an original box and a guarantee from the manufacturer.",
                    Price = 40079,
                    PictureUrl = "/images/products/tissot-9-1.jpg",
                    Brand = "Tissot",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Luxury",
                    DialColor = "Green",
                    StrapType = "Leather",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Mens Tissot Gentleman Sapphire Glass Automatic Watch",
                    Description =
                        "Tissot Gentleman T1274071135100 is a functional and attractive Gents watch from Gentleman collection. Case material is Stainless Steel, which stands for a high quality of the item and the Blue dial gives the watch that unique look. This model has 100 metres water resistance - it is suitable for swimming, but not high impact. We ship it with an original box and a guarantee from the manufacturer.",
                    Price = 92936,
                    PictureUrl = "/images/products/tissot-7.jpg",
                    Brand = "Tissot",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Classic",
                    DialColor = "Ice Blue",
                    StrapType = "Stainless Steel",
                    QuantityInStock = 25
                },
                new Product
                {
                    Name = "Mens Versace V-PALAZZO Watch",
                    Description =
                        "Versace V-PALAZZO VE2V00422 is a functional and handsome Gents watch. Case material is Stainless Steel and the Black dial gives the watch that unique look. 50 metres water resistancy will protect the watch and allows it to be submerged in water for periods, so can be used for swimming and fishing. It is not recommended for high impact water sports. The watch is shipped with an original box and a guarantee from the manufacturer.",
                    Price = 161476,
                    PictureUrl = "/images/products/versace-3.jpg",
                    Brand = "Versace",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Luxury",
                    DialColor = "Black",
                    StrapType = "Stainless Steel",
                    QuantityInStock = 5
                },
                new Product
                {
                    Name = "Mens Seiko Seiko 5 Sports Field X Flieger Suits Style Automatic Automatic Watch",
                    Description =
                        "Seiko Seiko 5 Sports Field X Flieger Suits Style SRPJ89K1 is a functional and special Gents watch from 5 Sports collection. Case material is Stainless Steel, which stands for a high quality of the item and the Green dial gives the watch that unique look. In regards to the water resistance, the watch has a water resistance of 100 metres. This makes it suitable for swimming, but not high impact water sports. The watch is shipped with an original box and a guarantee from the manufacturer.",
                    Price = 30204,
                    PictureUrl = "/images/products/seiko-1.jpg",
                    Brand = "Seiko",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Sport",
                    DialColor = "Green",
                    StrapType = "Leather",
                    QuantityInStock = 29
                },
                new Product
                {
                    Name = "Mens Seiko Presage Sharp Edged Watch",
                    Description =
                        "Seiko Presage Sharp Edged SPB305J1 is a practical and attractive Gents watch from Presage collection. Case is made out of Stainless Steel while the dial colour is Blue. 100 metres water resistance will protect the watch and allows it to get submerged in the water for everyday usage including swimming, but not high impact water sports. The watch is shipped with an original box and a guarantee from the manufacturer.",
                    Price = 109199,
                    PictureUrl = "/images/products/seiko-2.jpg",
                    Brand = "Seiko",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Prestige",
                    DialColor = "Powder Blue",
                    StrapType = "Stainless Steel",
                    QuantityInStock = 12
                },
                new Product
                {
                    Name = "Mens Seiko Presage Sharp Edged Watch",
                    Description =
                        "Seiko Presage Sharp Edged SPB311J1 is a functional and handsome Gents watch from Presage collection. Case material is Stainless Steel, which stands for a high quality of the item while the dial colour is Blue. 100 metres water resistance will protect the watch and allows it to get submerged in the water for everyday usage including swimming, but not high impact water sports. We ship it with an original box and a guarantee from the manufacturer.",
                    Price = 105714,
                    PictureUrl = "/images/products/seiko-3.jpg",
                    Brand = "Seiko",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Sport",
                    DialColor = "Midnight Blue",
                    StrapType = "Leather",
                    QuantityInStock = 21
                },
                new Product
                {
                    Name = "Mens Seiko Presage Sharp Edged Watch",
                    Description =
                        "Seiko Presage Sharp Edged SPB227J1 is a practical and handsome Gents watch from Presage collection. Case material is Stainless Steel while the dial colour is Red. 100 metres water resistance will protect the watch and allows it to get submerged in the water for everyday usage including swimming, but not high impact water sports. We ship it with an original box and a guarantee from the manufacturer.",
                    Price = 102229,
                    PictureUrl = "/images/products/seiko-4.jpg",
                    Brand = "Seiko",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Classic",
                    DialColor = "White",
                    StrapType = "Stainless Steel",
                    QuantityInStock = 12
                },
                new Product
                {
                    Name = "Mens Seiko Automatic Automatic Watch",
                    Description =
                        "Seiko SPB223J1 is an amazing and special Gents watch from Presage Sharp Edge GMT LTD collection. Case material is Stainless Steel while the dial colour is Silver. This model has 100 metres water resistance - it is suitable for swimming, but not high impact. We ship it with an original box and a guarantee from the manufacturer.",
                    Price = 151020,
                    PictureUrl = "/images/products/seiko-5.jpg",
                    Brand = "Seiko",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Classic",
                    DialColor = "Red",
                    StrapType = "Stainless Steel",
                    QuantityInStock = 12
                },
                new Product
                {
                    Name = "Mens Seiko Presage Sharp Edged Series Automatic Automatic Watch",
                    Description =
                        "With timeless looks and precisely Japanese mechanical timekeeping, this timepiece is from the Seiko Presage collection. The dial pattern is inspired by a traditional Japanese artistic design of a plant grown in Japan for over 10,000 years - hemp. This ancient pattern has been seen in Japanese artisan objects since the Heian period (794-1185). Minimalistic in design with a distinct Japanese aesthetic, the model introduces an angular style to the Presage collection, visible from the dial pattern to the sharp edges of the case shape.",
                    Price = 99906,
                    PictureUrl = "/images/products/seiko-6.jpg",
                    Brand = "Seiko",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Classic",
                    DialColor = "Brown",
                    StrapType = "Leather",
                    QuantityInStock = 20
                },
                new Product
                {
                    Name = "Certina DS Action Diver Blue Dial Silver Water Resistant Watch",
                    Description =
                        "The DS Action Diver has long been a favourite in the Certina collection. The latest addition to the family takes its qualities to the extreme. Ready for all kinds of action, the DS Action Diver accompanies its wearer with just as much confidence to a business meeting, a dip in the pool or a gala dinner. It owes this versatility to its sporty, elegant style combined with ultra-robust diver’s watch features.",
                    Price = 88943,
                    PictureUrl = "/images/products/certina-1.jpg",
                    Brand = "Certina",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Classic",
                    DialColor = "Blue",
                    StrapType = "Stainless Steel",
                    QuantityInStock = 16
                },
                new Product
                {
                    Name = "Mens Certina DS-1 Powermatic 80 Automatic Blue Face Watch",
                    Description =
                        "Certina DS-1 Powermatic 80 C0298071104102 is an amazing and attractive Gents watch from Urban collection. Case is made out of Stainless Steel while the dial colour is Blue. 100 metres water resistance will protect the watch and allows it to get submerged in the water for everyday usage including swimming, but not high impact water sports. We ship it with an original box and a guarantee from the manufacturer.",
                    Price = 92431,
                    PictureUrl = "/images/products/certina-2.jpg",
                    Brand = "Certina",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Sport",
                    DialColor = "Blue",
                    StrapType = "NATO",
                    QuantityInStock = 17
                },
                new Product
                {
                    Name = "Mens Certina DS-8 Chronograph Moonphase Blue Dial Leather Strap Watch",
                    Description =
                        "Certina DS-8 Chronograph moonphase C0334601604700 is a practical and very impressive Gents watch from Urban collection. Material of the case is Stainless Steel while the dial colour is Blue. The features of the watch include (among others) a chronograph. 100 metres water resistance will protect the watch and allows it to get submerged in the water for everyday usage including swimming, but not high impact water sports. The watch is shipped with an original box and a guarantee from the manufacturer.",
                    Price = 93594,
                    PictureUrl = "/images/products/certina-3.jpg",
                    Brand = "Certina",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Urban",
                    DialColor = "Blue",
                    StrapType = "Leather",
                    QuantityInStock = 14
                },
                new Product
                {
                    Name = "Mens Montblanc Summit 3 Smartwatch - Titanium",
                    Description =
                        "The Montblanc Summit 3 is a piece of smart luxury for your wrist. The beautiful design of this smartwatch embodies the Maison's heritage of fine Swiss watchmaking and its experience with high-end materials. Although this watch can easily be mistaken for a classical analogue watch at first glance, it is equipped with advanced smart technologies. With improved battery life, multiple health monitoring sensors, a superior fitness experience, enhanced performance and many great apps, Summit 3 supports you in all aspects of your life. You no longer have to choose between technology and elegance.",
                    Price = 128473,
                    PictureUrl = "/images/products/montblanc-1.jpg",
                    Brand = "Montblanc",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Urban",
                    DialColor = "Black",
                    StrapType = "Leather",
                    QuantityInStock = 15
                },
                new Product
                {
                    Name = "Ladies Montblanc Star Legacy Moonphase Automatic Automatic Watch",
                    Description =
                        "The Montblanc Star Legacy product line takes its inspiration from Minerva’s heritage and the company’s pocket watches that were made during the late 19th century and early 20th century. In line with the design codes of the product line, the Montblanc Star Legacy Moonphase and Date features a refined silvery-white dial with the Montblanc exploding star guilloché pattern, prominent Arabic numerals at 3, 9 and 12 o’clock, leaf-shaped hands, a “filet sauté” guilloché motif and a unique railway track.",
                    Price = 376701,
                    PictureUrl = "/images/products/montblanc-2.jpg",
                    Brand = "Montblanc",
                    Gender = "Women",
                    Type = "Analog",
                    Model = "Urban",
                    DialColor = "White",
                    StrapType = "Leather",
                    QuantityInStock = 14
                },
                new Product
                {
                    Name = "Mens Montblanc 1858 Automatic Automatic Watch",
                    Description =
                        "The Montblanc 1858 product line is inspired by the legendary professional Minerva watches from the 1920s and 1930s which were conceived for military use and exploration. Reinterpreting these historical timepieces, the Montblanc 1858 product line expresses the spirit of mountain exploration, embodying the modern trend of returning to nature. The Montblanc 1858 Automatic is one of the purest vintage-inspired timepieces, featuring a blue theme across the dial, case and strap. The case has a fixed steel bezel with a matching shiny blue ceramic and displays the four engraved luminescent cardinal points.",
                    Price = 298221,
                    PictureUrl = "/images/products/Montblanc-3.jpg",
                    Brand = "Montblanc",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Sport",
                    DialColor = "Green",
                    StrapType = "NATO",
                    QuantityInStock = 13
                },
                new Product
                {
                    Name = "Ladies Montblanc Boheme Automatic Automatic Watch",
                    Description = "The timepieces feature Arabic numerals, minute scales with dots, and leaf-shaped hours and minutes hands. The moon complication adds both romance and functionality, while traditional decorations such as guilloché dials and gem-setting set an elegant tone, which is further enhanced by sophisticated cases, slightly faceted horns, and onion crowns. Select pieces also feature bezels set with diamonds",
                    Price = 339496,
                    PictureUrl = "/images/products/montblanc-4.jpg",
                    Brand = "Montblanc",
                    Gender = "Women",
                    Type = "Analog",
                    Model = "Urban",
                    DialColor = "White",
                    StrapType = "NATO",
                    QuantityInStock = 12
                },
                new Product
                {
                    Name = "Mens Montblanc 1858 Geosphere Automatic Automatic Watch",
                    Description =
                        "Celebrating the 160th anniversary of Minerva, the Montblanc 1858 Geosphere honors the heroes of mountain climbing with a professional-grade, innovative timepiece. Built for those who travel the world in their perpetual quest for exploration, it expresses respect for true mountaineers as it is dedicated to the Seven Summits Challenge – the holy grail of climbers. The combination of materials such as steel and ceramic underlines the high quality and exclusiveness of this timepiece. On the dial, the world’s seven summits are marked with red dots on two turning globes and are also engraved on the case back.",
                    Price = 604581,
                    PictureUrl = "/images/products/montblanc-5.jpg",
                    Brand = "Montblanc",
                    Gender = "Men",
                    Type = "Analog",
                    Model = "Classic",
                    DialColor = "Black",
                    StrapType = "Leather",
                    QuantityInStock = 12
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            //drugi nacin za dodavanje
            //context.Products.AddRange(products);

            context.SaveChanges();
       } 
    }
}