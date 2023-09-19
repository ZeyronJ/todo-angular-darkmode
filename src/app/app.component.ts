import { Component } from '@angular/core';
import { Task } from './models/task.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tasks: Task[] = [];
  task: Task = { title: '', status: false };

  edittingTasks: boolean[] = [];
  showModal: boolean[] = [];

  darkMode: boolean = false;

  changeStatus(index: number) {
    this.tasks[index].status = !this.tasks[index].status;
    localStorage.setItem(
      'task' + (index + 1),
      JSON.stringify(this.tasks[index])
    );
  }

  saveTask() {
    this.tasks.push(this.task);
    localStorage.setItem('task' + this.tasks.length, JSON.stringify(this.task));
    this.task = { title: '', status: false };
    // LS
    localStorage.setItem('taskIndex', JSON.stringify(this.tasks.length));
  }

  saveEditTask(index: number) {
    localStorage.setItem(
      'task' + (index + 1),
      JSON.stringify(this.tasks[index])
    );
    this.edittingTasks[index] = false;
  }

  edditTask(index: number) {
    this.edittingTasks[index] = true;
  }

  handleModal(i: number) {
    this.loadTasks(); // Mala practica, pero como es una app pequeña no hay problema
    this.showModal[i] = !this.showModal[i];
  }

  changeMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }

  loadTasks() {
    this.tasks = [];
    for (let i = 1; i < localStorage.length; i++) {
      const taskString = localStorage.getItem('task' + i);
      if (taskString) {
        const task = JSON.parse(taskString);
        this.tasks.push(task);
      }
    }
  }

  ngOnInit() {
    this.loadTasks();
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true;
    }
    if (localStorage.getItem('darkMode')) {
      this.darkMode = JSON.parse(localStorage.getItem('darkMode') || '');
    }
  }
}
