import {
  createStore,
  createTypedHooks,
  Action,
  action,
  persist,
} from "easy-peasy";

export interface User {
  isLoggedIn: boolean;
  authToken: string | null;
  email: null | string;
}

interface Model {
  user: User;
  login: Action<Model, User>;
  logout: Action<Model>;
}

const appState: Model = {
  user: {
    isLoggedIn: false,
    email: null,
    authToken: null,
  },
  login: action((state, data: User) => {
    state.user = data;
  }),
  logout: action((state) => {
    state.user.isLoggedIn = false;
    state.user.authToken = null;
    state.user.email = null;
  }),
};

interface StoreModel {
  ecommerceState: Model;
}

const model: StoreModel = {
  ecommerceState: appState,
};

const store = createStore(
  persist(model, {
    storage: "localStorage",
  })
);

const { useStoreActions, useStoreDispatch, useStoreState, useStore } =
  createTypedHooks<StoreModel>();

export { store, useStoreActions, useStoreDispatch, useStoreState, useStore };
