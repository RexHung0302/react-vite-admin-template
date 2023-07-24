export interface IMenu {
  key: string;
  label: string;
  i18nKey?: string;
  path: string;
  icon: JSX.Element;
  children?: IMenu[];
}

const menuList: IMenu[] = [
  {
    key: 'dashboard',
    label: 'dashboard',
    i18nKey: 'lbl-menu-dashboard',
    path: '/dashboard',
    icon: <i className='fa-solid fa-gauge'></i>,
  },
  {
    key: 'player',
    label: 'player',
    i18nKey: 'lbl-menu-player',
    path: '/player',
    icon: <i className='fa-solid fa-user-group'></i>,
    children: [
      {
        key: 'player-basic-info',
        label: 'player basic info',
        i18nKey: 'lbl-menu-player-basic-info',
        path: '/player/player-basic-info',
        icon: <i className='fa-solid fa-user'></i>,
      },
      {
        key: 'player-list-info',
        label: 'player list info',
        i18nKey: 'lbl-menu-player-list-info',
        path: '/player/player-list-info',
        icon: <i className='fa-solid fa-users'></i>,
      },
    ],
  },
  {
    key: 'reports',
    label: 'reports',
    i18nKey: 'lbl-menu-report',
    path: '/reports',
    icon: <i className='fa-solid fa-chart-line'></i>,
    children: [
      {
        key: 'report-win-lose',
        label: 'report win lose',
        i18nKey: 'lbl-menu-report-win-lose',
        path: '/reports/report-win-lose',
        icon: <i className='fa-solid fa-chart-column'></i>,
      },
    ],
  },
];

export default menuList;
