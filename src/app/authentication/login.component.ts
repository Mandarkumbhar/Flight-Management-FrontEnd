import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../shared/Role';
import { AuthenticationService } from '../service/authentication.service';
export class JwtResponse{

  jwtToken:string | undefined;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {

    userName: '',
    password: ''
 
  };
  userName = ''
  password = ''
  role:Role | undefined
  email = ''
  mobileNumber: any
  errorMessage = ''
  invalidLogin:boolean = false
  response!:JwtResponse
  loginForm: Form | undefined

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }


  

  ngOnInit() {
    
  }
 

  checkLogin() { console.log(this.userName);
    console.log(this.password);
    (this.loginservice.authenticate(this.userName, this.password).subscribe(
      data => {
        console.log(data);
        console.log(this.userName);
                  
         (this.loginservice.getRole(this.role, this.userName).subscribe(
          data =>{
            console.log(data)
            sessionStorage.setItem('role',data);
            if(data == "ADMIN"){
              this.router.navigate(['/admin'])
            }
            else{
              this.router.navigate(['/user'])
          }
        }
          )
          ); 
      
        this.invalidLogin = false
      },
      err => {
        console.log("Error Occoured");
        this.errorMessage = err.error.message;
        this.invalidLogin = true

      }
    )
    );


  }

  setValues(data:any){
    console.log("in set values",data)
    sessionStorage.setItem('userName',this.userName);
        sessionStorage.setItem('token',data.token)

      console.log('data set')

  
  }

}

