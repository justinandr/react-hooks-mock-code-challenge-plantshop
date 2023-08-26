import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(res => res.json())
    .then(data => setPlants(data))
  }, [])

  function handleNewPlantSubmit(newPlant) {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
    .then(res => res.json())
    .then(() => setPlants([...plants, newPlant]))
  }

  function handleSearchChange(value){
    setSearch(value)
  }

  const plantsToDisplay = plants.filter((plant => plant.name.toLowerCase().includes(search.toLowerCase())))

  return (
    <main>
      <NewPlantForm onSubmit={handleNewPlantSubmit} />
      <Search onSearchChange={handleSearchChange} search={search} />
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;
