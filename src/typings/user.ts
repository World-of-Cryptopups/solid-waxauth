import { Accessor } from "solid-js";

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
