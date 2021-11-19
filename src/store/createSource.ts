import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { IWaxUserProps } from "../typings/user";

const LOCALKEY = "waxuser-storage";

interface USERSOURCE_STORE {
  user: IWaxUserProps | null;
}

const createUserSource = () => {
  const stored = localStorage.getItem(LOCALKEY);
  const [state, setState] = createStore<USERSOURCE_STORE>(
    stored ? JSON.parse(stored) : { user: null }
  );

  createEffect(() => localStorage.setItem(LOCALKEY, JSON.stringify(state)));

  return { state, setState };
};

export default createUserSource;
