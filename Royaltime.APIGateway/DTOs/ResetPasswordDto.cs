using System.ComponentModel.DataAnnotations;

namespace APIGateway.DTOs
{
    public class ResetPasswordDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Token { get; set; }
        [Required]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$", ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number and be at least 6 characters long")]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }
    }
}