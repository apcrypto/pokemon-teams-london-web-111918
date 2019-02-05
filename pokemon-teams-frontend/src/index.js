
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('#main')

const state = {
  trainers: [],
}

const getTrainers = () => {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => {
    state.trainers = trainers
    console.log('data in state!')
    trainerCard()
  })
}

const trainerCard = () => {
  main.innerHTML = ''
  state.trainers.forEach(trainer => {
  return main.innerHTML += `
  <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button class="add" data-trainer-id="${trainer.id}"> Add Pokemon</button>
    <ul>
    ${trainer.pokemons.map( pokemon => {
     return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }).join('')}
    </ul>
  </div>
  `
  })

  const addBtns = document.querySelectorAll('.add')
  addBtns.forEach(addBtn => addBtn.addEventListener('click', addPokemonHandler))

  const releaseBtns = document.querySelectorAll('.release')
  releaseBtns.forEach(releaseBtn => releaseBtn.addEventListener('click', releasePokemonHandler))
}

const addPokemonHandler = (event) => {
  const trainerId = event.target.dataset.trainerId
  debugger
  addPokemon(trainerId)
}

const releasePokemonHandler = (event) => {
 const id = event.target.dataset.pokemonId
 releasePokemon(id)
}

const addPokemon = (trainerId) => {
  return fetch(`http://localhost:3000/pokemons`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ 'trainer_id': trainerId })
  }).then(res => getTrainers())

}

const releasePokemon = (id) => {
  return fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }).then(res => getTrainers())

}

getTrainers()
