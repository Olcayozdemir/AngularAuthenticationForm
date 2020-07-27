import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isSubmitted  =  false;

  constructor( private route: ActivatedRoute, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }
 
  loading = false;
  returnUrl: string;

  ngOnInit() {
    this.authForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

  signIn(){
    this.isSubmitted = true;

    if(this.authForm.invalid){
      return;
    }
    this.authService.signIn(this.authForm.value).subscribe((res)=>{
      this.router.navigateByUrl('/admin');
    });    
    
  }

  get formControls() { return this.authForm.controls; }
  
}
