import { IWaxUserProps } from "../typings/user";
import { WAXNET_PROPS } from "./chain";

class WAXUSER {
  readonly wallet: string;
  readonly type: string;
  readonly permission: string;
  readonly pubKeys?: string[];

  net: WAXNET_PROPS;

  constructor(user: IWaxUserProps, net: WAXNET_PROPS) {
    this.wallet = user.wallet;
    this.type = user.type;

    if (user.type === "wax-cloud-wallet") {
      this.pubKeys = user.pubKeys;
    }

    if (user.type === "anchor") {
      this.permission = user.permission;
    } else {
      this.permission = "active";
    }

    this.net = net;
  }
}

export default WAXUSER;
