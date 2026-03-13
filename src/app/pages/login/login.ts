import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMsg = '';

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMsg = 'Correo o contraseña incorrectos';
    }
  }

  async loginGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMsg = 'Error al iniciar con Google';
    }
  }
}