using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using ServerTodo.Data.Entities;

namespace ServerTodo.Data
{
    public static class SampleData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<TodoDbContext>();
            context.TodoEntity.AddRange(
                new TodoEntity
                {
                    
                    Info = "Stars",
                    IsComplete = false
                },
                new TodoEntity
                {
                    
                    Info = "Comet",
                    IsComplete = false
                },
                new TodoEntity
                {
                    
                    Info = "Galaxy",
                    IsComplete = false
                }
                );
            context.SaveChanges();
        }
    }
}
