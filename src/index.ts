import WaxAuthProvider from "./components/provider";
import useWaxAuth from "./hooks/useWaxAuth";
import {
  IAnchorUser,
  IWaxCloudWalletUser,
  IWAXFUNCTIONPROPS,
  IWaxUserProps,
  IWAXWALLETPROPS,
  WAXCONTEXTPROPS
} from "./typings/user";

// export main functions or stuffs
export { WaxAuthProvider, useWaxAuth };
// export types
export type {
  WAXCONTEXTPROPS,
  IWaxUserProps,
  IWaxCloudWalletUser,
  IAnchorUser,
  IWAXWALLETPROPS,
  IWAXFUNCTIONPROPS
};
