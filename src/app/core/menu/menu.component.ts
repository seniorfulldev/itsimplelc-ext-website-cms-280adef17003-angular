import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SectionItem, Section } from 'src/app/interfaces/section.interface';
import { DepartmentsStoreService } from 'src/app/services/departments-store.service';
import { MenusStoreService } from 'src/app/services/menus-store.service';
import { TenantStoreService } from 'src/app/services/tenant-store.service';
import { getMenuData, MenuData } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  // menu = menuData;
  menu$: Observable<MenuData> = this.tenant.data$.pipe(
    map(tenant => {
      return getMenuData(tenant.name);
    })
  );

  currentActiveSubMenu = null;
  departmentsMenu$ = zip(this.departmentsStore.sortedData$, this.menusStore.data$).pipe(
    map(([departments, menus])=> {
      const kvArray = menus.map((m => {
       return [m.departmentId, this.menuDepartmentsToSubItems(m.sections, m.departmentId)]
      }));
      // @ts-ignore
      const departmentMenus = new Map(kvArray);
     return departments.map((d) => {
       return {
       title: d.title,
       link: `departments/${d.id}`,
       subItems: departmentMenus.has(d.id) ? departmentMenus.get(d.id) : null
     }})
    })
  )
  constructor(
    private menusStore: MenusStoreService,
    private departmentsStore: DepartmentsStoreService,
    private tenant: TenantStoreService,
  ) {}
  activeSubMenu(subMenu) {
    this.currentActiveSubMenu = this.currentActiveSubMenu === subMenu ? null : subMenu;
  }

  isActiveSubMenu(subMenu){
    return this.currentActiveSubMenu && this.currentActiveSubMenu === subMenu;
  }

  menuDepartmentsToSubItems(sections: Section[], departmentId: string){
    return sections.map(sec => ({
      title: sec.header,
      subMenu: sec.items.map(i => this.createItemLink(i, `departments/${departmentId}`))
    }));
  }

  createItemLink(item: SectionItem, linkPath: string){
    let link = item.value;
    if (item.type === 'pageId'){
      link = `${linkPath}/pages/${item.value}`
    }
    return {
      title: item.title,
      link,
      type: item.type,
    }
  }
  ngOnInit() {}
}
