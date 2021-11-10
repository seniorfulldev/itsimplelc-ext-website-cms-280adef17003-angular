import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Post } from '../interfaces/post.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class AuthorPostsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
    return this.apiService.getPostsByAuthor(route.paramMap.get('city'), route.paramMap.get('id'));
  }
}