import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import React,{ useEffect } from "react"

const PokeInfoPage = () => {

  const { name } = useParams()

  const [ pokemon, getPokemon ] = useFetch()

useEffect(() => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}` 
  getPokemon(url)
}, [name])

console.log(pokemon)

  return (
    <article>
    <article>
      <img src={pokemon?.sprites.other['official-artwork'].front_default} alt=""/>
      <h2>{pokemon?.name}</h2>
    </article>
    </article>
  )
}

export default PokeInfoPage