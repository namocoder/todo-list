using Microsoft.EntityFrameworkCore;
using TodoAppApi.Entities;
using TodoAppApi.Helper;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

Config.DefaultConnectionString = configuration.GetConnectionString("DefaultConnection");
Config.ApiToken = configuration["APIToken"];

// Add services to the container.

builder.Services.AddDbContext<TodoListAppDbContext>(options =>
{
    options.UseSqlServer(Config.DefaultConnectionString);
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
{
    builder
        //.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
        .AllowCredentials();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseMiddleware<TokenAuthenticationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
