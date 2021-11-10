import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'lodash-es';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { PostsStoreService } from 'src/app/services/posts-store.service';

import { Author } from '../../../../interfaces/author.interface';
import { Post } from '../../../../interfaces/post.interface';

@Component({
  selector: 'author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  authors: Author[];
  posts: Post[];
  author: Author;
  authors$ = this.authorsStore.data$;
  author$ = this.authorsStore.getItemById(this.route.snapshot.paramMap.get('id'));
  posts$ = this.postsStore.data$;


  constructor(private route: ActivatedRoute, private router: Router, private postsStore: PostsStoreService, private authorsStore: AuthorsStoreService) {
    let authorId = this.route.snapshot.paramMap.get('id');
    this.authors = this.route.snapshot.data['authors'];
    this.posts = this.route.snapshot.data['posts'];

    this.author = find(this.authors, ['id', authorId]);
    // console.log(this.posts);
    // console.log(this.author);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
  }
}
