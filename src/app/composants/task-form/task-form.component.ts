import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task, TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {

  @Input() task: Task = { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Pending' };
  taskForm!: FormGroup;

  constructor(private taskService: TaskService, private modalCtrl: ModalController,private fb: FormBuilder) {}
  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || ''],
      dueDate: [this.task?.dueDate || ''],
      priority: [this.task?.priority || 'Medium'],
      status: [this.task?.status || 'To-do']
    });
  }
  
  saveTask() {
    const formValues = this.taskForm.value;
    if (this.task?.id) {
      // Update existing task
      this.taskService.updateTask(this.task.id, formValues).then(() => {
        this.modalCtrl.dismiss();
      });
    } else {
      // Add new task
      this.taskService.addTask(formValues).then(() => {
        this.modalCtrl.dismiss();
      });
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
