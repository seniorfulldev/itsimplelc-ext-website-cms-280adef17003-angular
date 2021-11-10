import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Section } from 'src/app/interfaces/section.interface';
import { MenusStoreService } from 'src/app/services/menus-store.service';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent implements OnInit {
  @Input()
  departmentId: string;
  menu: Menu;
  sections: Section[] = [];
  isExpand: any = [];
  isNavExpand: Boolean = false;

  sub = this.menusStore.data$.pipe(
    tap((menus) => {
      const menu = menus.find((m) => m.departmentId === this.departmentId);
      if (menu) {
        this.menu = menu;
        this.sections = menu.sections;
        this.sections.forEach((section, i) => {
          this.isExpand.push(true);
        });
      }
    })
  );

  constructor(
    private route: ActivatedRoute,
    private menusStore: MenusStoreService
  ) {
    if (window.innerWidth > 800) {
      this.isNavExpand = false;
    } else {
      this.isNavExpand = true;
    }
  }

  ngOnInit() {
    // let menus = this.route.snapshot.data.menu;
    // menus.forEach((menu) => {
    //   if (menu.departmentId == this.departmentId) {
    //     this.menu = menu;
    //     this.sections = menu.sections;
    //   }
    // });
    // this.sections.forEach((section, i) => {
    //   this.isExpand.push(true);
    // });
  }

  istoggle(i) {
    if (this.isExpand[i]) {
      let menuItem = Array.from(document.getElementsByClassName('menu-' + i));
      menuItem.forEach((mitem) => {
        mitem.className = mitem.className + ' hide';
      });
    } else {
      let menuItem = Array.from(document.getElementsByClassName('menu-' + i));
      menuItem.forEach((mitem) => {
        mitem.className = mitem.className.replace(' hide', '');
      });
    }
    this.isExpand[i] = !this.isExpand[i];
  }

  isExpanded(i) {
    return this.isExpand[i];
  }

  isNavExpanded() {
    this.isNavExpand = !this.isNavExpand;
  }

  isLink(value) {
    if (value.toLowerCase().indexOf('http') >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
