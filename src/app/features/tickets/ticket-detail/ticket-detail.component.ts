import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket: any;
  comments: any[] = [];
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.loadTicket(ticketId);
      this.loadComments(ticketId);
    }
  }

  loadTicket(id: string): void {
    this.ticketService.getTicketById(id).subscribe({
      next: (res: any) => this.ticket = res.data,
      error: (err) => console.error(err)
    });
  }

  loadComments(ticketId: string): void {
    this.ticketService.getComments(ticketId).subscribe({
      next: (res: any) => this.comments = res.data,
      error: (err) => console.error(err)
    });
  }

  addComment(): void {
    if (this.commentForm.valid) {
      const ticketId = this.route.snapshot.paramMap.get('id');
      if (ticketId) {
        this.ticketService.addComment(ticketId, this.commentForm.value.body).subscribe({
          next: () => {
            this.commentForm.reset();
            this.loadComments(ticketId);
          },
          error: (err) => console.error(err)
        });
      }
    }
  }
}