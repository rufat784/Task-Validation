using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AddUserApp.Data;
using AddUserApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace AddUserApp.Controllers
{
    public class ContactController : Controller
    {
        private readonly AppDbContext _context;
        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            User user = new User();
            return View(user);
        }

        [HttpPost]
        public IActionResult Index(User model)
        {
            if (ModelState.IsValid)
            {
                User user = _context.Users.FirstOrDefault(c => (c.Phone == model.Phone)||(c.Email == model.Email));

                if (user==null)
                {
                    User user1 = new User();
                    user1.Name = model.Name;
                    user1.Email = model.Email;
                    user1.Phone = model.Phone;

                    _context.Users.Add(user1);
                    _context.SaveChanges();
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    if (user.Phone == model.Phone)
                    {
                        ModelState.AddModelError("Phone", "Phone already exists");

                    }
                    else
                    {
                        ModelState.AddModelError("Email", "Email already exists");
                    }
                }
            }

            return View();
        }
    }
}
