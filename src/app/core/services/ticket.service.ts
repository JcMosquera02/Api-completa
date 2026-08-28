import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTickets(params?: { status?: string; priority?: string; page?: number; limit?: number }) {
    return this.http.get(`${this.API_URL}/tickets`, { params });
  }

  getTicketById(id: string) {
    return this.http.get(`${this.API_URL}/tickets/${id}`);
  }

  createTicket(ticket: { title: string; description: string; priority: string }) {
    return this.http.post(`${this.API_URL}/tickets`, ticket);
  }

  updateTicket(id: string, ticket: any) {
    return this.http.patch(`${this.API_URL}/tickets/${id}`, ticket);
  }

  getComments(ticketId: string) {
    return this.http.get(`${this.API_URL}/tickets/${ticketId}/comments`);
  }

  addComment(ticketId: string, body: string) {
    return this.http.post(`${this.API_URL}/tickets/${ticketId}/comments`, { body });
  }
}