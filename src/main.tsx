import ReactDOM from 'react-dom/client';
import App from './app';
import './index.scss';
import { store } from '@/store/index';
import { Provider } from 'react-redux';
import '@/i18n/index';
import { AbilityContext } from '@/utils/casl/Can';
import ability from '@/utils/casl/config/ability';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AbilityContext.Provider value={ability}>
      <App />
    </AbilityContext.Provider>
  </Provider>
  // </React.StrictMode>
);
