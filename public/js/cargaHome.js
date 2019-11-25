//lat: -34.5956145, lng: -58.4431949
// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=iniciarMap"
const arregloCoord = []
const arregloMapas = []
const yaCargo = false

 

const div = document.getElementById('Most')

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
        <div class="card" style="width: 18rem;">
        <img src="${element.fotoURL}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Reporte de ${element.nombreUsuario} ${element.apellidoUsuario}</h5>
                <p class="card-text">${element.DescripcionReporte}</p>
                <a href="#" class="btn btn-primary">visualizar</a>
            </div>
        </div>
        `
        

                 arregloCoord.push({ lat: parseFloat(element.latitud), lng: parseFloat(element.longitud)})
                 arregloMapas.push({
                     mapa: document.getElementById(`map${element.id}`)
                 })


            //iniciarMap(parseFloat(element.latitud), parseFloat(element.longitud), element.id)
            

    });

    
            const mapa = document.getElementById('mapa')   
            

})

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
    //var coord = { lat: lat, lng: lon };
    /*var map = new google.maps.Map(document.getElementById(`map${id}`), {
        zoom: 30,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });*/
} 




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