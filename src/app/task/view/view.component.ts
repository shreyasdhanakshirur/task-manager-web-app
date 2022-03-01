import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
  
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
   
  id: number;
  post: any;
  subTasks : any;
  constructor(
    public postService: TaskService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
  
  ngOnInit(): void {
    let arr: { value: boolean; key: any; }[] = []
    this.id = this.route.snapshot.params['id'];
    this.postService.find(this.id).subscribe((data: Task)=>{
      this.post = data;
      this.subTasks =  this.post.task.subTasks;
      this.subTasks.forEach((key: any) => {
        let obj = {
          "value":true,
          "key":key
        }
        arr.push(obj)
      });
        });
        this.subTasks = arr
  }

  onCheckChange(event : any){
   console.log(event.target.value);
   let obj = this.post.task;
  
   var index = obj.subTasks.indexOf(event.target.value);
if (index >= 0) {
  obj.subTasks.splice( index, 1 );
}
   let reqObject = {
    "_id" : obj._id,
    "title" : obj.title,
    "description" : obj.description,
    "dateCreated" : obj.dateCreated,
    "dateModified" : obj.dateModified,
    "status" : obj.status,
    "subTasks" : obj.subTasks,
    "__v" : 0
}
console.log(JSON.stringify(reqObject));
this.postService.completeSubTask(reqObject._id,reqObject).subscribe(res => {
  console.log('Post created successfully!');
  alert(`Successfully completed ${event.target.value} sub task`)
  if(this.subTasks.length === 0)
  this.router.navigateByUrl('task/index');
})
  }
}