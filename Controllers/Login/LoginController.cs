using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace GrimLogin.Controllers.Login
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //[Route("{statusCode}")]
        //public IActionResult NotFoundPageHandler(int statusCode)
        //{
        //    switch (statusCode)
        //    {
        //        case 404:
        //            ViewBag.ErrorMsg = " sorry, page not found";
        //            break;
        //    }
        //    return View("NotFound");
        //}
    }
}
