import { WaxJS } from "@waxio/waxjs/dist";
import { LinkSession } from "anchor-link";
import { Component, createContext, createEffect, createSignal, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { WAXNET_PROPS } from "../lib/chain";
import { anchorLink, wax } from "../lib/walletproviders";
import { IWaxUserProps, WAXCONTEXTPROPS } from "../typings/user";

const LOCALKEY = "waxuser-storage";

const WaxContext = createContext<WAXCONTEXTPROPS>({
  state: { user: null },
  isLoggedIn: (): boolean => false,
  functions: { loginWithAnchor: () => {}, loginWithCloudWalet: () => {}, logout: () => {} },
  wax: {
    net: {
      endpoint: "",
      chainId: "",
      dApp: ""
    }
  },
  getSession: async () => null
});

interface WaxAuthProviderProps {
  children: JSX.Element;
  net: WAXNET_PROPS;
}
interface USERSOURCE_STORE {
  user: IWaxUserProps | null;
}

const WaxAuthProvider: Component<WaxAuthProviderProps> = (props: WaxAuthProviderProps) => {
  const stored = localStorage.getItem(LOCALKEY);
  const [state, setState] = createStore<USERSOURCE_STORE>(
    stored ? JSON.parse(stored) : { user: null }
  );
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  // anchor login
  const loginWithAnchor = async () => {
    let session: LinkSession | null;

    const anchor = anchorLink(props.net.endpoint, props.net.chainId);

    const sessionList = await anchor.listSessions(props.net.dApp);
    if (sessionList && sessionList.length > 0) {
      session = await anchor.restoreSession(props.net.dApp);
    } else {
      try {
        const sess = await anchor.login(props.net.dApp);
        session = sess.session;
      } catch (e) {
        throw new Error(e as any);
      }
    }

    if (!session) return;

    login({
      type: "anchor",
      wallet: String(session.auth.actor),
      permission: String(session.auth.permission)
    });
  };

  // wax cloud wallet login
  const loginWithCloudWalet = async () => {
    const waxwallet = wax(props.net.endpoint);

    const userAccount = await waxwallet.login();
    const pubKeys = waxwallet.pubKeys;

    login({ type: "wax-cloud-wallet", wallet: userAccount, pubKeys });
  };

  const login = (user: IWaxUserProps) => {
    setState({ user });
  };

  // logout
  const logout = () => {
    if (!state.user) return;

    // if current logged in is anchor
    if (state.user.type === "anchor") {
      const anchor = anchorLink(props.net.endpoint, props.net.chainId);

      anchor.clearSessions(props.net.dApp);
    }

    setState({ user: null });
  };

  // session transact handler
  const getSession = async (user: IWaxUserProps | null) => {
    if (user == null) return;

    if (user.type === "wax-cloud-wallet") {
      return new WaxJS({
        rpcEndpoint: props.net.endpoint,
        userAccount: user.wallet,
        pubKeys: user.pubKeys
      }).api;
    }

    if (user.type === "anchor") {
      const sess = await anchorLink(props.net.endpoint, props.net.chainId).restoreSession(
        props.net.dApp
      );

      return sess;
    }

    throw new Error("Unsupported wallet type!");
  };

  const rpc = wax(props.net.endpoint).rpc;

  createEffect(() => {
    localStorage.setItem(LOCALKEY, JSON.stringify(state));

    if (state.user == null) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
  });

  return (
    <WaxContext.Provider
      value={{
        state,
        isLoggedIn,
        functions: {
          loginWithAnchor,
          loginWithCloudWalet,
          logout
        },
        wax: {
          net: props.net
        },
        getSession,
        rpc
      }}
    >
      {props.children}
    </WaxContext.Provider>
  );
};

export default WaxAuthProvider;
export { WaxContext };
