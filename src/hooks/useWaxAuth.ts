import { useContext } from "solid-js";
import { WaxContext } from "../components/provider";

const useWaxAuth = () => {
  const context = useContext(WaxContext);

  return context;
};

export default useWaxAuth;
