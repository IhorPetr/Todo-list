using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ServerTodo.Data.Entities;
using ServerTodo.Data.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerTodo.Controllers
{
    public class HomeController : Controller
    {
        private IRepository<TodoEntity> r;

        public HomeController(IRepository<TodoEntity> r)
        {
            this.r = r;
        }
        [HttpGet]
        [Route("Todo")]
        public IActionResult GetAll()
        {
            return Ok(r.GetAll().ToList());
        }
        [HttpGet]
        [Route("Todo/{id}")]
        public IActionResult Get(int id)
        {
            TodoEntity item = r.Get(id);
            if (item != null)
                return Ok(item);

            return NotFound();
        }
        [HttpPost]
        [Route("Todo")]
        public IActionResult Post([FromBody]TodoEntity item)
        {
            return Ok(r.Create(item));
        }
        [HttpPut]
        [Route("Todo/{id}")]
        public IActionResult Put(int id, [FromBody]TodoEntity item)
        {
            TodoEntity u = r.Update(id,item);
            if (u!=null)
            {
                return Ok(u);
            }
            return NotFound();
        }
        [HttpDelete]
        [Route("Todo/{id}")]
        public IActionResult Delete(int id)
        {
            TodoEntity u = r.Delete(id);
            if (u != null)
            {
                return Ok(u);
            }
            return NotFound();
        }
    }
}

