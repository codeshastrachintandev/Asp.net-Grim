﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GrimLogin.Models;

namespace GrimLogin.Controllers.Home;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Profile()
    {
        return View();
    } 
    public IActionResult MyRequests()
    {
        return View();
    } 
    public IActionResult NewIndent()
    {
        return View();
    }
    public IActionResult Notifications()
    {
        return View();
    }



    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
