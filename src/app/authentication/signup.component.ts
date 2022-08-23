import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../shared/Role';
import { AuthenticationService } from '../service/authentication.service';

export class JwtResponse{

  jwtToken:string | undefined;
}
@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: any = {
    userName: '',
    password: '',
    email: '',
    mobileNumber:null
    
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router,private signUpService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { userName, password, email, mobileNumber } = this.form;

    this.signUpService.signUp(Role.USER, userName, password, email, mobileNumber).subscribe(
      data => {  
        console.log(data);
        /* this.router.navigate(['/login']); */
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  a(){
    this.router.navigate(['/login'])
    
  }
}
