
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Accueil() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/MainTitle');
  };

  return (
    <div className="flex w-full h-full items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Psychologie Cognitive</h1>
        <p className="text-gray-600 text-lg mb-6">
          La psychologie cognitive est l'étude scientifique des processus mentaux tels que l'attention, l'utilisation du langage, la mémoire, la perception, la résolution de problèmes, la créativité et la pensée.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          Cette branche de la psychologie se concentre sur la manière dont nous traitons, stockons et récupérons l'information et comment ces processus influencent nos comportements.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          L'étude de la psychologie cognitive est essentielle pour comprendre comment les gens apprennent, prennent des décisions et interagissent avec leur environnement. Elle a des applications dans divers domaines tels que l'éducation, la thérapie et l'intelligence artificielle.
        </p>
        <p className="text-gray-600 text-lg mb-6 font-bold">
          Ce test a pour but d'évaluer si vous êtes philocognitif ou non, et ensuite de découvrir à quel niveau vous vous situez et dans quel état vous vous trouvez.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleStartTest}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            Commencer le test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accueil;

