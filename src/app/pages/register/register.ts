import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.successMsg = '¡Cuenta creada exitosamente!';
      setTimeout(() => this.router.navigate(['/dashboard']), 1500);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMsg = 'Este correo ya está registrado';
      } else if (error.code === 'auth/weak-password') {
        this.errorMsg = 'La contraseña debe tener mínimo 6 caracteres';
      } else {
        this.errorMsg = 'Error al crear la cuenta';
      }
    }
  }
}