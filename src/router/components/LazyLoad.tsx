import { Suspense } from 'react';
import Permission from '@/router/components/Permission';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * @param Component 懒加载的组件
 * @param code 用于判断权限的字段(你可以自己定)
 * @returns
 */
const LazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>, code?: string) => {
  return (
    <Permission code={code}>
      <Suspense
        fallback={
          <div className='w-full h-full flex items-center justify-center'>
            <LoadingOutlined style={{ fontSize: 50 }} />
          </div>
        }
      >
        <Component />
      </Suspense>
    </Permission>
  );
};

export default LazyLoad;
