import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import * as moment from 'moment';
    
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  tasks: Task[] = [];

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAll().subscribe((data: Task[])=>{
      this.tasks = data;
    })  
  }
  formatDate(date:any){
    return moment(date).format('YYYY-MM-DD hh:mm:ss');
  }
}
