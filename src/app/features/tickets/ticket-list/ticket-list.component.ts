import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  filters = {
    status: '',
    priority: '',
    page: 1,
    limit: 10
  };

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.filters).subscribe({
      next: (res: any) => this.tickets = res.data,
      error: (err) => console.error(err)
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