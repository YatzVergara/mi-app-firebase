import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private taskService = inject(TaskService);

  currentUser$ = this.authService.currentUser$;

  tasks: Task[] = [];
  newTitle = '';
  newDescription = '';
  editingTask: Task | null = null;
  userId = '';

  ngOnInit() {
    // Obtener usuario actual y cargar sus tareas
    this.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.taskService.getTasks(user.uid).subscribe(tasks => {
          this.tasks = tasks;
        });
      }
    });
  }

  async saveTask() {
    if (!this.newTitle.trim()) return;

    if (this.editingTask) {
      // Actualizar tarea existente
      await this.taskService.updateTask(this.editingTask.id!, {
        title: this.newTitle,
        description: this.newDescription
      });
      this.editingTask = null;
    } else {
      // Crear nueva tarea
      await this.taskService.addTask({
        title: this.newTitle,
        description: this.newDescription,
        completed: false,
        userId: this.userId,
        createdAt: new Date()
      });
    }

    this.newTitle = '';
    this.newDescription = '';
  }

  startEdit(task: Task) {
    this.editingTask = task;
    this.newTitle = task.title;
    this.newDescription = task.description;
  }

  cancelEdit() {
    this.editingTask = null;
    this.newTitle = '';
    this.newDescription = '';
  }

  async toggleComplete(task: Task) {
    await this.taskService.updateTask(task.id!, {
      completed: !task.completed
    });
  }

  async deleteTask(id: string) {
    await this.taskService.deleteTask(id);
  }

  logout() {
    this.authService.logout();
  }
}