import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProviderService } from './shared/service/provider.service';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import {BrowserModule} from '@angular/platform-browser';
import { CreateComponent } from './create/create.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    // We need to add HttpClientModule to use it in our components
    HttpClientModule,
    FormsModule,
  ],
  providers: [ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
