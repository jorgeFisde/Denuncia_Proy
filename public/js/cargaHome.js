//lat: -34.5956145, lng: -58.4431949
const arregloCoord = []
const arregloMapas = []
const modelo = []



const div = document.getElementById('reportes')
const view = document.getElementById('viewer')

document.addEventListener('DOMContentLoaded', async () => {

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }

    }
    var myRequest = new Request('http://localhost:3000/api/ver_reportes', options)
    var request = await fetch(myRequest)
    var resultado = await request.json()
    console.log(resultado);

    div.innerHTML = ''
    resultado.reportes.forEach((element) => {
        div.innerHTML += `
            <div class="card">
            <img src="${element.fotoURL}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Reporte de ${element.nombreUsuario} ${element.apellidoUsuario}</h5>
                    <p class="card-text">${element.DescripcionReporte}</p>
                    <button class="btn btn-primary" id="${element.id}" >visualizar</button>
                </div>
            </div>
        `
        modelo.push({
            id: element.id,
            Descripcion: element.DescripcionReporte,
            idCategoria: element.categoria,
            fotoURL: element.fotoURL,
            lat: element.latitud,
            lon: element.longitud,
            idEstado: element.idEstado,
            estado: element.estado,
            estadoDes: element.DescripcionEstado,
            nombre: element.nombreUsuario,
            apellido: element.apellidoUsuario,
            categoria: element.nombreCategoria
        })

        //iniciarMap(parseFloat(element.latitud), parseFloat(element.longitud), element.id)


    });

    let array = document.querySelectorAll('.btn')

    array.forEach(item => {

        item.addEventListener('click', () => {
            for (let index = 0; index < modelo.length; index++) {
                const element = modelo[index];
                if (element.id == item.id) {
                    view.innerHTML = `
                    <div class="cabezaPanel">
                        <h4 class="tituloReporte"> ${element.Descripcion}</h4>
                    </div>
                    <div class="contenidoView">
                        <div class="info">
                            <p>${element.Descripcion}</p>
                            <p>Estado: ${element.estado}</p>
                            <p>Descripcion del estado: ${element.estadoDes}</p>
                            
                        </div>
                        <img  src="${element.fotoURL}" class="fotoP">
                        
                        <div class="map" id="map">
                                
                        </div>
                        <form class="form" id= '${element.id}'>
                            <div class="form-group">
                                <textarea class= 'comentario' id= 'comentario${element.id}' placeholder= 'Escribe un comentario' ></textarea>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox">En proceso</label>
                                <label><input type="checkbox">Aceptado</label>
                                <label><input type="checkbox">Rechazado</label>
                            </div>
                            <button type="submit" class="btn btn-block">Atender Reporte</button>
                        </form>
                        
                    </div>
              
                    `
                    iniciarMap(parseFloat(element.lat),parseFloat(element.lon))
                    var mapa = document.getElementById('mapa')
                    
                }

            }
        })

    })


})

function iniciarMap(lat,lon) {
    var coord = { lat: lat, lng: lon };
    var map = new google.maps.Map(document.getElementById(`map`), {
        zoom: 30,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}

/*
    
    
    function iniciarMap() {
    for (let index = 0; index < arregloCoord.length; index++) {
        var map = new google.maps.Map((arregloMapas[index].mapa), {
            zoom: 30,
            center: arregloCoord[index]
        })
        var marker = new google.maps.Marker({
            position: arregloCoord[index],
            map: map
        })
        console.log(map);

    }
    console.log(arregloCoord);
    console.log(arregloMapas);
           

    
    */




/*
`
        <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default col-md-12 ">
                    <div class="panel-heading">ID del reporte: ${element.id}</div>
                    <div class="row panel-body">
                        <div>
                        <p>${element.DescripcionReporte}</p>
                        <p>Estado: ${element.estado}</p>
                        <p>Descripcion del estado: ${element.DescripcionEstado}</p>
                        </div>
                        <div class="col-md-6">
                            <img src="${element.fotoURL}" alt="">
                        </div>

                            <div id="map${element.id}" class="map"></div>


                    </div>
                    <div class="rowForm">
                        <div class="col-md-12">
                            <form id= '${element.id}'>
                                <div class="form-group">
                                    <textarea class= 'comentario' id= 'comentario${element.id}' placeholder= 'Escribe un comentario' ></textarea>
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox">En proceso</label>
                                    <label><input type="checkbox">Aceptado</label>
                                    <label><input type="checkbox">Rechazado</label>
                                </div>
                                <button type="submit" class="btn btn-block">Atender Reporte</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

                    `
*/