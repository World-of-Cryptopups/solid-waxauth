import { useContext } from "solid-js";
import { WaxContext } from "../components/context";

const useWaxAuth = () => {
  const context = useContext(WaxContext);

  return context?.functions;
};

export default useWaxAuth;
