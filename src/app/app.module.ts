import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AllTasksComponent } from './composants/all-tasks/all-tasks.component';
import { InProcessTasksComponent } from './composants/in-process-tasks/in-process-tasks.component';
import { CompletedTasksComponent } from './composants/completed-tasks/completed-tasks.component';
import { TaskFormComponent } from './composants/task-form/task-form.component';

@NgModule({
  declarations: [AppComponent, AllTasksComponent,InProcessTasksComponent, CompletedTasksComponent, TaskFormComponent],
 
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HammerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    IonicModule
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
