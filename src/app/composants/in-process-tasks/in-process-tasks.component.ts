import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from 'src/app/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-in-process-tasks',
  templateUrl: './in-process-tasks.component.html',
  styleUrls: ['./in-process-tasks.component.scss'],
})
export class InProcessTasksComponent  implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data
        .filter(task => task.status === 'In Progress')
        .map(task => ({
          id: task.id || '',
          title: task.title || 'Untitled Task',
          description: task.description || 'No Description',
          dueDate: task.dueDate || '',
          priority: task.priority || 'Medium',
          status: task.status || 'In Progress'
        }));
    });
  }
  async openTaskForm(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task: task || { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Completed' } }
    });
    return await modal.present();
  }

  completeTask(task: Task) {
    if (task.id) {
      task.status = 'Completed';
      this.taskService.updateTask(task.id, task);
    }
  }

  deleteTask(task: Task) {
    if (task.id) {
      this.taskService.deleteTask(task.id);
    }
  }
}
