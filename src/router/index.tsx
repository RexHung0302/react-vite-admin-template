import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import menuPermissions from '@/utils/configs/menuPermissions';
import { MongoAbility, AbilityTuple, MongoQuery } from '@casl/ability';
import { IPermission } from '@/constants/permission';

// Mock
import mockPermissionJson from '@/utils/mocks/permission.json';

// Components
import LazyLoad from '@/router/components/LazyLoad';
import Home from '@/pages/home';

export interface UserInfo {
  name: string;
  permissionRoutes: string[];
}

// 權限之後可從後端拿，key 需要對應到 menu.tsx 的 key 才會顯示在菜單上，另外 router() 內也必須要有，才會有畫面渲染
// 另外 `/src/utils/configs/menuPermissions.ts` 也必須要放入 Key，之後在權限管理頁面才可以拿來顯示用
export const mockPermission: IPermission = JSON.parse(JSON.stringify(mockPermissionJson));

const getUserInfo = (ability: MongoAbility<AbilityTuple, MongoQuery>): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    const ticket = localStorage.getItem('ticket');
    const account = localStorage.getItem('account') || 'unknown';
    setTimeout(() => {
      if (!ticket) reject();

      ability.update(
        Object.keys(mockPermission as IPermission).map(key => {
          const CRUDArr = mockPermission[key];
          return {
            action: CRUDArr,
            subject: key,
          };
        })
      );

      resolve({
        name: account,
        permissionRoutes: Object.keys(menuPermissions),
      });
    }, 2000);
  });
};

const router = (caslContextValue: MongoAbility<AbilityTuple, MongoQuery>) =>
  createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/dashboard' />,
    },
    {
      path: '/',
      id: 'root',
      element: <Home />,
      loader: async () => {
        try {
          // 刷新直接進後台，需重新拿一次 token
          const { name, permissionRoutes } = await getUserInfo(caslContextValue);
          return {
            name,
            permissionRoutes,
          };
        } catch {
          // 拋出錯誤
          throw new Error('token is invalid');
        }
      },
      errorElement: LazyLoad(lazy(() => import('@/pages/login'))),
      children: [
        {
          path: '/dashboard',
          element: LazyLoad(
            lazy(() => import('@/pages/dashboard')),
            'dashboard'
          ),
        },
        {
          path: '/player',
          children: [
            {
              path: '/player/player-basic-info',
              element: LazyLoad(
                lazy(() => import('@/pages/player/player-basic-info')),
                'player-basic-info'
              ),
            },
            {
              path: '/player/player-list-info',
              element: LazyLoad(
                lazy(() => import('@/pages/player/player-list-info')),
                'player-list-info'
              ),
            },
          ],
        },
        {
          path: '/reports',
          // 中間可以在卡一層，但必須要有權限才會渲染，如果沒有權限將會導致底下的子項目無法渲染
          // element: LazyLoad(
          //   lazy(() => import('@/pages/reports')),
          //   'reports'
          // ),
          children: [
            {
              path: '/reports/report-win-lose',
              element: LazyLoad(
                lazy(() => import('@/pages/reports/report-win-lose')),
                'report-win-lose'
              ),
            },
            {
              path: '/reports/reports-test',
              element: LazyLoad(
                lazy(() => import('@/pages/reports/report-test')),
                'report-test'
              ),
            },
          ],
        },
        {
          path: '*',
          element: LazyLoad(lazy(() => import('@/pages/errors/404'))),
        },
      ],
    },
    {
      path: '/login',
      element: LazyLoad(lazy(() => import('@/pages/login'))),
    },
  ]);

export default router;
