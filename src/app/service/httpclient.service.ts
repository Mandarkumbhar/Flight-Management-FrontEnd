import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Role } from '../shared/Role';

export class User{
  public id:string | undefined;
  public role:Role | undefined;
  public userName:string | undefined;
  public password:string | undefined;
  public email:string | undefined;
  public mobileNumber:number | undefined;
    
  
}



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private baseUrl='http://localhost:9191/FMS/user';
  constructor(
    private httpClient:HttpClient
  ) { 
     }

     

     getUsers(){
 
  const headers = new HttpHeaders({ Authorization: 'Bearer ' + sessionStorage.getItem('token') });
  
   return this.httpClient.get<User[]>(`${this.baseUrl}/viewAllUsers`,{headers});
  }


  public signUp(user: any) {
    console.log(user);
    return this.httpClient.post<User>(`${this.baseUrl}/addUser`,user);
  }
}