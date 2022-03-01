import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { FormGroup, FormControl, Validators} from '@angular/forms';
   
@Component({
  selector: 'app-edit',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
    
  id: number;
  post: any;
  form: FormGroup;
  
  constructor(
    public postService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.postService.find(this.id).subscribe((data: Task)=>{
      this.post = data;
    });
    
    this.form = new FormGroup({
      subTasks: new FormControl('', Validators.required)
    });
  }
   
  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    let string = this.form.value.subTasks;
    var array = string.split(',');
    let obj = this.post;
    obj = obj.task;
    let reqObject = {
      "_id" : obj._id,
      "subTasks" : array
      }
    this.postService.update(reqObject).subscribe(res => {
         console.log('Task updated successfully!');
         alert("Task updated with subtasks successfully")
         this.router.navigateByUrl('task/index');
    })
  }
   
}