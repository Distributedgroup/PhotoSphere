import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario : any = {};
  public msm_error = '';

  constructor(
    private _userService:UserService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this._router.navigate(['/']);
    }
  }

  login(){
    console.log(this.usuario);
    this.usuario.email = this.usuario.email.trim();
    this._userService.login_user(this.usuario).subscribe(
      response=>{
        console.log(response);
        if(response.data != undefined){
          //
          this.msm_error = '';
          localStorage.setItem('token',response.token);
          localStorage.setItem('user',JSON.stringify(response.data));
          this._router.navigate(['/']);
        }else{
          this.msm_error = response.message;
        }
      }
    );
  }

}
