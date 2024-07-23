import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: string | null = null;
  private userId: string | null = null;
  private userEmail: string | null = null;

  constructor() { 
    this.loadAuthState();
  }

  private loadAuthState() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payloadBase64Url = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64Url));
      this.isAuthenticated = true;
      this.userRole = decodedPayload.usuario_rol;
      this.userId = decodedPayload.usuario_id;
      this.userEmail = decodedPayload.usuario_email;
    }
  }

  login(user: any){
    sessionStorage.setItem("token", user.token);
    this.loadAuthState();
  }

  logout(){
    this.isAuthenticated = false;
    this.userRole = null;
    this.userEmail = null;
    this.userId = null;
    sessionStorage.removeItem("token");
  }

  isLoggedIn(){
    return this.isAuthenticated;
  }

  getToken(): string {
    if (sessionStorage.getItem("token") != null){
      return sessionStorage.getItem("token")!;
    }

    return "";
  }

  getRole(): string | null {
    return this.userRole;
  }

  getUserId(): string | null {
    return this.userId;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }
}
