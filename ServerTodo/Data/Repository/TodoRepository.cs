using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServerTodo.Data.Entities;
using ServerTodo.Data.Interfaces;

namespace ServerTodo.Data.Repository
{
    public class TodoRepository : IRepository<TodoEntity>
    {
        private TodoDbContext db;
        public TodoRepository(TodoDbContext db)
        {
            this.db = db;
        }
        public IEnumerable<TodoEntity> GetAll()
        {
            return db.TodoEntity;
        }
        public TodoEntity Get(int id)
        {
            return db.TodoEntity.Find(id);
        }

        public TodoEntity Create(TodoEntity item)
        {
            db.TodoEntity.Add(item);
            db.SaveChanges();
            return item;
        }

        public TodoEntity Update(int id,TodoEntity item)
        {
            TodoEntity u = db.TodoEntity.Find(id);
            if (u != null)
            {
                u.Info = item.Info;
                u.IsComplete = item.IsComplete;
                db.Entry(u).State = EntityState.Modified;
                db.SaveChanges();
                return item;
            }
            return null;
        }

        public TodoEntity Delete(int id)
        {
            TodoEntity book = db.TodoEntity.Find(id);
            if (book != null)
            {
                db.TodoEntity.Remove(book);
                db.SaveChanges();
                return book;
            }
            return null;
        }
    }
}
