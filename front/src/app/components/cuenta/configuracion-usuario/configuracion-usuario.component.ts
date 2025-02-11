import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {

  public token: string | null = localStorage.getItem('token');
  public usuario: any = {};
  public user: any = {
    _id: '', // Aseguramos que el _id se inicializa vacío
    gender: '',
    description: '',
    names: '',
    surnames: '',
    profession: '',
    birth: '',
    phone: '',
    email: '',
    username: '',
  };
  public msm_succes = '';

  constructor(private _usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarioDesdeLocalStorage();
  }

  obtenerUsuarioDesdeLocalStorage() {
    try {
      const usuarioLocalStorage = localStorage.getItem('usuario');

      if (usuarioLocalStorage) {
        this.usuario = JSON.parse(usuarioLocalStorage);

        if (this.usuario && this.usuario._id) {
          console.log("ID de usuario obtenido del localStorage:", this.usuario._id);
          this.init_usuario();
        } else {
          console.error("❌ Error: No se encontró un ID de usuario en localStorage.");
        }
      } else {
        console.error("❌ Error: No se encontró información del usuario en localStorage.");
      }
    } catch (error) {
      console.error("❌ Error al obtener datos de localStorage:", error);
    }
  }

  init_usuario() {
    if (!this.usuario._id || !this.token) {
      console.error("❌ Error: No se puede obtener el usuario porque falta el ID o el token.");
      return;
    }

    this._usuarioService.get_user(this.usuario._id, this.token).subscribe(
      response => {
        console.log("✅ Respuesta de get_user:", response);

        if (response?.data) {
          this.user = { ...response.data };

          if (!this.user._id) {
            console.error("❌ Error: _id no está en response.data");
          }
        } else {
          console.error("❌ Error: La respuesta de get_user no tiene data.");
        }

        // Validar valores para evitar undefined en inputs
        this.user.gender = this.user.gender || '';
        this.user.description = this.user.description || '';
        this.user.names = this.user.names || '';
        this.user.surnames = this.user.surnames || '';
        this.user.profession = this.user.profession || '';
        this.user.birth = this.user.birth || '';
        this.user.phone = this.user.phone || '';
        this.user.email = this.user.email || '';
        this.user.username = this.user.username || '';
      },
      error => {
        console.error("❌ Error en la petición de get_user:", error);
      }
    );
  }

  validate_descripcion() {
    if (this.user.description.length > 300) {
      this.user.description = this.user.description.substring(0, 300);
    }
  }

  update() {
    console.log("📌 ID antes de enviar:", this.user._id);
    console.log("📌 Token enviado:", this.token);
    console.log("📌 Datos enviados:", this.user);

    if (!this.user._id) {
      console.error("❌ Error: El ID del usuario sigue siendo undefined. No se enviará la solicitud.");
      return;
    }

    if (!this.token) {
      console.error("❌ Error: No se encontró el token en localStorage.");
      return;
    }

    this._usuarioService.update_user(this.user._id, this.user, this.token).subscribe(
      response => {
        console.log("✅ Respuesta del servidor:", response);
        if (response?.data) {
          this.msm_succes = 'Se actualizaron los datos de la cuenta correctamente.';
        }
      },
      error => {
        console.error("❌ Error en la petición de update_user:", error);
      }
    );
  }
}
