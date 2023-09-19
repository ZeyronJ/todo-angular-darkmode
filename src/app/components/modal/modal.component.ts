import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() task = { title: '', index: 0 };

  closeModal() {
    this.closeModalEvent.emit();
  }

  deleteTask() {
    localStorage.removeItem('task' + (this.task.index + 1));
    // Actualiza los índices de las tareas restantes
    const taskIndexString = localStorage.getItem('taskIndex');
    if (!taskIndexString) {
      return;
    }
    const taskIndexNumber = parseInt(taskIndexString);
    for (let i = this.task.index + 1; i <= taskIndexNumber; i++) {
      const nextTask = localStorage.getItem('task' + (i + 1));
      if (nextTask) {
        localStorage.setItem('task' + i, nextTask);
        localStorage.removeItem('task' + (i + 1));
      }
    }

    // Actualiza el índice máximo
    localStorage.setItem('taskIndex', JSON.stringify(taskIndexNumber - 1));

    // Cierra el modal y actualiza la lista de tareas
    this.closeModal();
  }
}
