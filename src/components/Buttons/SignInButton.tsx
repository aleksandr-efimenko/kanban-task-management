import { useSession, signIn, signOut } from "next-auth/react";
import { ButtonPrimaryS, ButtonSecondary } from "./MainButtons";
import { type Session } from "next-auth";

export function SignInButton() {
  const { data: session, status } = useSession();

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
    if (status === "loading") return authInfoSkeleton;
    if (session) {
      return (
        <>
          <div className="flex flex-col">
            <p className="min-w-64">Signed in as</p>
            <p className="min-w-64">{getUserInfo(session)}</p>
          </div>
          <div>
            <ButtonPrimaryS
              onClick={() => {
                void handleSignOut();
              }}
            >
              Sign out
            </ButtonPrimaryS>
          </div>
        </>
      );
    }

    return (
      <div>
        <ButtonSecondary
          className=""
          onClick={() => {
            void handleSignIn();
          }}
        >
          Sign in
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <div className="flex w-full items-center justify-center gap-3">
      {getAuthInfo()}
    </div>
  );
}

const authInfoSkeleton = (
  <div className="flex w-full items-center justify-center gap-3">
    <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200"></div>
  </div>
);
