document.addEventListener('DOMContentLoaded',async ()=>{

    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    }
    var myRequest = new Request('http://18.218.255.127:3000/api/ver_reportes', options)
    var request = await fetch(myRequest)
    var resultado = await request.json()
    resultado.forEach(reporte => {
        const div = document.getElementById('Most')
        div.innerHTML = ''
        div.innerHTML = `
        <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default col-md-12 ">
                    <div class="panel-heading">${reporte.id}</div>
                    <div class="row panel-body">
                        <div>
                        <p>${reporte.DescripcionReporte}</p>
                        <p>Estado: ${reporte.estado}</p>
                        <p>Descripcion del estado: ${reporte.DescripcionEstado}</p>
                        </div>
                        <div class="col-md-6">
                            <img src="https://proyecto-denuncia.s3.us-west-1.amazonaws.com/483528.jpg" alt="">
                        </div>
                        <div class="col-md-6">
                            <div class="mapouterv ">
                                <div class="gmap_canvas"><iframe  id="gmap_canvas"
                                        src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a
                                        href="https://www.embedgooglemap.net/blog/private-internet-access-coupon/"></a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="rowForm">
                        <div class="col-md-12">
                            <form id= '${reporte.id}'>
                                <div class="form-group">
                                    <textarea class= 'comentario' id= 'comentario${reporte.id}' placeholder= 'Escribe un comentario' ></textarea>
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
    });
    
    
})
