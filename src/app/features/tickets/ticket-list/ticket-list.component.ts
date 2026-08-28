import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  userRole: string | null = null;
  filters = {
    status: '',
    priority: '',
    page: 1,
    limit: 10
  };

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.filters).subscribe({
      next: (res: any) => {
        this.tickets = res.data || [];
        console.log('Tickets cargados:', this.tickets); // Verifica en la consola
      },
      error: (err) => {
        console.error('Error al cargar tickets:', err);
      }
    });
  }

  onFilterChange(): void {
    this.filters.page = 1;
    this.loadTickets();
  }

  nextPage(): void {
    this.filters.page++;
    this.loadTickets();
  }

  prevPage(): void {
    if (this.filters.page > 1) {
      this.filters.page--;
      this.loadTickets();
    }
  }
}