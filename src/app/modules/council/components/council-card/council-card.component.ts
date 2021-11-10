import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Post } from '../../../../interfaces/post.interface';
import { Author } from '../../../../interfaces/author.interface';
import { find } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'council-card',
  templateUrl: './council-card.component.html',
  styleUrls: ['./council-card.component.scss']
})
export class CouncilCardComponent implements OnInit {
  @Input()
  post: Post;
  @Input()
  authors: Author[];
  author: Author;
  startDate: string;
  // allowFeedback: string;
  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {
   }

  ngOnInit() {
    let authorId = this.post.authorId;
    let date = new Date(this.post.createdDate);
    this.startDate = this.datePipe.transform(date, "mediumDate");
    this.author = find(this.authors, ['id', authorId]);
    // console.log(this.post);
    // console.log(this.author);
    // console.log(authorId);
  }
}
