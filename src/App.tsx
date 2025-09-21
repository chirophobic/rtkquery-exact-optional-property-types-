import { useGetPokemonByNameQuery } from './api'

function App() {
  const result = useGetPokemonByNameQuery('bulbasaur')
  console.log(result)

  if (result.isSuccess) {
    console.log(result.data.id)
  }

  return (
    <div>
      Hello, World!
    </div>
  )
}

export default App
