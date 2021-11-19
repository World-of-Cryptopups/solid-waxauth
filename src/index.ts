import WaxAuthProvider from "./components/provider";
import useWaxAuth from "./hooks/useWaxAuth";
import useWaxUser from "./hooks/useWaxUser";
import createUserSource from "./store/createSource";
import {
  IAnchorUser,
  IWaxCloudWalletUser,
  IWAXFUNCTIONPROPS,
  IWaxUserProps,
  IWAXWALLETPROPS,
  WAXCONTEXTPROPS
} from "./typings/user";

// export main functions or stuffs
export { WaxAuthProvider, createUserSource, useWaxAuth, useWaxUser };
// export types
export type {
  WAXCONTEXTPROPS,
  IWaxUserProps,
  IWaxCloudWalletUser,
  IAnchorUser,
  IWAXWALLETPROPS,
  IWAXFUNCTIONPROPS
};
