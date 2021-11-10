import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/interfaces/author.interface';
import { Post } from 'src/app/interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PostsStoreService } from 'src/app/services/posts-store.service';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post: Post;
  author: Author;
  startDate: string;

  sub = this.postsStore
    .getItemById(this.route.snapshot.paramMap.get('id'))
    .pipe(
      switchMap((post) => {
        this.post = post;
        let date = new Date(post?.createdDate);
        this.startDate = this.datePipe.transform(date, 'mediumDate');
        return this.authorsStore.getItemById(post.authorId);
      }),
      tap((author) => {
        this.author = author;
      })
    );

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private postsStore: PostsStoreService,
    private authorsStore: AuthorsStoreService
  ) {}
  ngOnInit() {}
}
