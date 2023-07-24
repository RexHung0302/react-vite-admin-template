import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserBox from '@/pages/home/components/UserBox';
import { useAppSelector } from '@/utils/hooks/useRedux';
import Menu from '@/pages/home/components/Menu';

import classes from '@/pages/home/index.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const { isLogin } = useAppSelector(state => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  return (
    <Layout className={classes.layout}>
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Sider
          breakpoint='md'
          collapsedWidth={90}
          zeroWidthTriggerStyle={{
            position: 'relative',
            left: 10,
          }}
          onBreakpoint={broken => {
            setCollapsed(broken);
          }}
          width={250}
          theme='light'
          className={clsx('site-layout-background', classes['layout-sider'])}
          collapsed={collapsed}
        >
          <UserBox collapsed={collapsed} />
          <Menu />
        </Sider>
        {/* 主資訊 */}
        <Layout className={classes['layout-main']}>
          <Content className={classes['layout-content']}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
