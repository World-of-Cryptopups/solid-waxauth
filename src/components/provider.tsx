import { LinkSession } from "anchor-link";
import { JSX } from "solid-js";
import { WAXNET_PROPS } from "../lib/chain";
import WAXUSER from "../lib/user";
import { anchorLink, wax } from "../lib/walletproviders";
import createUserSource from "../store/createSource";
import { IWaxUserProps, WAXCONTEXTPROPS } from "../typings/user";
import { WaxContext } from "./context";

interface WaxAuthProviderProps {
  children: JSX.Element;
  net: WAXNET_PROPS;
}

const WaxAuthProvider = (props: WaxAuthProviderProps) => {
  const { net, children } = props;

  const { state, setState } = createUserSource();

  const login = (user: IWaxUserProps) => {
    setState("user", () => user);
  };

  const _props: WAXCONTEXTPROPS = {
    auth: {
      user: state.user ? new WAXUSER(state.user, props.net) : undefined,
      isLoggedIn: state.user ? true : false
    },
    functions: {
      // anchor login
      loginWithAnchor: async () => {
        let session: LinkSession | null;

        const anchor = anchorLink(net.endpoint, net.chainId);

        const sessionList = await anchor.listSessions(net.dApp);
        if (sessionList && sessionList.length > 0) {
          session = await anchor.restoreSession(net.dApp);
        } else {
          try {
            const sess = await anchor.login(net.dApp);
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
      },
      // cloud wallet login
      loginWithCloudWalet: async () => {
        const waxwallet = wax(net.endpoint);

        const userAccount = await waxwallet.login();
        const pubKeys = waxwallet.pubKeys;

        login({ type: "wax-cloud-wallet", wallet: userAccount, pubKeys });
      },

      // logout
      logout: async () => {
        setState({ user: null });
      }
    }
  };

  return <WaxContext.Provider value={_props}>{children}</WaxContext.Provider>;
};

export default WaxAuthProvider;
