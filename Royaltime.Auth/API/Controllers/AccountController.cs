using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager; //_userManager koristimo da komuniciramo sa bazom onda kada radimo sa userima
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly EmailSender _emailSender;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context, IMapper mapper, EmailSender emailSender)
        {
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
            _emailSender = emailSender;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            var roles = await _userManager.GetRolesAsync(user);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            if (user.UserName == "bob" || roles.Any(r => r.Equals("Brand") || r.Equals("Admin"))) user.EmailConfirmed = true;

           // if (!user.EmailConfirmed) return Unauthorized($"Email not verified|{user.Email}");

            var userBasket = await RetrieveBasket(loginDto.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto(),
                UserName = loginDto.Username,
                WishlistItems = await _context.WishlistItems
                    .Include(i => i.Product)
                    .Where(i => i.UserId == user.Id)
                    .Select(i => _mapper.Map<WishlistItemDto>(i))
                    .ToListAsync()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            // var origin = Request.Headers["origin"];
            // var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            // token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            // var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            // var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>{verifyUrl}</a></p>";

            // var result2 = await _emailSender.SendEmailAsync(user.Email, "Please verify email address", message);

            // if (!result2) return BadRequest("Email sending failed");

            return Ok("Registration successful, please check your email to verify your account");
        }

        [Authorize]
        [HttpPost("brandRegister")]
        public async Task<ActionResult> BrandRegister(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Brand");

            return Ok("Registration successful");
        }


        [HttpPost("verifyEmail")]
        public async Task<ActionResult> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("Invalid email");

            token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));

            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded) return Ok("Email verified");

            return BadRequest("Email not verified");
        }

        [HttpGet("resendEmailConfirmationLink")]
        public async Task<ActionResult> ResendEmailConfirmationLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("Invalid email");

            var origin = Request.Headers["origin"];
            //var host = "https://evently.herokuapp.com";
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:</p><p><a href='{verifyUrl}'>Click here to verify your email</a></p>";

            var result = await _emailSender.SendEmailAsync(user.Email, "Please verify your email", message);

            if (!result) return BadRequest("Email sending failed");

            return Ok("Email confirmation link sent");
        }

        [HttpPost("forgotPassword")]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return Unauthorized("Invalid email");

            var origin = Request.Headers["origin"];
            var host = "https://evently.herokuapp.com";
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var resetUrl = $"{host}/account/resetPassword?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to reset your password:</p><p><a href='{resetUrl}'>Click here to reset your password</a></p>";

            await _emailSender.SendEmailAsync(user.Email, "Reset your password", message);

            return Ok("Password reset link sent");
        }

        [HttpPost("resetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);

            if (user == null) return Unauthorized("Invalid email");

            resetPasswordDto.Token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(resetPasswordDto.Token));

            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);

            if (result.Succeeded) return Ok("Password reset successful");

            return BadRequest("Password reset failed");
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var userBasket = await RetrieveBasket(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                UserName = user.UserName,
                Basket = userBasket?.MapBasketToDto(),  //kad refreshujemo imamo basket
                WishlistItems = await _context.WishlistItems
                    .Include(i => i.Product)
                    .Where(i => i.UserId == user.Id)
                    .Select(i => _mapper.Map<WishlistItemDto>(i))
                    .ToListAsync()
            };
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await _userManager.Users
                .Where(x => x.UserName == User.Identity.Name)
                .Select(user => user.Address)
                .FirstOrDefaultAsync();
        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

    }
}