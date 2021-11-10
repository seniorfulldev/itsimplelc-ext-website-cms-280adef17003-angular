import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Section, SectionItem } from 'src/app/interfaces/section.interface';
import { Service } from 'src/app/interfaces/service.interface';
import { DepartmentsStoreService } from 'src/app/services/departments-store.service';
import { MenusStoreService } from 'src/app/services/menus-store.service';
import { ServicesStoreService } from 'src/app/services/services-store.service';
import { TenantStoreService } from 'src/app/services/tenant-store.service';
import { getMenuData, MenuData } from '../menu/menu';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent implements OnInit {
  currentActiveSubMenu = null;
  status: boolean = true;
  menuState: boolean = false;
  city = this.route.snapshot.paramMap.get('city');
  services: Service[];
  payServices: Service[];
  askServices: Service[];
  departments$ = this.departmentsStore.data$.pipe(
    map((departments) => departments.sort((a, b) => a.title.localeCompare(b.title)))
  );
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
    }),
  )

  menu$: Observable<MenuData> = this.tenant.data$.pipe(
    map(tenant => {
      return getMenuData(tenant.name);
    })
  );
  services$ = this.servicesStore.data$.pipe(
    map((services) => {
      if (this.askServices && this.payServices && this.services?.length)
        return services;
      this.askServices = [];
      this.payServices = [];
      services.forEach((service) => {
        if (service.type === 'ask') {
          this.askServices.push(service);
        } else if (service.type === 'pay') {
          this.payServices.push(service);
        }
      });
      this.payServices?.sort((a, b) => a.title.localeCompare(b.title));
      this.askServices?.sort((a, b) => a.title.localeCompare(b.title));
      return services;
    })
  );
  constructor(
    private servicesStore: ServicesStoreService,
    private departmentsStore: DepartmentsStoreService,
    private tenant: TenantStoreService,
    private menusStore: MenusStoreService,
    private route: ActivatedRoute,

    ) { }
  clickEvent(event) {
    this.menuState = false;
    this.status = !this.status;
  }
  hidemenu() {
    this.menuState = !this.menuState;
    this.status = !this.status;
  }

  isMenu(id) {
    let f: boolean = false;
    return f;
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
  activeSubMenu(subMenu) {
    this.currentActiveSubMenu = this.currentActiveSubMenu === subMenu ? null : subMenu;
  }

  isActiveSubMenu(subMenu){
    return this.currentActiveSubMenu && this.currentActiveSubMenu === subMenu;
  }
  ngOnInit(): void {
  }

}
