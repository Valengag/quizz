import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

function Resultats() {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/details');
  };

  // Données pour le diagramme en araignée
  const data = {
    labels: ['Créativié', 'Pensées philo', 'Structure logique', 'Rapidité reflexion', 'Etat productif', 'Précurseur'],
    datasets: [
      {
        label: 'Compétences',
        data: [15, 20, 12, 10, 17, 14],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }, 
      {
        label: 'Non Prod',
        data: [15, 8, 12, 10, 3, 14],
        backgroundColor: 'rgba(214, 54, 54, 0.8)',
        borderColor: 'rgba(176, 3, 3, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true, max: 20 },
    },
  };

  return (
    <div className="flex w-full h-full items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="../public/moitest.png" // Remplacez par le chemin réel de la photo de profil
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">Valentin Despiau-pujo</h2>
              <p className="text-gray-600">25 ans</p>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Tu es philocognitif !</h1>
            <ul className="list-disc text-gray-600 text-lg mb-6">
              <li>Tu as des pensées philosophiques lorsque tu es en état efficace.</li>
              <li>
                Tu as un bon axe de développement en trouvant ce qui te passionne pour ouvrir ta curiosité.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-1/3">
            <Radar data={data} options={options} />
          </div>
          <div className="w-1/2 flex justify-center">
            <button
              onClick={handleViewDetails}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
            >
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resultats;

