import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ReactLogo from '@/pages/login/images/react-admin-logo.png';
import { Button, Checkbox, Col, Divider, Dropdown, Form, Image, Input, Modal, Row, message } from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import useI18nKey from '@/utils/hooks/useI18nKey';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useRedux';
import { setLogin } from '@/store/slices/auth';
import moment from 'moment';

import classes from '@/pages/login/index.module.scss';

const Login = () => {
  const { t, i18n } = useTranslation();
  const i18nKey = useI18nKey({
    i18nKey: i18n.language,
  });
  const dispatch = useAppDispatch();
  const { isLogin, account, rememberMe } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLogin) {
      message.success(`${t('msg-common-welcome-back')} ${account}`);
      navigate('/');
      return;
    }

    if (account && rememberMe) {
      form.setFieldsValue({
        account,
        rememberMe: true,
      });
    }

    setRendered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: { account: string; password: string; rememberMe: boolean }) => {
    const { account, password, rememberMe } = values;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (account && password && account === 'admin' && password === '1234') {
        dispatch(
          setLogin({
            ticket: 'testTicket',
            account: account,
            expiration: moment().add('10', 'm').utc().toString(),
            rememberMe: rememberMe,
          })
        );

        navigate('/dashboard');
        message.success(t('msg-common-login-success'));
      } else {
        message.error(t('msg-common-login-fail'));
      }
    }, 4000);
  };

  return rendered ? (
    <div className={classes.login}>
      <div>
        <h1 className='text-center mb-0'>
          <Image className={clsx(classes.logo, 'mb-4')} src={ReactLogo} alt='Arena Logo' preview={false} />
        </h1>
        <div className={classes.login__box}>
          <Form form={form} layout='vertical' autoComplete='off' onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name='account' label={t('lbl-common-account')} className='mb-2' rules={[{ required: true, message: t('msg-common-account-remind') }]}>
                  <Input placeholder={t('input-common-account-placeholder')} disabled={loading} size='large' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='password' label={t('lbl-common-password')} className='mb-2' rules={[{ required: true, message: t('msg-common-password-remind') }]}>
                  <Input.Password placeholder={t('input-common-password-placeholder')} disabled={loading} size='large' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='rememberMe' className='mb-2' valuePropName='checked'>
                  <Checkbox>{t('lbl-common-remember-me')}</Checkbox>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button className='w-full' type='primary' loading={loading} htmlType='submit' size='large'>
                  {t('btn-common-login')}
                </Button>
              </Col>
            </Row>
          </Form>
          <Divider />
          <small className='mt-4 block'>
            <Trans i18nKey='msg-common-login-remind'>
              <strong className='cursor-pointer text-blue-500 hover:underline hover:underline-offset-4' onClick={() => setShowModal(!showModal)}>
                Terms of Use
              </strong>
            </Trans>
          </small>
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
            <Button className='w-full'>
              <span>{i18nKey}</span>
              <DownOutlined className='absolute right-2 top-2' />
            </Button>
          </Dropdown>
        </div>
      </div>

      <Modal
        open={showModal}
        centered
        closeIcon={false}
        footer={
          <div className='text-center'>
            <Button key='back' type='primary' onClick={() => setShowModal(!showModal)}>
              {t('btn-common-checked-and-agree')}
            </Button>
          </div>
        }
      >
        <h2 className='text-center mt-0'>{t('lbl-common-terms-and-rule')}</h2>
        <p className='font-bold text-center'>{t('lbl-common-game-rule-be-like')}</p>
        <ul className={clsx(classes.ul, 'list-decimal')}>
          <li>{t('lbl-terms-and-rule-1')}</li>
          <li>{t('lbl-terms-and-rule-1')}</li>
          <ul className={clsx(classes.ul, 'list-decimal')}>
            <li>{t('lbl-terms-and-rule-2')}</li>
            <li>{t('lbl-terms-and-rule-2')}</li>
          </ul>
          <li>{t('lbl-terms-and-rule-3')}</li>
          <li>{t('lbl-terms-and-rule-3')}</li>
          <ul className={clsx(classes.ul, 'list-decimal')}>
            <li>{t('lbl-terms-and-rule-1')}</li>
            <li>{t('lbl-terms-and-rule-1')}</li>
          </ul>
          <li>{t('lbl-terms-and-rule-1')}</li>
          <li>{t('lbl-terms-and-rule-1')}</li>
        </ul>
      </Modal>
    </div>
  ) : (
    <></>
  );
};

export default Login;
