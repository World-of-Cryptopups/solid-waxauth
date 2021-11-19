import { useContext } from "solid-js";
import { WaxContext } from "../components/context";

const useWaxUser = () => {
  const context = useContext(WaxContext);

  return context?.auth;
};

export default useWaxUser;
