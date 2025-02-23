using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TodoAppApi.Entities;

public partial class TodoList
{
    public int Id { get; set; }
    [StringLength(500)]
    public string Title { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string Description { get; set; }

    public bool IsCompleted { get; set; }
}
