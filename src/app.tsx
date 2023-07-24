import { RouterProvider } from 'react-router-dom';
import { AbilityContext } from './utils/casl/Can';
import router from '@/router';

const app = () => {
  return <AbilityContext.Consumer>{value => <RouterProvider router={router(value)} />}</AbilityContext.Consumer>;
};

export default app;
