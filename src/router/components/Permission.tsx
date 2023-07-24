import { useContext } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { UserInfo } from '@/router/index';
import { AbilityContext } from '@/utils/casl/Can';
import Error403 from '@/pages/errors/403';

interface IProps {
  code?: string;
  children: React.ReactNode;
}

const Permission = ({ code, children }: IProps) => {
  const ability = useContext(AbilityContext);
  const loaderData = useRouteLoaderData('root') as UserInfo;

  if (!code) {
    return <>{children}</>;
  }

  if (loaderData?.permissionRoutes?.includes(code) && ability.can('R', code)) {
    return <>{children}</>;
  }
  return <Error403 />;
};

export default Permission;
