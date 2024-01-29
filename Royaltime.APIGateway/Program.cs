using System.Text;
using APIGateway.Data;
using APIGateway.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Royaltime.APIGateway;
using Royaltime.APIGateway.Middleware;
using Royaltime.APIGateway.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<Urls>(builder.Configuration.GetSection("Urls"));
builder.Services.AddHttpClient();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<TokenService>();
builder.Services.AddSwaggerGen(c =>
{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put Bearer + your token in the box below",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            jwtSecurityScheme, Array.Empty<string>()
        }
    });
});
builder.Services.AddCors();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddIdentityCore<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
    opt.SignIn.RequireConfirmedEmail = false;
})
    .AddRoles<Role>()
    .AddEntityFrameworkStores<StoreContext>()
    .AddSignInManager<SignInManager<User>>()
    .AddDefaultTokenProviders();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true, //server provera !validnost tokena na osnovu potpisa koji su koristili kada su kreirali token
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("d2bkHqunSpjhTKeR6grUYct7VyWavMCmQJxAXGP5s3Z4wzDBfNtc7hKZSDCVPTN8svRq3QFbHBpAjLXUn4dz9MxEGr2m5eufWyga"))//da API zna koji kljuc je koriscen da ga potpise (isti kljuc koji ga je dektriptovao ce i da ga ekriptuje)
        };
    });
builder.Services.AddAuthorization();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://*:{port}");

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<JwtForwardingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true"); //PERSISTA TOKEN: omogucava da koristimo isti token iznova kad god treba da napravimo isti zahtev
    });
}

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"); //
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
