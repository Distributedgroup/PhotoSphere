import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public msm_error = '';

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this._router.navigate(['/']);
    }
  }

  login(){
    console.log(this.user);
    this.user.email = this.user.email.trim();
    this._usuarioService.login_user(this.user).subscribe(
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
