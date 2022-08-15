using AutoMapper;
using iself.Data.Repositories;
using iself.Data.Repositories.Interfaces;
using iself.Services;
using iself.Services.Interfaces;
using iself.Utils;
using System.Text.Json.Serialization;
using iself.Controllers.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using FluentValidation.AspNetCore;
using iself.Logger;
using iself.Data;
using iself.Config;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

ConfigureLogger.ConfigureSerilog();

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.Converters.Add(new TrimmingJsonConverter());
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddFluentValidationAutoValidation(s =>
{
    s.DisableDataAnnotationsValidation = true;
}).AddFluentValidationClientsideAdapters();

//Firebase

FireBaseAdminConfig fireBaseAdminConfig = new();

builder.Configuration.GetSection(FireBaseAdminConfig.Option).Bind(fireBaseAdminConfig);

var json = JsonSerializer.Serialize(fireBaseAdminConfig);

_ = FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromJson(json),
});

var firebaseAppId = builder.Configuration.GetValue<string>("FirebaseAppId");
//Authentication
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/" + firebaseAppId;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://securetoken.google.com/" + firebaseAppId,
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

builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IUserService, UserService>();

builder.Services.AddSingleton<IAppFeedbackRepository, AppFeedbackRepository>();
builder.Services.AddSingleton<IAppFeedbackService, AppFeedbackService>();

builder.Services.AddSingleton(typeof(NewPostValidator));
builder.Services.AddSingleton(typeof(NewFeedbackValidator));
builder.Services.AddSingleton(typeof(NewUserValidator));

//Database settings

builder.Services.AddSingleton(typeof(MongoDbContext<>));
builder.Services.Configure<MongoDbConfigs>(builder.Configuration.GetSection(MongoDbConfigs.Option));

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

await SeedRepository.StartSeeding(app.Services, builder.Configuration);
app.Run();
