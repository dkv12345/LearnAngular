import { Component, signal } from '@angular/core';

import { BookAPIService } from '../services/book-apiservice';

import { Book } from '../classes/Book';

@Component({

  selector: 'app-books-component',

  standalone: false,

  templateUrl: './books-component.html',

  styleUrl: './books-component.css',

})

export class BooksComponent {

  books=signal<Book[]>([]);

  errMessage=signal('')

  server_images_link="http://localhost:3001/images/"

  constructor(private _service: BookAPIService){

    this._service.getBooks().subscribe({

      next:(data)=>{this.books.set(data)},

      error:(err)=>{this.errMessage.set(err)}

    })

  }

}

