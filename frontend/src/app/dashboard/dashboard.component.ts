import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskName: string = '';
  tasks: string[] = [];

  addTask() {
    if (this.taskName.trim()) {
      this.tasks.push(this.taskName);
      this.taskName = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
