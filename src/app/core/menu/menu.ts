import { environment } from 'src/environments/environment';

const TENANT = 'demotown-ga';
const PATH = environment?.initTenant ? '' : `/${TENANT}`;

export const getMenuData = (tenant: string): MenuData => {
  if (environment?.initTenant === 'baldwin-ga' || tenant === 'baldwin-ga') {
    return BaldwinMenu;
  }
  const path = environment?.initTenant ? '' : `/${tenant}`;
  return {
    items: [
      {
        title: 'Community',
        subItems: [
          {
            title: 'About',
            link: `${path}/about`,
          },
          {
            title: 'Community Events',
            link: `${path}/events`,
          },
          {
            title: 'News',
            link: `${path}/news`,
          },
          {
            title: 'Parks & Places',
            link: `${path}/places`,
          },
          {
            title: 'Report an issue',
            link: `${path}/reports`,
          },
          {
            title: 'Services',
            link: `${path}/services`,
          },
        ],
      },
      {
        title: 'Government',
        subItems: [
          {
            title: 'Agendas & Meetings',
            link: `${path}/councilmeetings`,
          },
          {
            title: 'Boards & Commissions',
            link: `${path}/boards-commissions`,
          },
          {
            title: 'Career/Volunteer',
            link: `${PATH}/career`,
          },
          {
            title: 'Departments',
            link: `${path}/departments`,
            subMenu: [],
          },
          {
            title: 'Directory',
            link: `${path}/directory`,
          },
          {
            title: 'Mayor & Council',
            link: `${path}/council`,
          },
        ],
      },
      {
        title: 'Visitors',
        subItems: [
          {
            title: 'About',
            link: `${path}/about`,
          },
        ],
      },
      {
        title: 'Businesses',
        subItems: [
          {
            title: 'Doing Business Locally',
            link:
              'https://storage.googleapis.com/t-baldwin-ga/Baldwin%20Business%20Page%20(1).pdf',
            type: 'linkUrl',
          },
        ],
      },
    ],
  };
};

export interface MenuData {
  items: Item[];
}

export interface Item {
  title: string;
  subItems?: SubItem[];
}

export interface SubItem {
  title: string;
  link?: string;
  subMenu?: SubMenu[];
  type?: 'pageId' | 'linkUrl';
}

export interface SubMenu {
  title: string;
  items?: SubItem[];
}

const BaldwinMenu: MenuData = {
  items: [
    {
      title: 'Community',
      subItems: [
        {
          title: 'About',
          link: `/about`,
        },
        {
          title: 'Community Events',
          link: `/events`,
        },
        {
          title: 'News',
          link: `/news`,
        },
        {
          title: 'Parks & Places',
          link: `/places`,
        },
        {
          title: 'Report an issue',
          link: `/reports`,
        },
        {
          title: 'Services',
          link: `/services`,
        },
        {
          title: 'Living In Baldwin',
          link: '/pages/5415726387036160',
        },
        {
          title: `Moving to Baldwin?`,
          link: '/pages/5719656157413376',
        },
      ],
    },
    {
      title: 'Government',
      subItems: [
        {
          title: 'Agendas & Meetings',
          link: `/councilmeetings`,
        },
        // {
        //   title: 'Boards & Commissions',
        //   link: `/boards-commissions`,
        // },
        {
          title: 'City Charter and Ordinances',
          link: 'pages/6026702945779712'
        },
        {
          title: 'Career/Volunteer',
          link: `/career`,
        },
        {
          title: 'Departments',
          link: `/departments`,
          subMenu: [],
        },
        {
          title: 'Directory',
          link: `/directory`,
        },
        {
          title: 'Mayor & Council',
          link: `/council`,
        },
      ],
    },
    {
      title: 'Visitors',
      subItems: [
        {
          title: 'About',
          link: `/about`,
        },
      ],
    },
    {
      title: 'Businesses',
      subItems: [
        {
          title: 'Doing Business Locally',
          link: 'pages/4831141810929664',
        },
      ],
    },
  ],
};
