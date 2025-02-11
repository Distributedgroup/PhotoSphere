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
    const usuarioLocalStorage = localStorage.getItem('usuario');

    if (usuarioLocalStorage) {
        this.usuario = JSON.parse(usuarioLocalStorage);

        if (this.usuario && this.usuario._id) {
            this.init_usuario();
        } else {
            console.error("Error: No se encontró un ID de usuario en localStorage.");
        }
    } else {
        console.error("Error: No se encontró información del usuario en localStorage.");
    }
}


init_usuario(){
    this._usuarioService.get_user(this.usuario._id, this.token).subscribe(
        response => {
            console.log("Respuesta de get_user:", response);
            console.log("Datos en response.data:", response.data);

            if (response.data) {
                this.user = { ...response.data };  // Clonar objeto sin perder propiedades

                if (!this.user._id) {
                    console.error("Error: _id no está en response.data");
                }
            } else {
                console.error("Error: La respuesta de get_user no tiene data.");
            }

            if (!this.user.gender) this.user.gender = '';
            if (!this.user.description) this.user.description = '';
        },
        error => {
            console.error("Error en la petición de get_user:", error);
        }
    );
}


  validate_descripcion(){
   if(this.user.description.length > 300) this.user.description = this.user.description.substring(0,300);
  }

update(){
    console.log("ID antes de enviar:", this.user._id);
    console.log("Token enviado:", this.token);
    console.log("Datos enviados:", this.user);

    if (!this.user._id) {
        console.error("Error: El ID del usuario sigue siendo undefined.");
        return;
    }

    this._usuarioService.update_user(this.user._id, this.user, this.token).subscribe(
        response => {
            console.log("Respuesta del servidor:", response);
            if (response.data) {
                this.msm_succes = 'Se actualizaron los datos de la cuenta';
            }
        },
        error => {
            console.error("Error en la petición de update_user:", error);
        }
    );
}

