import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useAuth } from "~/lib/firebase";

export const SignInButton = () => {
  const handleClick = () => {
    const provider = new GoogleAuthProvider();
    const auth = useAuth();
    // @see https://firebase.google.com/docs/auth/web/google-signin
    auth.languageCode = "ja";

    signInWithRedirect(auth, provider);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline btn-primary translate-x- w-80 place-self-center"
    >
      Sign In With Google
    </button>
  );
};
