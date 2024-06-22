import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from 'src/app/services/task.service';
import { ModalController } from '@ionic/angular';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent  implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService,private modalCtrl: ModalController) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data.map(task => ({
        id: task.id || '',
        title: task.title || 'Untitled Task',
        description: task.description || 'No Description',
        dueDate: task.dueDate || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Pending'
      }));
    });
  }
  async openTaskForm(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task: task || { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Pending' } }
    });
    return await modal.present();
  }

  deleteTask(task: Task) {
    if (task.id) {
      this.taskService.deleteTask(task.id);
    }
  }

  markAsComplete(task: Task) {
    if (task.id) {
      task.status = 'Completed';
      this.taskService.updateTask(task.id, task);
    }
  }

}
