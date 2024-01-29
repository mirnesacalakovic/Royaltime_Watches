using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
            CreateMap<WishlistItem, WishlistItemDto>()
                .ForMember(i => i.Name, o => o.MapFrom(s => s.Product.Name))
                .ForMember(i => i.Price, o => o.MapFrom(s => s.Product.Price))
                .ForMember(i => i.PictureUrl, o => o.MapFrom(s => s.Product.PictureUrl))
                .ForMember(i => i.Model, o => o.MapFrom(s => s.Product.Model))
                .ForMember(i => i.Type, o => o.MapFrom(s => s.Product.Type))
                .ForMember(i => i.Brand, o => o.MapFrom(s => s.Product.Brand))
                .ForMember(i => i.Gender, o => o.MapFrom(s => s.Product.Gender))
                .ForMember(i => i.StrapType, o => o.MapFrom(s => s.Product.StrapType))
                .ForMember(i => i.DialColor, o => o.MapFrom(s => s.Product.DialColor));
                
        }
    }
}