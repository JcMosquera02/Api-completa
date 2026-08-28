import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(role?: string | null) {
    let params = new HttpParams();
    if (role) {
      params = params.append('role', role);
    }
    return this.http.get(`${this.API_URL}/users`, { params });
  }

  getUserById(id: string) {
    return this.http.get(`${this.API_URL}/users/${id}`);
  }

  updateUserRole(id: string, role: string) {
    return this.http.patch(`${this.API_URL}/users/${id}/role`, { role });
  }
}