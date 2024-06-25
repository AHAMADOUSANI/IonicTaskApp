import { Component } from '@angular/core';
import { AuthenticationService } from 'shared/authentication-service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { interval } from 'rxjs';
interface Task {
  key: string | null;
  text: any;
  hour: any;
  status:any;
  checked: any;
  nom:string;
  startDate: string;
  endDate: string;
  
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
  startDate = '';
  endDate = '';
  completedCount = 0;
  toDoCount = 0;
  inProcessCount = 0;
  reminders: { date: Date, message: string }[] = [];
  

  

  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
    this.taskStatus="";
    this.name="";
    this.startDate = '';
    this.endDate = '';
    
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      status: this.taskStatus,
      nom: this.name,
      date: new Date().toISOString(),
      startDate: this.startDate,
      endDate: this.endDate,
      checked: false
    }).then(() => {
      this.scheduleReminders(this.startDate, this.endDate);
    });
    this.showForm();
  }
  scheduleReminders(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
  
    // Schedule reminder for 5 days before the event
    if (start.getTime() > now.getTime() + 5 * 24 * 60 * 60 * 1000) {
      this.scheduleReminder(new Date(start.getTime() - 5 * 24 * 60 * 60 * 1000), 'Reminder: Your event is in 5 days.');
    }
  
    // Schedule reminder for 1 day before the event
    if (start.getTime() > now.getTime() + 1 * 24 * 60 * 60 * 1000) {
      this.scheduleReminder(new Date(start.getTime() - 1 * 24 * 60 * 60 * 1000), 'Reminder: Your event is tomorrow.');
    }
  
    // Schedule reminder for 2 days before the end date
    if (end.getTime() > now.getTime() + 2 * 24 * 60 * 60 * 1000) {
      this.scheduleReminder(new Date(end.getTime() - 2 * 24 * 60 * 60 * 1000), `Reminder: The task ends in 2 days.`);
    }
  
    // Schedule reminder for 1 day before the end date
    if (end.getTime() > now.getTime() + 1 * 24 * 60 * 60 * 1000) {
      this.scheduleReminder(new Date(end.getTime() - 1 * 24 * 60 * 60 * 1000), `Reminder: The task ends tomorrow.`);
    }
  }
  
  scheduleReminder(date: Date, message: string) {
    const now = new Date();
    const timeUntilReminder = date.getTime() - now.getTime();
  
    if (timeUntilReminder > 0) {
      setTimeout(() => {
        this.reminders.push({ date, message });
      }, timeUntilReminder);
    }
  }
  

  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      this.completedCount = 0;
      this.toDoCount = 0;
      this.inProcessCount = 0;
      actions.forEach(action => {
        const task = {
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked,
          status: action.payload.exportVal().status,
          nom: action.payload.exportVal().nom,
          startDate: action.payload.exportVal().startDate,
          endDate: action.payload.exportVal().endDate,
          reminders: action.payload.exportVal().reminders
        };
        this.tasks.push(task);

        // Compter les tâches selon leur statut
        if (task.status === 'completed') {
          this.completedCount++;
        } else if (task.status === 'to do') {
          this.toDoCount++;
        } else if (task.status === 'in process') {
          this.inProcessCount++;
        }
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
