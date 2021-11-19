import { WaxAuthProvider } from "@cryptopuppie/solid-waxauth";
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

const endpoint = "https://waxtestnet.greymass.com";
const chainId = "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12";
const net = { endpoint, chainId, dApp: "simpleapp" };

render(
  () => (
    <WaxAuthProvider net={net}>
      <App />
    </WaxAuthProvider>
  ),
  document.getElementById("root")
);
