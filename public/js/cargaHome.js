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
                            <img src="${reporte.fotoURL}" alt="">
                        </div>
                        <div class="col-md-6">
                            <div id="map"></div>
                            
            
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
            
            <script>
                 function iniciarMap(){
                     var coord = {lat:-34.5956145 ,lng: -58.4431949};
                     var map = new google.maps.Map(document.getElementById('map'),{
                        zoom: 10,
                        center: coord
                     });
                        var marker = new google.maps.Marker({
                        position: coord,
                        map: map
                     });
                 } 
             </script>
             <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=iniciarMap"></script>
            
           
            
        `
    });
    
    
})
