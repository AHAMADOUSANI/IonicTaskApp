import { Component } from '@angular/core';
import { AuthenticationService } from 'shared/authentication-service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
interface Task {
  key: string | null;
  text: any;
  hour: any;
  status:any;
  checked: any;
  nom:string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage  {

  constructor(
    public authService: AuthenticationService,
    public afDB: AngularFireDatabase,
  ) { 
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
        this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();
  }

  currentDate: string;
  addTask!: boolean;
  tasks: Task[] = [];
  myTask = '';
  taskStatus="";
  name="";

  

  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
    this.taskStatus="";
    this.name="";
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      status: this.taskStatus,
      nom: this.name,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }

  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked,
          status:action.payload.exportVal().status,
          nom:action.payload.exportVal().nom
        });
      });
    });
  }

  changeCheckState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }


}
