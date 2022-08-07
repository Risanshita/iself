﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iself.Controllers
{
    [Route("auth")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {


        // POST api/<AuthController>
        [HttpPost("validate")]
        public IActionResult Post()
        {
            return Ok(new { Message = "Success" });
        }

    }
}
