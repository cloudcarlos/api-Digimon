// VARIABLES Y CONSTANTES
const primerDgm = 1;    //primer digimon
const ultimoDgm = 1422; //ultimo digimon
const cuantos= 10// cantidad de digimon generados
const ms = 100 // cantidad de milisegundos entre renderizar una u otra card



// genera un id aleatorio para ver los datos de un digimon aleatorio
function generarIds(cantidad){ 
    ids= [];
    for(i = 0; i < cantidad; i++){
        let id = Math.floor(Math.random() * (ultimoDgm - primerDgm +1)) + primerDgm;
        ids.push(id);
    }
    //console.log("ids generado");
    return ids;
}
//card para ser renderizado en el DOM #random-digimon
function cardDigimonRandom(digimon){ 
    const card =`
        <div id="digimon-${digimon.numero}" class="card digimon scale-in-center" data-toggle="modal" data-target="#digiModal">
            <img class="card-img-top rounded-circle" style="max-height: 50%;" src='${digimon.imagen}' alt="digimon ${digimon.numero}">
            <div class="card-body">
                <h4 class="card-subtitle mb-2 text-muted">#${digimon.numero}</h4>
                <h3 class="card-title">${digimon.nombre}</h3>
                <input type="hidden" value='${digimon.tipos}'>
                <input type="hidden" value='${digimon.descripcion}'>
            </div>
        </div>
    `;
    //console.log("card generado");
    return card;
}
// busqueda de digimon random
async function obtenerDigimon(cuantos){
    let ids = generarIds(cuantos) 
    let digimons = [];
    for (let id of ids){
        try{
            //console.log('url api digimon...');
            const url = `https://digimon-api.com/api/v1/digimon/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            const digimon = {
                numero: data.id,
                nombre: data.name,
                imagen: data.images[0].href,
              //  tipos: data.types,
                //descripcion: data.descriptions
            };
            /*
            //capturar descripcion en ingles
            let textoIngles; 
            digimon.descripcion.forEach(descripcion => {
                if (descripcion.language === "en_us") {
                    textoIngles = descripcion.description;
                }
            });
            digimon.descripcion = textoIngles;
            
            //capturar los tipos del digimon
            let tipos = digimon.tipos.map(tipo => tipo.type).join(", ");
            digimon.tipos = tipos;
            
            //almacenar los digimon, en el array digimons
            digimons.push(digimon);
            */

            digimon.tipos = '';
            digimon.descripcion='';
            console.table(digimon)
            
            }catch (error) {
        console.error(error);
        }
    }
    return renderizarDigimones(digimons,ms);
}

function renderizarDigimones(digimons,tiempo) {
    const digimonContenedor = document.querySelector("#random-digimon");
    digimons.forEach( digimon => {
        setTimeout( ()=> {
            console.log('reeendering')
            let card = cardDigimonRandom(digimon);
            console.log(digimon.nombre +'/card generado')
            digimonContenedor.insertAdjacentHTML("beforeend", card);
        }, tiempo);
    });
  }

  /*
async function quienEsEseDigimon(cantidad){
    let ids= generarIds (cantidad);
    let digimons = await obtenerDigimon(ids);
    //console.table(digimons)
    renderizarDigimones(digimons,ms);
}
*/

// MODAL DIGIMON
function limpiarModal(){
    $('.modal-numero').text('');
    $('.modal-nombre').text('');
    $('.modal-tipo').text('');
    $('.modal-descripcion').text('');
}



