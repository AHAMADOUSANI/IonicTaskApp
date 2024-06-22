import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbPath = '/tasks';

  constructor(private db: AngularFireDatabase) {}

  getAllTasks() {
    return this.db.list<Task>(this.dbPath).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addTask(task: Task) {
    return this.db.list<Task>(this.dbPath).push(task);
  }

  updateTask(key: string, task: Task) {
    return this.db.list<Task>(this.dbPath).update(key, task);
  }

  deleteTask(key: string) {
    return this.db.list<Task>(this.dbPath).remove(key);
  }
}
