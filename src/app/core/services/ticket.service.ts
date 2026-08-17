import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
}