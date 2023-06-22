import { useSession, signIn, signOut } from "next-auth/react";
import { ButtonPrimaryS, ButtonSecondary } from "./MainButtons";
import { type Session } from "next-auth";
import { api } from "@/utils/api";

export function SignInButton() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut();
  };
  const getUserInfo = (session: Session) => {
    return session.user.name ? session.user.name : session.user.email || "";
  };

  const getAuthInfo = () => {
    if (session) {
      return (
        <>
          <p className="min-w-64">Signed in as {getUserInfo(session)}</p>
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
        <ButtonSecondary
          className=""
          onClick={() => {
            void handleSignIn();
          }}
        >
          Sign in
        </ButtonSecondary>
      </>
    );
  };

  return (
    <div className="flex w-full items-center justify-center gap-3">
      {getAuthInfo()}
    </div>
  );
}
