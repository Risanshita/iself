using AutoMapper;
using iself.Data.Repositories;
using iself.Data.Repositories.Interfaces;
using iself.Services;
using iself.Services.Interfaces;
using iself.Utils;
using System.Text.Json.Serialization;
using FluentValidation.AspNetCore;
using iself.Controllers.Validators;

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
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;
});

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


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
