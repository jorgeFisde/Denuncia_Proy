var mios = document.getElementById('mios')

mios.addEventListener('click', () => {
    const modelo = []


    console.log('si sirve');
    
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
                            </div>
                            <div class="multimedia">
                                <img  src="${element.fotoURL}" class="fotoP">
                                <div class="map" id="map">

                                </div>
                            </div>
                        </div>
                        
                        

                    </div>
              
                    `
                        // CARGAR MAPA EN CADA PANEL
                        var mapa = document.getElementById('map')
                        mapa.onload = iniciarMap(parseFloat(element.lat), parseFloat(element.lon))

                    }

                }


            })

        })

    })
})