//  SERVIDOR:   http://18.218.255.127:3000/
var formulario = document.getElementById('form')
var abc = document.getElementById('sino')
formulario.addEventListener('submit',(e)=>{

    e.preventDefault()
   
    var datos = new FormData(formulario)
    var data = {
        email: datos.get('email'),
        password: datos.get('pwd')
    }
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    var myRequest = new Request('/api/web_login', options)
     fetch(myRequest)
     .then(data => data.text() )
     .then(response => {
        var dato = response
        if (dato != 'Okay!') {
            alert(dato)
            
        } else {
            //console.log('token ' + window.localStorage.getItem('AccessToken'));
            window.location.replace('/home')
            
            
            
        }
     })
     .catch((err) => {
         console.error(err);
         
         
     }) 

})