import { LinkSession } from "anchor-link";
import { Api, JsonRpc } from "eosjs";
import { Accessor } from "solid-js";
import { WAXNET_PROPS } from "../lib/chain";

interface IWaxCloudWalletUser {
  type: "wax-cloud-wallet";
  wallet: string;
  pubKeys: string[];
}

interface IAnchorUser {
  type: "anchor";
  wallet: string;
  permission: string;
}

interface IWAXWALLETPROPS {
  user: IWaxUserProps | null;
}

interface IWAXFUNCTIONPROPS {
  loginWithCloudWalet: () => void;
  loginWithAnchor: () => void;
  logout: () => void;
}

interface WAXCONTEXTPROPS {
  state: IWAXWALLETPROPS;
  isLoggedIn: Accessor<boolean>;
  functions: IWAXFUNCTIONPROPS;
  wax: {
    net: WAXNET_PROPS;
  };
  getSession: (user: IWaxUserProps | null) => Promise<Api | LinkSession | null | undefined>;
  rpc?: JsonRpc;
}

type IWaxUserProps = IWaxCloudWalletUser | IAnchorUser;

export type {
  WAXCONTEXTPROPS,
  IWaxUserProps,
  IWaxCloudWalletUser,
  IAnchorUser,
  IWAXWALLETPROPS,
  IWAXFUNCTIONPROPS
};
