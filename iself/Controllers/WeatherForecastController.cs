﻿using JsonFlatFileDataStore;
using Microsoft.AspNetCore.Mvc;

namespace iself.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var store = new DataStore("data.json");
            // Get employee collection
            var collection = store.GetCollection<WeatherForecast>();
            var results = collection.AsQueryable().TakeLast(1).FirstOrDefault();
            var id = results != null ? results.Id + 1 : 1;


            var list = collection.AsQueryable().TakeLast(20);

            return list;
        }
    }
}