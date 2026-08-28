import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTickets(params?: { status?: string; priority?: string; page?: number; limit?: number }) {
    let httpParams = new HttpParams();
    if (params) {
      if (params.status) httpParams = httpParams.append('status', params.status);
      if (params.priority) httpParams = httpParams.append('priority', params.priority);
      if (params.page) httpParams = httpParams.append('page', params.page.toString());
      if (params.limit) httpParams = httpParams.append('limit', params.limit.toString());
    }
    return this.http.get(`${this.API_URL}/tickets`, { params: httpParams });
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