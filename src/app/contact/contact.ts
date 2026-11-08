import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  readonly contact = signal<ContactInfo | null>(null);
  readonly errMessage = signal('');

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ContactInfo>('http://localhost:3001/contact').subscribe({
      next: (contact) => this.contact.set(contact),
      error: (error: HttpErrorResponse) => this.errMessage.set(error.message),
    });
  }

  sayHello() 
  {
    alert('Hello from Contact Component');
  }
  sayHello2(mydiv:HTMLElement)
  {
    mydiv.innerHTML = 'Nguyễn Thị Long Lanh';
  }
}
