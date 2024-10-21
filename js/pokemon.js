document.addEventListener('DOMContentLoaded', function() {
    leerGet();

})


function leerGet(){
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id');
    
    obtenerDatosPokemon(id);
}

async function obtenerDatosPokemon(id){
    try {
        var sprites = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const respuesta = await fetch(sprites);
        const json = await respuesta.json();

        id = id;

        mostrarinformacion(json, id);

    } catch (error) {
    
        console.log(error);
    }
}

function mostrarinformacion(json, id){
    const contenedorNombre = document.createElement('DIV');
    const nombre = document.createElement('H2');
    nombre.textContent = json.name;
    contenedorNombre.classList.add('nombrePokemon');
    contenedorNombre.appendChild(nombre);

    const contenedorImg = document.createElement('DIV');
    contenedorImg.classList.add('contenedor_img');
    const imagen = document.createElement('IMG');
    imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    imagen.alt = "iamgen pokemon";
    contenedorImg.appendChild(imagen);

    const contenedorImgs = document.createElement('DIV');
    contenedorImgs.classList.add('contenedor_imgs');

    const imgMachoFront = document.createElement('IMG');
    imgMachoFront.src = json.sprites.front_default;
    imgMachoFront.alt = "iamgen frontal pokemon macho";
    contenedorImgs.appendChild(imgMachoFront);

    const imgMachoBack = document.createElement('IMG');
    imgMachoBack.src = json.sprites.back_default;
    imgMachoBack.alt = "iamgen trasera pokemon macho";
    contenedorImgs.appendChild(imgMachoBack);

    if(json.sprites.front_female){
        const imgFrontHembra = document.createElement('IMG');
        imgFrontHembra.src = json.sprites.front_female;
        imgFrontHembra.alt = json.sprites.front_female ? "iamgen frontal pokemon Hembra" : "";
        contenedorImgs.appendChild(imgFrontHembra);

        const imgBackHembra = document.createElement('IMG');
        imgBackHembra.src = json.sprites.back_female;
        imgBackHembra.alt = json.sprites.back_female ? "iamgen trasera pokemon Hembra" : "";
        contenedorImgs.appendChild(imgBackHembra);
    }

    const contenedorInfo = document.createElement('SECTION');
    contenedorInfo.classList.add('contenedor_info');

    const peso = document.createElement('P');
    peso.textContent = `Peso: ${json.weight} hectogramos`;
    contenedorInfo.appendChild(peso);

    const altura = document.createElement('P');
    altura.textContent = `Altura: ${json.height} Decimetros`;
    contenedorInfo.appendChild(altura);


    const contenedorEstadisticas = document.createElement('DIV');
    contenedorEstadisticas.classList.add('estadisticas');

    const nombreEstadisticas = document.createElement('P');
    nombreEstadisticas.classList.add('nombreEstadisticas');
    nombreEstadisticas.textContent = "Estadisticas";
    contenedorEstadisticas.appendChild(nombreEstadisticas);

    const estadisticas = document.createElement('DIV');

    const estadisticasLife = document.createElement('P');
    estadisticasLife.textContent = `Vida: ${json.stats[0].base_stat}HP`;
    estadisticas.appendChild(estadisticasLife);

    const estadisticasAtaque = document.createElement('P');
    estadisticasAtaque.textContent = `Ataque: ${json.stats[1].base_stat}K`;
    estadisticas.appendChild(estadisticasAtaque);

    const estadisticasDefensa = document.createElement('P');
    estadisticasDefensa.textContent = `Defensa: ${json.stats[2].base_stat}K`;
    estadisticas.appendChild(estadisticasDefensa);

    const estadisticasAtaqueEspecial = document.createElement('P');
    estadisticasAtaqueEspecial.textContent = `Ataque Especial: ${json.stats[3].base_stat}K`;
    estadisticas.appendChild(estadisticasAtaqueEspecial);

    const estadisticasDefensaEspecial = document.createElement('P');
    estadisticasDefensaEspecial.textContent = `Defensa Especial: ${json.stats[4].base_stat}K`;
    estadisticas.appendChild(estadisticasDefensaEspecial);

    const estadisticasVelocidad = document.createElement('P');
    estadisticasVelocidad.textContent = `Velocidad: ${json.stats[5].base_stat}K`;
    estadisticas.appendChild(estadisticasVelocidad);

    contenedorEstadisticas.appendChild(estadisticas);

    contenedorInfo.appendChild(contenedorEstadisticas);


    console.log(json.moves[0].move.name);

    const contenedorMoves = document.createElement('DIV');
    contenedorMoves.classList.add('contenedor_moves');

    const nombreMoves = document.createElement('P');
    nombreMoves.classList.add('nombreMoves');
    nombreMoves.textContent = "Movimientos";
    contenedorMoves.appendChild(nombreMoves);

    const movimientos = document.createElement('DIV');
    movimientos.classList.add('movimientos');

    json.moves.forEach(move => {

        const nombreMovimiento = document.createElement('P');
        nombreMovimiento.textContent = `| ${move.move.name}`

        movimientos.appendChild(nombreMovimiento);

        contenedorMoves.appendChild(movimientos);
    });

    document.querySelector('.main_pokemon').appendChild(contenedorNombre);
    document.querySelector('.main_pokemon').appendChild(contenedorImg);
    document.querySelector('.main_pokemon').appendChild(contenedorImgs);
    document.querySelector('.main_pokemon').appendChild(contenedorInfo);
    document.querySelector('.main_pokemon').appendChild(contenedorMoves);


}