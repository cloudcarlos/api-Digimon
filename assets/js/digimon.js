// VARIABLES Y CONSTANTES
const primerDgm = 1;    //primer digimon 1
const ultimoDgm = 1422; //ultimo digimon 1422
const cuantos= 10       // cantidad de digimon generados
const ms = 500          // cantidad de milisegundos entre renderizar una u otra card


// genera un id aleatorio para ver los datos de un digimon aleatorio
function generarId(){ 
    let id = Math.floor(Math.random() * (ultimoDgm - primerDgm +1)) + primerDgm;
    //console.log("id generado");
    return id;
}
//card para ser renderizado en el DOM #random-digimon
function generarCard(digimon){ 
    const card =`
    <div id="digimon-${digimon.numero}" class="card card-digimon slide-in-bck-center" data-toggle="modal" data-target="#digiModal" onclick="mostrarModal('digimon-${digimon.numero}')">
        <img class="card-img-top rounded-circle" style="max-height: 50%;" src='${digimon.imagen}' alt="digimon ${digimon.numero}">
        <div class="card-body justify-content-center">
            <h5 class="card-subtitle mb-2 text-muted">#${digimon.numero}</h5>
            <h4 class="card-title">${digimon.nombre}</h4>
            <input type="hidden" class="card-tipos" value='${digimon.tipos}'>
            <input type="hidden" class="card-descripcion" value='${digimon.descripcion}'>
        </div>
    </div>
    `;
    //console.log("card generado");
    return card;
}

function prueba(){
    alert('esto es una pruebirijilla')
}

// busqueda de digimon random
async function obtenerDigimon(id){
    try{
        //console.log('url api digimon...');
        const url = `https://digimon-api.com/api/v1/digimon/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        const digimon = {
            numero: data.id,
            nombre: data.name,
            imagen: data.images[0].href,
            tipos: data.types,
            descripcion: data.descriptions
        };
        
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
            
        //console.table(digimon)    
        return digimon;       

    }catch (error) {
        console.error(error);
    }
}

function renderizarDigimones(digimon) {
    const digimonContenedor = document.querySelector("#random-digimon");
    let card = generarCard(digimon);
    //console.log(digimon.nombre +'- card generado')
    digimonContenedor.insertAdjacentHTML("beforeend", card);
}

async function quienEsEseDigimon(){
    let id= generarId();
    let digimon = await obtenerDigimon(id);
    //console.table(digimon)
    renderizarDigimones(digimon);
}

// MODAL DIGIMON

function mostrarModal(elementoId){
    //limpio el modal de los datos anteriore
    limpiarModal();
    //capturo los elementos del modal    
    const numeroModal = $('.modal-numero');
    const nombreModal = $('.modal-nombre');
    const tiposModal = $('.modal-tipo');
    const descrModal = $('.modal-descripcion');
    const imgModal = $('.modal-imagen');
    // capturo los datos del card 
    const cards = document.querySelectorAll(`#${elementoId}`);
    cards.forEach(card => {
        const cardBody = card.querySelector('.card-body');
        //captura el numero del digimon
        const numeroDigimon = cardBody.querySelector('.card-subtitle').innerHTML;
        //captura el nombre del digimon
        const nombreDigimon = cardBody.querySelector('.card-title').innerHTML;
        //captura el value de los tipos del digimon
        const cardTipo = cardBody.querySelector('.card-tipos');
        const tipoDigimon = cardTipo.getAttribute('value');
        //captura el value de la descripcion del digimon
        const cardDescr = cardBody.querySelector('.card-descripcion');
        const descrDigimon = cardDescr.getAttribute('value');
        //captura la url de la imagen del digimon
        const cardImagen = card.querySelector('.card-img-top');
        const urlImgDigimon = cardImagen.getAttribute('src');
        /*
        console.log(`URL de imagen: ${urlImgDigimon}`);
        console.log(`
            | n°: ${numeroDigimon} | name: ${nombreDigimon} | tipo: ${tipoDigimon} 
            | descripcion : ${descrDigimon}
        `);
        */
        //asigno los valores al modal
        numeroModal.text(numeroDigimon);
        nombreModal.text(nombreDigimon);
        tiposModal.text(tipoDigimon);
        descrModal.text(descrDigimon);
        imgModal.attr("src", urlImgDigimon);
        imgModal.addClass("img-thumbnail rounded-circle bounce-in-top")
    });

    $("#digiModal").modal("show");
}
    

function limpiarModal(){
    const numeroModal = $('.modal-numero');
    const nombreModal = $('.modal-nombre');
    const tipoModal = $('.modal-tipo');
    const descripcionModal = $('.modal-descripcion');
    const imagenModal = $('.modal-imagen');

    numeroModal.text('');
    nombreModal.text('');
    tipoModal.text('');
    descripcionModal.text('');
    imagenModal.attr('src', '');
    imagenModal.removeClass("img-thumbnail rounded-circle bounce-in-top")
}



