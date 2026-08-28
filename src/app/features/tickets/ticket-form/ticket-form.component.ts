import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  isEditMode: boolean = false;
  ticketId: string | null = null;
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private authService: AuthService
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['open']
    });
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if (this.ticketId) {
      this.isEditMode = true;
      this.loadTicket(this.ticketId);
    }

    if (this.userRole === 'agent') {
      this.ticketForm.get('title')?.disable();
      this.ticketForm.get('description')?.disable();
    }
  }

  loadTicket(id: string): void {
    this.ticketService.getTicketById(id).subscribe({
      next: (res: any) => {
        this.ticketForm.patchValue({
          title: res.data.title,
          description: res.data.description,
          priority: res.data.priority,
          status: res.data.status
        });
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      if (this.isEditMode && this.ticketId) {
        this.ticketService.updateTicket(this.ticketId, this.ticketForm.value).subscribe({
          next: () => this.router.navigate(['/tickets', this.ticketId]),
          error: (err) => console.error(err)
        });
      } else {
        this.ticketService.createTicket(this.ticketForm.value).subscribe({
          next: () => this.router.navigate(['/tickets']),
          error: (err) => console.error(err)
        });
      }
    }
  }
}