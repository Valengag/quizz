import { useAuth } from "~/lib/firebase";

type Props = {};

export const SignOutButton = (props: Props) => {
  const handleClick = () => {
    const auth = useAuth();
    auth.signOut();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline btn-primary translate-x- w-80 place-self-center"
    >
      Sign Out
    </button>
  );
};
