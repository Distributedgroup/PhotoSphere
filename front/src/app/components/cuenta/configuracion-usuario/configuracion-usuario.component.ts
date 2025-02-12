import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {

  public token = localStorage.getItem('token');
  public user :any = {};
  public usuario : any = {
    gender: '',
    description: '',
  };
  public msm_succes = '';

  constructor(
    private _usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.init_usuario();
  }

  init_usuario(){
    this._usuarioService.get_user(this.user._id,this.token).subscribe(
      response=>{
        this.usuario = response.data;
        if(!this.usuario.gender) this.usuario.gender = '';
        if(!this.usuario.description) this.usuario.description = '';
  
      }
    );
  }

  validate_descripcion(){
   if(this.usuario.description.length > 300) this.usuario.description = this.usuario.description.substring(0,300);
  }

  update(){
    console.log(this.usuario);
    this._usuarioService.update_user(this.usuario._id,this.usuario,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.data != undefined){
          this.msm_succes = 'Se actualizó los datos de la cuenta';
        }
      }
    );
  }
}
