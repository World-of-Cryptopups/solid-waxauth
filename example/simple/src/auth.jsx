import { useWaxAuth } from "solid-waxauth";

const AuthContainer = () => {
  const {
    state,
    isLoggedIn,
    functions: { loginWithAnchor, logout }
  } = useWaxAuth();

  return (
    <div>
      <p>user: {isLoggedIn() ? state.user.wallet : "none"}</p>

      {isLoggedIn() ? (
        <button onClick={() => logout()}>logout</button>
      ) : (
        <button onClick={() => loginWithAnchor()}>Login with Anchor</button>
      )}
    </div>
  );
};

export default AuthContainer;
