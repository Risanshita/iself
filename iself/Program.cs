using AutoMapper;
using iself.Data.Repositories;
using iself.Data.Repositories.Interfaces;
using iself.Services;
using iself.Services.Interfaces;
using iself.Utils;
using System.Text.Json.Serialization;
using FluentValidation.AspNetCore;
using iself.Controllers.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddFluentValidation(s =>
{
    s.DisableDataAnnotationsValidation = true;
    s.AutomaticValidationEnabled = false;
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.Converters.Add(new TrimmingJsonConverter());
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

//Firebase
//var app = FirebaseApp.Create(new AppOptions()
//{
//    Credential = GoogleCredential.FromFile("iself-a253a-firebase-adminsdk-vo7o4-06ed92842a.json"),
//});

var firebaseAppId = Environment.GetEnvironmentVariable("FirebaseAppId");
//Authentication
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/"+ firebaseAppId;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://securetoken.google.com/"+ firebaseAppId,
            ValidateAudience = true,
            ValidAudience = firebaseAppId,
            ValidateLifetime = true
        };
    });
//

builder.Services.AddSingleton(new MapperConfiguration(conf =>
{
    conf.AddProfile(new AutoMapperConfig());
}).CreateMapper());

builder.Services.AddSingleton<IPostRepository, PostRepository>();
builder.Services.AddSingleton<IPostService, PostService>();
builder.Services.AddSingleton(typeof(NewPostValidator));

var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}")
    .RequireAuthorization();

app.MapFallbackToFile("index.html");

app.Run();
