import { useAppSelector } from '@/utils/hooks/useRedux';
import { Menu, MenuProps } from 'antd';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbilityContext } from '@/utils/casl/Can';
import { IMenu } from '@/router/menu';
import { useTranslation } from 'react-i18next';
import menuData from '@/router/menu';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[], type?: 'group', path?: string): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
    type,
    path,
  } as MenuItem;
};

const MenuComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLogin } = useAppSelector(state => state.auth);
  const ability = useContext(AbilityContext);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [current, setCurrent] = useState<string>('');

  const menus = useCallback(
    (menuInfo: IMenu[]): MenuItem[] => {
      return menuInfo
        .filter(menu => menu !== null)
        .map(menu => {
          const pathName = window.location.pathname;

          if (pathName === menu.path) {
            setCurrent(menu.key);
          }

          // 沒有子菜單不需要繼續遞迴
          if (!menu.children || menu.children.length <= 0) {
            // 濾掉沒有權限的菜單選項
            // 此處渲染規則判斷只對沒有 children 的子項目，如有需要可以往上提升，改成對於整個 menu 的權限判斷
            if (ability.can('R', menu.key)) {
              return getItem(
                <a onClick={() => navigate(menu.path)} aria-hidden='true' key={menu.key}>
                  {menu.i18nKey ? t(menu.i18nKey) : menu.label}
                </a>,
                menu.key,
                menu.icon,
                undefined,
                undefined,
                menu.path
              );
            }
          } else {
            // 判斷有子菜單的內容是否都沒有回傳(沒有回傳代表 ability.can 檢查後沒權限)，空的話就不需要渲染
            const children = menus(menu.children).filter(children => children !== null);
            if (children && children.length > 0) {
              return getItem(<span key={menu.key}>{menu.i18nKey ? t(menu.i18nKey) : menu.label}</span>, menu.key, menu.icon, children, undefined, menu.path);
            }
          }

          return null;
        });
    },
    [t, ability, navigate]
  );

  useEffect(() => {
    const initMenusHandler = () => {
      const newMenus = menuData !== null ? menus(menuData).filter(children => children !== null) : [];
      setMenuList(newMenus);
    };

    initMenusHandler();
  }, [isLogin, ability.rules, menus]);

  return <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode='inline' items={menuList} />;
};

export default MenuComponent;
