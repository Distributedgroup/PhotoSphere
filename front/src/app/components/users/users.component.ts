import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public search = '';
  public token = localStorage.getItem('token');
  public load_data = true;
  public users : Array<any> = [];
  public url = GLOBAL.url;

  constructor(
    private _route:ActivatedRoute,
    private _userService:UserService
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(
      (params:any)=>{
       
        this.search = params['search'];
        this.init_data();
      }
    );
  }

  init_data(){
    this.load_data = true;
    this._userService.get_users(this.search,this.token).subscribe(
      response=>{
        this.users = response.data;
        for(var item of this.users){
          if(item.avatar == 'defecto.png') item.avatar = 'assets/images/user.png';
          else if(item.avatar != 'defecto.png') item.avatar = this.url + 'obtener_portada_img/'+item.avatar;
        }
        console.log(this.users);
        
        this.load_data = false;
      }
    );
  }

}
