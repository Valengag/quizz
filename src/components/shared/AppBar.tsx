type Props = {
  title: string;
};

export const AppBar = ({ title }: Props) => {


  return (
    <div className="navbar border-black border-2 bg-primary">
      <div className="flex-none dropdown">
        <button className="btn btn-square btn-ghost" >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/Accueil">Accueil</a></li>
          <li><a href="/Profile">Profil</a></li>
          <li><a href="/Quizz">Test etat</a> </li>
          <li><a href="/Quizz">Niveau 3</a> </li>
        </ul>
      </div>
      <div className="flex-1 place-content-center ">
        <a className="btn btn-ghost text-white normal-case text-4xl">{title}</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

