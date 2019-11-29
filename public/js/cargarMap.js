import Coordenadas from './classCoord'
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

document.addEventListener('DOMContentLoaded', ()=> {
    iniciarMap(Coordenadas.getLat(),Coordenadas.getLat())
})


