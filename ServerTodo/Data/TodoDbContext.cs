using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServerTodo.Data.Entities;

namespace ServerTodo.Data
{
    public class TodoDbContext : DbContext
    {
        public DbSet<TodoEntity> TodoEntity { get; set; }
        public TodoDbContext(DbContextOptions<TodoDbContext> options)
            : base(options)
        {
        }
        //This for Database Consistency
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoEntity>().HasKey(t => t.Id);
            base.OnModelCreating(modelBuilder);
        }
    }
}
