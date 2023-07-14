using Microsoft.AspNetCore.Mvc;

namespace GrimLogin.Controllers.NotFound
{
    public class ErrorController : Controller
    {
        public IActionResult HandleError(int statusCode)
        {
            if (statusCode == 404)
            {
                // Handle other status codes or redirect to a default error page
                return View();
            }
            // Redirect to home page or error page
            //return RedirectToAction("Index", "Home");
            return View();
        }
    }
}
