import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
  


const routes: Routes = [
  { path: 'task', redirectTo: 'task/index', pathMatch: 'full'},
  { path: 'task/index', component: IndexComponent },
  { path: 'task/:id/view', component: ViewComponent },
  { path: 'task/create', component: CreateComponent },
  { path: 'task/:id/edit', component: UpdateComponent } 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
