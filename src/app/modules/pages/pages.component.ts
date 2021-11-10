import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/interfaces/page.interface';
import { PagesStoreService } from 'src/app/services/pages-store.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  pages: Page[];
  page: Page;
  iframe_html: any;

  page$ = this.route.params.pipe(
    switchMap(params => this.pagesStore.getItemById(params['pageid'])
    ),
    tap(page => {
      if (page?.videoUrl) {
        this.iframe_html = this.embedService.embed(page.videoUrl, {
          query: { autoplay: 1, portrait: 0, color: '333' },
          attr: { width: 800, height: 270 },
        });
      }
    })
  );

  constructor(
    private embedService: EmbedVideoService,
    private route: ActivatedRoute,
    private pagesStore: PagesStoreService,
  ) {
   // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    // let pages = this.route.snapshot.data.pages;
    // let pageId = this.route.snapshot.paramMap.get('pageid');
    // console.log(pages + '|||' + pageId);
    // pages.forEach((p) => {
    //   if (
    //     p.id.toLowerCase().indexOf(pageId) >= 0 ||
    //     p.title.toLowerCase().indexOf(pageId) >= 0
    //   ) {
    //     this.page = p;
    //   }
    // });
    // if (this.page.videoUrl != null && this.page.videoUrl != '') {
    //   console.log(this.page.videoUrl);
    //   this.iframe_html = this.embedService.embed(this.page.videoUrl, {
    //     query: { autoplay: 1, portrait: 0, color: '333' },
    //     attr: { width: 800, height: 270 },
    //   });
    // }
  }
}
