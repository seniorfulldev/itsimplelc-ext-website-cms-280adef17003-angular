import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { PostsStoreService } from 'src/app/services/posts-store.service';

import { Author } from '../../interfaces/author.interface';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'council',
  templateUrl: './council.component.html',
  styleUrls: ['./council.component.scss'],
})
export class CouncilComponent implements OnInit {
  // authors: Author[];
  // posts: Post[];
  authors$ = this.authorsStore.data$;
  posts$ = this.postsStore.data$;

  constructor(
    // private route: ActivatedRoute,
    private authorsStore: AuthorsStoreService,
    private postsStore: PostsStoreService
  ) {
    // this.authors = this.route.snapshot.data['authors'];
    // this.posts = this.route.snapshot.data['posts'];
  }

  ngOnInit() {}
}
