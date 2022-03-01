import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = "https://manage-task-app.herokuapp.com";
     
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<any> {

    return this.httpClient.get(this.apiURL + '/getTasks/')

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(task:Task): Observable<any> {

    return this.httpClient.post(this.apiURL + '/addTask/', JSON.stringify(task), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }  
     
  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/task?id=' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  update( task:any): Observable<any> {

    return this.httpClient.post(this.apiURL + '/addSubTasks' , JSON.stringify(task), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  completeSubTask(id:any,data:any) : Observable<any>{
    return this.httpClient.put(this.apiURL + `/updateTask?id=${id}`, JSON.stringify(data), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
 
    
    
  errorHandler(error:any): Observable<any> {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
