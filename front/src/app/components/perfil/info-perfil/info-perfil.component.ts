import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent implements OnInit {

  public load_data = true;
  public data = false;
  public token = localStorage.getItem('token');
  public username = '';
  public cuenta : any = {};
  public user: any = {};
  public msm_error_portada = '';
  public portada = '';
  public avatar = '';
  public n_friends = 0;
  public url = GLOBAL.url;
  
  constructor(

    private _userService:UsuarioService,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);

    console.log(this.user);
    
    this._route.params.subscribe(
      params=>{
        this.username = params['username'];
        this.init_user();
      }
    );
  }

init_user() {
    this.load_data = true;
    this._userService.get_user_username(this.username, this.token).subscribe(
        response => {
            console.log("Respuesta API en Angular:", response); // Depuración
            if (response.data !== undefined) {
                this.data = true;
                this.n_friends = response.n_friends;
                this.cuenta = response.data;
                console.log("Datos de cuenta:", this.cuenta);

                this.portada = this.cuenta.portada ? this.url + 'get_cover_img/' + this.cuenta.portada : 'assets/images/portada.jpg';
                this.avatar = this.cuenta.avatar !== 'defecto.png' ? this.url + 'get_cover_img/' + this.cuenta.avatar : 'assets/images/usuario.png';
            } else {
                this.data = false;
            }
            this.load_data = false;
        },
        error => {
            console.error("Error en la API:", error);
            this.load_data = false;
        }
    );
}

  uploadImage(event:any,tipo:any){
    var file = event.target.files[0];

    if(file){
      if(file.type == 'image/webp'||file.type == 'image/png'||file.type == 'image/jpg'||file.type == 'image/gif'||file.type == 'image/jpeg'){
        if(file.size <= 2000000){
          if(tipo == 'Portada'){
            this.msm_error_portada = '';
            console.log(file);
            this._userService.update_user_cover({portada:file},this.token).subscribe(
              response=>{
                console.log(response);
                this.init_user();
              }
            );
          }else if(tipo == 'Avatar'){
            this.msm_error_portada = '';
            this._userService.update_user_avatar({avatar:file},this.token).subscribe(
              response=>{
                console.log(response);
                this.init_user();
              }
            );
          }
        }else{
          this.msm_error_portada = 'El tamaño supero el limite';
        }
      }else{
        this.msm_error_portada = 'El formato no es valido';
      }
      console.log(this.msm_error_portada);
      
    }
    
  }
}
