import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Dropdown, message } from 'antd';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useRedux';
import { setLogout, setExpiration } from '@/store/slices/auth';
import moment from 'moment';
import CountDown from '@/components/CountDown/CountDown';

import classes from '@/pages/home/components/UserBox/index.module.scss';

interface IProps {
  collapsed: boolean;
}

const UserBox = ({ collapsed }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // const ticket = useAppSelector((state: RootState) => state.auth.ticket);
  // const isLogin = useAppSelector((state: RootState) => state.auth.isLogin);
  const account = useAppSelector((state: RootState) => state.auth.account);
  const expiration = useAppSelector((state: RootState) => state.auth.expiration);
  const permission = useAppSelector((state: RootState) => state.auth.permission);

  useEffect(() => {
    if (permission) {
      // updateCRUDPermissionHandler(permission);
      console.log(permission);
    }
  }, [permission]);

  // // 測試 Ticket 是否過期
  // useEffect(() => {
  //   if (ticket) {
  //     dispatch(
  //       fetchLoginByTicket({
  //         ticket,
  //       })
  //     )
  //       .unwrap()
  //       .then(() => {
  //         message.success(`${account} 歡迎，登入成功！`);
  //         navigate('/');
  //       })
  //       .catch((err: any) => {
  //         if (!err) return;

  //         const errorMsg = typeof err === 'string' ? err : err.error;
  //         message.error(errorMsg || '非管理員或密碼錯誤！');
  //       });
  //   }
  // }, []);

  return (
    <div className={classes['connect-box']}>
      <Dropdown
        menu={{
          items: [
            {
              key: 'logout',
              label: t('btn-common-logout'),
            },
          ],
          onClick: ({ key }) => {
            switch (key) {
              case 'logout':
                message.success(t('msg-common-logout-success'));
                dispatch(setLogout());
                break;
              default:
                break;
            }
          },
        }}
        trigger={['click']}
        className='cursor-pointer'
      >
        <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }} size='large'>
          {account}
        </Avatar>
      </Dropdown>
      {!collapsed && (
        <div>
          <span className='mt-4 block'>
            {t('lbl-common-expiration-time')}：
            <CountDown
              expirationTime={moment(expiration).utc().valueOf()}
              endTimeCallback={() => {
                message.warning(t('msg-common-expiration-time-end'));
                dispatch(setLogout());
              }}
              reloadTimeCallback={() => dispatch(setExpiration(moment().add('10', 'm').utc().toString()))}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default UserBox;
