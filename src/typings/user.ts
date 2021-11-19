import WAXUSER from "../lib/user";

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
  user?: WAXUSER;
  isLoggedIn: boolean;
}

interface IWAXFUNCTIONPROPS {
  loginWithCloudWalet: () => void;
  loginWithAnchor: () => void;
  logout: () => void;
}

interface WAXCONTEXTPROPS {
  auth: IWAXWALLETPROPS;
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
