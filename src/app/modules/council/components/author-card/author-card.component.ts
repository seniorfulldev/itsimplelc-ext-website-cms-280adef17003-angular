import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Author } from '../../../../interfaces/author.interface';

@Component({
  selector: 'author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {
  @Input()
  author: Author;

  city: string;
  
  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {
    this.city = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit() {
    console.log(this.author);
  }
}
