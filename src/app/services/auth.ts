import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  // Observable del usuario actual (como un "listener" en Python)
  currentUser$ = user(this.auth);

  // Registro con email y contraseña
  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login con email y contraseña
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Login con Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Cerrar sesión
  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}