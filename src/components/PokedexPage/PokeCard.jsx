import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"

const PokeCard = ({ poke }) => {

    const [ pokemon, getPokemon ]= useFetch()

    useEffect (() => {
        getPokemon(poke.url)
    }, [])

    console.log(pokemon)

    const navigate = useNavigate()

    const handleNavDetail = () => {
        navigate(`/pokemon/${pokemon.name}`)
    }

    return (
        <article className="poke" onClick={handleNavDetail}>
            <header className="poke__header">
                <img className="poke__sprite"
                src ={pokemon?.sprites.other['official-artwork'].front_default} alt=""/>
            </header>
            <section className="poke__body">
                <h3 className="poke__name">{pokemon?.name}</h3>
                <ul>
                    {
                    pokemon?.types.map(typeInfo => (
                    <li key={typeInfo.type.url}>{typeInfo.type.name}</li>
                     ))
                    }
                </ul>
                    <hr />
                <ul>
                    {
                        pokemon?.stats.map(statInfo => (
                            <li key={statInfo.stat.url}>
                                <span>{statInfo.stat.name}</span>
                                <span>{statInfo.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}

export default PokeCard