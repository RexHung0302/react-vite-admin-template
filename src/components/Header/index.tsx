import { Button, Dropdown, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import logoM from '@/components/Header/images/logo-min.png';
import { useTranslation } from 'react-i18next';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import classes from '@/components/Header/index.module.scss';

const { Header } = Layout;

type IProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderLayout = ({ collapsed, setCollapsed }: IProps) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <Header className={classes.header}>
      <div className={clsx(classes['header-logo'], 'cursor-pointer')} onClick={() => navigate('/dashboard')} onKeyUp={() => navigate('/dashboard')} role='button' tabIndex={0}>
        <img src={logoM} alt='Logo-mini' className='img-fluid' />
        <div className='ml-4'>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined style={{ color: '#fff' }} /> : <MenuFoldOutlined style={{ color: '#fff' }} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '20px',
            }}
          />
        </div>
      </div>
      <div className={clsx(classes.icon, 'ml-auto')}>
        <Dropdown
          menu={{
            items: [
              {
                key: 'zh-TW',
                label: '繁體中文',
              },
              {
                key: 'zh-CN',
                label: '简体中文',
              },
              {
                key: 'en',
                label: 'English',
              },
            ],
            onClick: e => i18n.changeLanguage(e.key),
          }}
          className='mt-4'
        >
          <i className='fa-solid fa-earth-americas'></i>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderLayout;
