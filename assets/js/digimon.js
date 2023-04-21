
function idDigimonRandom(){ // genera un id aleatorio para ver los datos de un digimon aleatorio
    const primerDigimon = 1; //primer id digimon
    const ultimoDigimon = 1422; //ultimo id digimon
    const id = Math.floor(Math.random() * (ultimoDigimon - primerDigimon +1)) + primerDigimon;
    //console.log("id random generado");
    return id;
}

function cardDigimonRandom(digimon){ //genera el card para ser renderizado en el DOM
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

function obtenerDigimon(id){ // busqueda de digimon random
    const url= `https://digimon-api.com/api/v1/digimon/${id}`;
    //console.log('url api digimon...');
    return fetch(url)
    .then(response => response.json() )
    .then(data => {
        const digimon = {
            numero : data.id,
            nombre : data.name,
            imagen : data.images[0].href,
            tipos : data.types,
            descripcion: data.descriptions
        }
        // almacenar solo la descripcion en ingles 
        let textoIngles;
        digimon.descripcion.forEach(descripcion => {
            if (descripcion.language === "en_us"){
                textoIngles = descripcion.description
            }
        })
        digimon.descripcion = textoIngles;
        // almacenar los type name en un solo string, ya que vienen todos en un array
        let tipos = digimon.tipos.map(tipo => tipo.type).join(", ");
        digimon.tipos = tipos;
        //console.log("digimon generado");
        return digimon;
    })
    .catch(error => console.error(error))
}

async function quienEsEseDigimon(){
    const idRandom = idDigimonRandom();
    const digimon = await obtenerDigimon(idRandom);
    if(digimon){
        const dgmCard= cardDigimonRandom(digimon);
        const digimonContenedor = document.querySelector("#random-digimon");
        digimonContenedor.insertAdjacentHTML('beforeend', dgmCard);
        return console.log(digimon.nombre + ' agregado');    }
}
// MODAL DIGIMON
function limpiarModal(){
    $('.modal-numero').text('');
    $('.modal-nombre').text('');
    $('.modal-tipo').text('');
    $('.modal-descripcion').text('');
}



