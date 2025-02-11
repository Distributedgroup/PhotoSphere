import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {

  public token = localStorage.getItem('token');
  public usuario :any = {};
  public user : any = {
    gender: '',
    description: '',
  };
  public msm_succes = '';

  constructor(
    private _usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario')!);
    this.init_usuario();
  }

  init_usuario(){
    this._usuarioService.get_user(this.user._id,this.token).subscribe(
      response=>{
        this.user = response.data;
        if(!this.user.gender) this.user.gender = '';
        if(!this.user.description)   this.user.description = '';
  
      }
    );
  }

  validate_descripcion(){
   if(this.user.description.length > 300) this.user.description= this.user.description.substring(0,300);
  }

  update(){
    console.log(this.user);
    this._usuarioService.update_user(this.user._id,this.user,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.data != undefined){
          this.msm_succes = 'Se actualizó los datos de la cuenta';
        }
      }
    );
  }
}
