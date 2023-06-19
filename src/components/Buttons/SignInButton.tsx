import { useSession, signIn, signOut } from "next-auth/react";
import { ButtonPrimaryS } from "./MainButtons";

export function SignInButton() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getAuthInfo = () => {
    if (session) {
      return (
        <>
          <p>Signed in as {session.user.name}</p>
          <ButtonPrimaryS
            onClick={() => {
              void handleSignOut();
            }}
          >
            Sign out
          </ButtonPrimaryS>
        </>
      );
    }

    return (
      <>
        <p className="w-64">Not signed in</p>
        <ButtonPrimaryS
          className=""
          onClick={() => {
            void handleSignIn();
          }}
        >
          Sign in
        </ButtonPrimaryS>
      </>
    );
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {getAuthInfo()}
    </div>
  );
}
