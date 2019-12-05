document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault()
    const modelo = []
    console.log('si sirve');

    const div = document.getElementById('reportes')
    const view = document.getElementById('viewer')

    var options = {
        method: 'GET'
    }
    var myRequest = new Request('/api/reporte_en_proceso', options)
    var request = await fetch(myRequest)
    var resultado = await request.json()
    console.log(resultado);

    div.innerHTML = ''
    resultado.forEach((element) => {
        div.innerHTML += `
        <div class="card">
        <img src="${element.fotoURL}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Reporte de ${element.nombre} ${element.apellido}</h5>
                <p class="card-text">${element.descripcion}</p>
                <button class="btn btn-primary" id="${element.id}" >visualizar</button>
            </div>
        </div>
    `
        modelo.push({
            apellido: element.apellido,
            descripcion: element.descripcion,
            fotoURL: element.fotoURL,
            id: element.id,
            idReporte: element.idReporte,
            id_admin: element.id_admin,
            latitud: element.latitud,
            fecha: element.fecha,
            longitud: element.longitud,
            categoria: element.categoria,
            nombre: element.nombre,
            respuesta: element.respuesta
        })


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
                            <p> <STRONG>Descripcion:</STRONG> ${element.descripcion}</p>
                            <p> <STRONG>Categoria: </STRONG> ${element.categoria}</p>
                            <p> <STRONG>Respuesta:</STRONG> ${element.respuesta}</p>
                            <p> <STRONG>fecha: </STRONG> ${element.fecha}</p>
                        </div>
                        <div class="multimedia-atendido">
                            <img  src="${element.fotoURL}" class="fotoP">
                            <div class="map" id="map">

                            </div>
                        </div>
                        <form class="form" name="form" id='formulario${element.id}'>
                            <p> <STRONG> Cambiar estado: </STRONG> </p>
                            <div class="checkbox">
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
                    mapa.onload = iniciarMap(parseFloat(element.latitud), parseFloat(element.longitud))

                    const formularios = document.getElementById(`formulario${element.id}`)
                    var checkRechazado = document.querySelector('#Rechazado')
                    var checkResuelto = document.querySelector('#Resuelto')
                    function check() {

                        checkResuelto.addEventListener('click', () => {
                            
                            checkRechazado.checked = false
                            return 3
                        })
                        checkRechazado.addEventListener('click', () => {
                            
                            checkResuelto.checked = false
                            return 4
                        })

                    }
                    var box
                    function checked() {
                        
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
                            idEstado: box,
                            idRep: element.idReporte,
                            idRes: element.id
                        }
                        var opt = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)

                        }
                        var myReq = new Request('/api/actualizar_reporte', opt)
                        var resp = await fetch(myReq)
                        var result = await resp.text()

                        alert(result)


                    })
                }

            }


        })

    })

})

function iniciarMap(lat,lon) {
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

