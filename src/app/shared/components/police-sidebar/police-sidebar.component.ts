import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface PoliceNode {
  name: string;
  children?: PoliceNode[];
  link: string;
}

const TREE_DATA: PoliceNode[] = [
  {
    name: 'Navigate to',
    link: '',
    children: [
      {
        name: 'About',
        link: '/departments/police',
        children: [
          { name: 'About SFPD', link: '/departments/police' },
          { name: 'Police Employment', link: '/departments/police' },
          { name: 'Precincts', link: '/departments/police' },
          { name: 'Public Information Officer', link: '/departments/police' },
          { name: 'Annual Reports', link: '/departments/police' },
        ]
      },
      {
        name: 'Divisions',
        link: '/departments/police',
        children: [
          { name: 'Chief of Police', link: '/departments/police/chiefofpolice' },
          { name: 'Deputy Chief', link: '/departments/police' },
          {
            name: 'Command Staff',
            link: '/departments/police',
            children: [
              { name: 'Staff 1', link: '/departments/police' },
              { name: 'Staff 2', link: '/departments/police' },
            ]
          },
        ]
      },
      {
        name: 'Police Services',
        link: '/departments/police',
        children: [
          {
            name: 'Community Services',
            link: '/departments/police',
            children: [
              { name: 'Service 1', link: '/departments/police' },
              { name: 'Service 2', link: '/departments/police' },
            ]
          },
          { name: 'Fingerprinting Services', link: '/departments/police' },
          { name: 'Important Forms', link: '/departments/police' },
        ]
      },
      {
        name: 'How Do I',
        link: '/departments/police',
        children: [
          { name: 'Apply for Employment', link: '/departments/police' },
          { name: 'File a Criminal Warrent', link: '/departments/police' },
          { name: 'File for an Eviction', link: '/departments/police' },
          {
            name: 'Obtain Crime Information and States',
            link: '/departments/police',
            children: [
              { name: 'State 1', link: '/departments/police' },
              { name: 'State 2', link: '/departments/police' },
            ]
          },
        ]
      },
    ]
  }

];

/** Flat node with expandable and level information */
interface PoliceFlatNode {
  expandable: true;
  name: string;
  link: string;
  level: number;
}

@Component({
  selector: 'app-police-sidebar',
  templateUrl: './police-sidebar.component.html',
  styleUrls: ['./police-sidebar.component.scss']
})
export class PoliceSidebarComponent implements OnInit {

  city: string;
  @ViewChild('tree', { static: false }) tree;

  private _transformer = (node: PoliceNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<PoliceFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.city = this.route.snapshot.paramMap.get('city');
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, _nodeData: PoliceFlatNode) => { return _nodeData.expandable; };

  ngOnInit() {
    console.log(this.dataSource.data[0].name);
  }
  ngAfterViewInit(): void {
    if(window.innerWidth > 800) {
      this.tree.treeControl.expandAll();
    }else {
      this.tree.treeControl.collapseAll()
    }
    // console.log(this.filterNodeRef.nativeElement.style);
    // this.filterNodeRef.nativeElement.setAttribute('aria-expanded', 'true');
    // console.log(this.filterNodeRef.nativeElement.ariaExpanded);
  }
}
