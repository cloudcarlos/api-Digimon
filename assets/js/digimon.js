// VARIABLES Y CONSTANTES
const primerDgm = 1;    //primer digimon 1
const ultimoDgm = 1422; //ultimo digimon 1422
const ms = 50       // cantidad de milisegundos entre renderizar una u otra card

//capturo los elementos del modal    
const numeroModal = $('.modal-numero');
const nombreModal = $('.modal-nombre');
const tiposModal = $('.modal-tipo');
const nivelesModal = $('.modal-nivel');
const lanzModal = $('.modal-lanzamiento')
const descrModal = $('.modal-descripcion');
const imgModal = $('.modal-imagen');

// genera un id aleatorio para ver los datos de un digimon aleatorio
function generarId(){ 
    let id = Math.floor(Math.random() * (ultimoDgm - primerDgm +1)) + primerDgm;
    //console.log("id generado");
    return id;
}
//card para ser renderizado en el DOM id  #random-digimon
function generarCard(digimon){ 
    const card =`
    <div id="digimon-${digimon.numero}" class="card card-digimon slide-in-top" data-toggle="modal" data-target="#digiModal" onclick="mostrarModal('digimon-${digimon.numero}')">
        <img class="card-img-top rounded-circle" style="max-height: 50%;" src='${digimon.imagen}' alt="digimon ${digimon.numero}">
        <div class="card-body justify-content-center">
            <h5 class="card-subtitle mb-2 text-muted">#${digimon.numero}</h5>
            <h4 class="card-title">${digimon.nombre}</h4>
            <p hidden class="card-tipos">${digimon.tipos}</p>
            <p hidden class="card-niveles">${digimon.niveles}</p>
            <p hidden class="card-lanzamiento">${digimon.lanzamiento}</p>
            <p hidden class="card-descripcion">${digimon.descripcion}</p>
        </div>
    `;
    //console.log("card generado");
    return card;
}

function prueba(){
    alert('esto es una pruebirijilla')
}

// busqueda de digimon random
function obtenerDigimon(id){
    //console.log('url api digimon...');
    const url = `https://digimon-api.com/api/v1/digimon/${id}`;
    return fetch(url)
    .then(response => response.json())
    .then(data => {    
        const digimon = {
            numero: data.id,
            nombre: data.name,
            imagen: data.images[0].href,
            niveles: data.levels,
            tipos: data.types,
            lanzamiento : data.releaseDate,
            descripcion: data.descriptions
        };
        //capturar descripcion en ingles
        let textoIngles=''; 
        digimon.descripcion.forEach(descripcion => {
            if (descripcion.language === "en_us"){
                textoIngles = descripcion.description
            }
        })
        digimon.descripcion = textoIngles;

        //capturar los tipos del digimon
        let tipos = digimon.tipos.map(tipo => tipo.type).join(", ");
        digimon.tipos = tipos;

        //capturar los level del digimon
        let niveles = digimon.niveles.map(nivel => nivel.level).join(", ");
        digimon.niveles = niveles;

        //console.table(digimon) para revisar toda la data del digimon capturado   
        return digimon;
        
    })
    .catch(error => console.error(error))
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
    // capturo los datos del card 
    const cards = document.querySelectorAll(`#${elementoId}`);
    cards.forEach(card => {
        const cardBody = card.querySelector('.card-body');
        //captura el numero del digimon
        const numeroDigimon = cardBody.querySelector('.card-subtitle').innerHTML;
        //captura el nombre del digimon
        const nombreDigimon = cardBody.querySelector('.card-title').innerHTML;
        //captura el value de los tipos del digimon
        const tipoDigimon = cardBody.querySelector('.card-tipos').innerHTML;
        //captura el value de los niveles del digimon
        const nivelDigimon = cardBody.querySelector('.card-niveles').innerHTML;
        //captura el value del lanzamiento del digimon
        const lanzDigmon = cardBody.querySelector('.card-lanzamiento').innerHTML;
        //captura el value de la descripcion del digimon
        const descrDigimon = cardBody.querySelector('.card-descripcion').innerHTML;
        //captura la url de la imagen del digimon
        const cardImagen = card.querySelector('.card-img-top');
        const urlImgDigimon = cardImagen.getAttribute('src');
        /*
        //comprobacion de constantes del modal
        console.log(`
            | URL de imagen: ${urlImgDigimon}
            | n°: ${numeroDigimon} | name: ${nombreDigimon} | tipo: ${tipoDigimon} 
            | descripcion : ${descrDigimon}
        `);
        */
        //asigno los valores al modal
        numeroModal.text(numeroDigimon);
        nombreModal.text(nombreDigimon);
        tiposModal.text(tipoDigimon);
        nivelesModal.text(nivelDigimon);
        lanzModal.text(lanzDigmon);
        descrModal.text(descrDigimon);
        imgModal.attr("src", urlImgDigimon);
        imgModal.addClass("bounce-in-top")
    });
    //abre el modal
    $("#digiModal").modal("show");
}

function limpiarModal(){
    //limpia el modal antes de volver a cargar datos en el mismo
    numeroModal.text('');
    nombreModal.text('');
    tiposModal.text('');
    nivelesModal.text('');
    descrModal.text('');
    imgModal.attr('src', '');
    // innecesario imgModal.removeClass("bounce-in-top")
}



