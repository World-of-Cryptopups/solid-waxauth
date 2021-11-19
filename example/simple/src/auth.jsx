import { useWaxAuth } from "@cryptopuppie/solid-waxauth";

const AuthContainer = () => {
  const {
    state,
    isLoggedIn,
    functions: { loginWithAnchor, logout },
    getSession
  } = useWaxAuth();

  return (
    <div>
      <p>user: {isLoggedIn() ? state.user?.wallet : "none"}</p>

      {isLoggedIn() ? (
        <>
          <button onClick={() => logout()}>logout</button>

          <button
            onClick={async () => {
              const session = await getSession(state.user);
              if (!session) return;

              session.transact({
                actions: [
                  {
                    account: "eosio.token",
                    name: "transfer",
                    authorization: [
                      {
                        actor: state.user.wallet,
                        permission: "active"
                      }
                    ],
                    data: {
                      from: state.user.wallet,
                      to: "5g2vm.wam",
                      quantity: "0.00000001 WAX",
                      memo: ""
                    }
                  }
                ]
              });
            }}
          >
            call action
          </button>
        </>
      ) : (
        <button onClick={() => loginWithAnchor()}>Login with Anchor</button>
      )}
    </div>
  );
};

export default AuthContainer;
