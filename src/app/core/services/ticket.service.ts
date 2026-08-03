import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get(`${this.API_URL}/tickets`);
  }
}