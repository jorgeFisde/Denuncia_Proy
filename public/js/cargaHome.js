//lat: -34.5956145, lng: -58.4431949
function iniciarMap(lat, lon, id) {
    var coord = { lat: lat, lng: lon };
    var map = new google.maps.Map(document.getElementById(`map${id}`), {
        zoom: 50,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}
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
        iniciarMap(parseFloat(element.latitud), parseFloat(element.longitud), element.id)



    });


})
