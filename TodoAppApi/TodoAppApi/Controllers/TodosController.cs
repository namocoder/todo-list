using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAppApi.Entities;

namespace TodoAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        #region Init
        private readonly TodoListAppDbContext _db;
        public TodosController(TodoListAppDbContext db)
        {
            _db = db;
        }
        #endregion

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _db.TodoLists.ToListAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(TodoList vm)
        {
            try
            {
                _db.TodoLists.Add(vm);
                await _db.SaveChangesAsync();

                return Ok(vm.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> MarkAsCompleted(int id)
        {
            try
            {
                TodoList todo = await _db.TodoLists.FindAsync(id);
                if (todo == null)
                    return BadRequest("Todo not found.");

                todo.IsCompleted = !todo.IsCompleted;
                _db.Update(todo);
                await _db.SaveChangesAsync();

                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
