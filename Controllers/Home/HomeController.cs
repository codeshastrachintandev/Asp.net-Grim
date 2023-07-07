using System.Diagnostics;
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

    public IActionResult MyProfile()
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
    public IActionResult NewPurchaseReq()
    {
        return View();
    }
    public IActionResult Servicerequest()
    {
        return View();
    }
    public IActionResult Vendors()
    {
        return View();
    }
    public IActionResult Cart()
    {
        return View();
    }
    public IActionResult MyApprovals()
    {
        return View();
    }
    public IActionResult Itemmaterials()
    {
        return View();
    } 
    public IActionResult Newmaterialrequest()
    {
        return View();
    }
    public IActionResult Returns()
    {
        return View();
    }

    // [Route("Home/{statusCode}")]
    // public IActionResult NotFoundPageHandler(int statusCode)
    // {
    //     switch (statusCode)
    //     {
    //         case 404:
    //             ViewBag.ErrorMsg = "sorry, page not found";
    //             break;
    //         default:
    //             break;
    //     }
    //     return View("NotFound");
    // }


    // "ASPNETCORE_ENVIRONMENT": "Development"
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
