import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPermission } from '@/constants/permission';

export interface AuthState {
  ticket: string | null;
  account: string | null;
  expiration: string | null;
  isLogin: boolean;
  rememberMe: boolean;
  isAuthLoading: boolean;
  permission: IPermission;
}

const initialState: AuthState = {
  ticket: window.localStorage.getItem('ticket') || null,
  account: window.localStorage.getItem('account') || null,
  expiration: window.localStorage.getItem('expiration') || null,
  isLogin: !!window.localStorage.getItem('ticket'),
  rememberMe: !!window.localStorage.getItem('rememberMe'),
  isAuthLoading: false,
  permission: {},
};

interface ILoginPayload {
  ticket: string;
  account: string;
  expiration: string;
  rememberMe?: boolean;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTicket: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        ticket: action.payload,
      };
    },
    setAccount: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        account: action.payload,
      };
    },
    setExpiration: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        expiration: action.payload,
      };
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLogin: action.payload,
      };
    },
    setLogin: (state, action: PayloadAction<ILoginPayload>) => {
      window.localStorage.setItem('ticket', action.payload.ticket);
      window.localStorage.setItem('account', action.payload.account);
      window.localStorage.setItem('expiration', action.payload.expiration);

      if (action.payload.rememberMe !== undefined && action.payload.rememberMe) {
        window.localStorage.setItem('rememberMe', 'true');
      }

      return {
        ...state,
        isLogin: true,
        account: action.payload.account,
        ticket: action.payload.ticket,
        expiration: action.payload.expiration,
        rememberMe: action.payload.rememberMe || false,
      };
    },
    setLogout: state => {
      window.localStorage.removeItem('ticket');
      window.localStorage.removeItem('account');
      window.localStorage.removeItem('expiration');

      return {
        ...state,
        isLogin: false,
        ticket: null,
        expiration: null,
      };
    },
  },
});

export const { setTicket, setAccount, setExpiration, setIsLogin, setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
