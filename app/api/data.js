// pages/api/donneesFictives.js

const data = [
    { id: 1, nom: 'Donnée 1', description: 'Description de la donnée 1' },
    { id: 2, nom: 'Donnée 2', description: 'Description de la donnée 2' },
    // Ajoutez d'autres données fictives selon vos besoins
  ];
  
  export default function handler(req, res) {
    res.status(200).json(data);
  }
  