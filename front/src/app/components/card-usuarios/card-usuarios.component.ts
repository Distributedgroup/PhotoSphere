import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/services/historia.service';
import { UserService } from 'src/app/services/user.service';
declare var e:any;
import { io } from "socket.io-client";
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;
declare var tns:any;

@Component({
  selector: 'app-card-usuarios',
  templateUrl: './card-usuarios.component.html',
  styleUrls: ['./card-usuarios.component.css']
})
export class CardUsuariosComponent implements OnInit {

  public token = localStorage.getItem('token');
  public user : any = {};
  public socket = io("http://localhost:4201",{transports: ['websocket']});
  public usuarios : Array<any> = [];
  public url = GLOBAL.url;

  constructor(
    private _historiaService:HistoriaService,
    private _UserService:UserService
  ) { 

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    
    this.socket.on('set-new-invitacion',function(data:any){
      console.log(data);
      if(data.origen.toString() == this.user._id || data.destinario.toString() == this.user._id){
        this.init_usuario();
      }
    }.bind(this));
    
    
    this.init_usuario();
  }
  init_usuario(){
    this._UserService.get_usuario_random(this.token).subscribe(
      response=>{
        this.usuarios = response.data;

        for(var item of this.usuarios){
          if(item.avatar == 'defecto.png') item.avatar = 'assets/images/usuario.png';
          else if(item.avatar != 'defecto.png') item.avatar = this.url + 'obtener_portada_img/'+item.avatar;
        }
        
      }
    );
  }

  send_invitacion(id:any){
    this._UserService.send_invitacion_amistad({
      usuario_destinatario: id
    },this.token).subscribe(
      response=>{
        console.log(response);
        this.socket.emit('send-invitacion',{_id:id});
      }
    );
  }
}
