//lat: -34.5956145, lng: -58.4431949
//import Coordenadas from './classCoord.js'
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
    var myRequest = new Request('/api/ver_reportes', options)
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
            fecha: element.fecha,
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
                        <h4 class="tituloReporte"> ${element.nombre} ${element.apellido}</h4>
                    </div>
                    <div class="contenidoView">
                        <div class="info">
                            <p> <STRONG>Descripcion:</STRONG> ${element.Descripcion}</p>
                            <p> <STRONG>Estado:</STRONG> ${element.estado}</p>
                            <p> <STRONG>Descripcion del estado:</STRONG> ${element.estadoDes}</p>
                            <p> <STRONG>Categoria:</STRONG> ${element.categoria}</p>
                            <p> <STRONG>fecha: </STRONG> ${element.fecha}</p>
                        </div>
                        <div class="multimedia">
                            <img  src="${element.fotoURL}" class="fotoP">
                            <div class="map" id="map">

                            </div>
                        </div>
                        
                        <form class="form" name="form" id='formulario${element.id}'>
                            <div class="form-group">
                                <textarea class= 'comentario' id= 'comentario' placeholder= 'Escribe un comentario' name="coment" ></textarea>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="Pendiente">Pendiente</label>
                                <label><input type="checkbox" id="Proceso">En proceso</label>
                                <label><input type="checkbox" id="Resuelto">Resuelto</label>
                                <label><input type="checkbox" id="Rechazado">Rechazado</label>
                            </div>
                            <button type="submit" id="responder" class="btn btn-primary">Atender Reporte</button>
                        </form>
                        </div>
                        
                        

                    </div>
              
                    `
                    // CARGAR MAPA EN CADA PANEL
                    var mapa = document.getElementById('map')
                    mapa.onload = iniciarMap(parseFloat(element.lat), parseFloat(element.lon))

                    // ACCION PARA RESPONDER REPORTES
                    const formularios = document.getElementById(`formulario${element.id}`)
                    var checkPendiente = document.querySelector('#Pendiente')
                    var checkProceso = document.querySelector('#Proceso')
                    var checkResuelto = document.querySelector('#Resuelto')
                    var checkRechazado = document.querySelector('#Rechazado')
                    function check() {

                        checkPendiente.addEventListener('click', () => {
                            checkProceso.checked = false
                            checkResuelto.checked = false
                            checkRechazado.checked = false
                            return 1
                        })
                        checkProceso.addEventListener('click', () => {
                            checkPendiente.checked = false
                            checkResuelto.checked = false
                            checkRechazado.checked = false
                            return 2
                        })
                        checkResuelto.addEventListener('click', () => {
                            checkPendiente.checked = false
                            checkProceso.checked = false
                            checkRechazado.checked = false
                            return 3
                        })
                        checkRechazado.addEventListener('click', () => {
                            checkPendiente.checked = false
                            checkProceso.checked = false
                            checkResuelto.checked = false
                            return 4
                        })

                    }
                    var box
                    function checked() {
                        if (checkPendiente.checked == true) {
                            box = 1
                        }
                        if (checkProceso.checked == true) {
                            box = 2
                        }
                        if (checkResuelto.checked == true) {
                            box = 3
                        }
                        if (checkRechazado.checked == true) {
                            box = 4
                        }
                    }
                    check()
                    formularios.addEventListener('submit', async (e) => {
                        e.preventDefault()
                        checked()
                        const form = new FormData(formularios)
                        console.log(form.get(`coment`) + box);
                        var body = {
                            respuesta: form.get('coment'),
                            idEstado: box,
                            myID: resultado.mySession.id,
                            idRep: element.id
                        }
                        var opt = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)

                        }
                        var myReq = new Request('/api/crear_respuesta', opt)
                        var resp = await fetch(myReq)
                        var result = await resp.text()

                        alert(result)


                    })


                }

            }

            //var mapa = document.getElementById('mapa')

        })

    })



    //<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14569.553640298735!2d -110.29513645 !3d 24.0878327 00000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1574910360789!5m2!1ses-419!2smx"  allowfullscreen=""
})

function iniciarMap(lat, lon) {
    var coord = { lat: lat, lng: lon };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
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