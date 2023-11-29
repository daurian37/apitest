import React, { useState, useEffect } from 'react';

export default function Home() {
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/data');
      const data = await response.json();
      setDonnees(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Données Fictives</h1>
      <ul>
        {donnees.map((item) => (
          <li key={item.id}>
            <strong>{item.nom}</strong> - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
