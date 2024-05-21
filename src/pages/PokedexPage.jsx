import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import { useRef } from "react"
import { useState } from "react"
import SelectType from "../components/PokedexPage/SelectType"
 
const PokedexPage = () => {

  const [searchedName, setSearchedName] = useState ('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')

 

  const trainer = useSelector(states => states.trainer)

  const [ pokemons, getPokemons, getTypePokemon] = useFetch()

  useEffect(() => {
    if(typeSelected === 'allPokemons') {
      // Hacemos la peticion de todos los pokemons
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      getPokemons(url)
    } else {
// Peticion de los pokemosn por tipo
      getTypePokemon(typeSelected)
    }
  }, [typeSelected])

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setSearchedName(inputName.current.value.trim().toLowerCase())
  }

  const callbackFilter = poke => {
    const filterName = poke.name.includes(searchedName)
    return filterName
  }

  return (
    <div>
      <h1>Pokedex</h1>
      <p>Welcome {trainer}, here you'll find  your favorite Pokemon </p>
      <form onSubmit ={handleSearch}>
        <input ref={inputName} type="text"/>
        <button>Search</button>
      </form>
      <div>
        {
          pokemons && pokemons.results.filter(callbackFilter).length === 0 ?<h2>The are no pokemons that meet the filters. </h2>
          : (
            pokemons?.results.filter(callbackFilter).map(poke => (
              <PokeCard
                key={poke.url}
                poke={poke}
                />
            ) )
          )
        }
      </div>   
    </div>
  )
}

export default PokedexPage