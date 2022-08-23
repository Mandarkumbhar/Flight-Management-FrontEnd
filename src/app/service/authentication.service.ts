import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtResponse } from '../authentication/login.component';
import { Role } from '../shared/Role';

export class User{

  public id:string | undefined;
  public role:Role | undefined;
  public userName:string | undefined;
  public password:string | undefined;
  public email:string | undefined;
  public mobileNumber:number | undefined;
  constructor(
    public status:string,
     ) {}
  

}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
user!:User;
private baseUrl='http://localhost:9191/FMS'
  

  constructor(private httpClient:HttpClient

  ) { 
     }

     authenticate(userName: string, password: string):Observable<any>{
       
       console.log('in authentication service authenticate method',userName, password);
     // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(email + ':' + password) });
      return this.httpClient.post<any>(`${this.baseUrl}/token/generate-token`,{userName,password} )
      .pipe(map(
        userData => {
         sessionStorage.setItem('userName',userName);
         let tokenStr= 'Bearer '+userData.token;
         sessionStorage.setItem('token', tokenStr);
         console.log(userData);
         return userData;
        }
      ));}
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('userName')
   // console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('userName')
  }

  signUp(role: Role, userName: any, password: any, email: any, mobileNumber: any):Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/user/addUser`,{role, userName, password, email, mobileNumber})
  }

  getRole(userName: Role | undefined, role: string):Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + sessionStorage.getItem('token') });
    let a = sessionStorage.getItem("userName")
    console.log(a)
    return this.httpClient.get<any>(`${this.baseUrl}/user/role?userName=` + a, {headers})
      }
}
