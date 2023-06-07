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
    }
}
