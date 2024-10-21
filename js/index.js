document.addEventListener('DOMContentLoaded', function() {

    iniciarapp();
})

let idPokemon = 0;
function iniciarapp(){
    consultarappi();
}

async function consultarappi(){
   try {
        var url = "https://pokeapi.co/api/v2/pokemon?&limit=100";
        const respuesta = await fetch(url);
        const json = await respuesta.json();


        listaPokemon(json);

    } catch (error) {
    
        console.log(error);
    }
}

function listaPokemon(json){  
    json.results.forEach(pokemon => {
        idPokemon++;

        const {name} = pokemon;
        const contenedor = document.createElement('DIV');
        contenedor.classList.add('contenedor_pokemon');

        const nombre = document.createElement('H2');
        nombre.textContent = name;
        nombre.classList.add('nombrePokemon');
        nombre.id = idPokemon;
        nombre.classList.add('pokemon');

        const imagen = document.createElement('IMG');
        imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nombre.id}.png`;
        imagen.alt = "iamgen pokemon";

        const verPokemon = document.createElement('A');
        verPokemon.href = `pokemon.html?id=${nombre.id}&name=${name}`;

        verPokemon.appendChild(contenedor);
        contenedor.appendChild(nombre);
        contenedor.appendChild(imagen);
        document.querySelector('.contenedor_principal').appendChild(verPokemon);

        
    });
}



