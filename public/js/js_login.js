
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
    var myRequest = new Request('http://localhost:3000/api/web_login', options)
     fetch(myRequest)
     .then(data => data.text() )
     .then(response => {
        var dato = response
        if (dato != 'Okay!') {
            alert(dato)
            
        } else {
            window.location.replace('http://localhost:3000/home')
        }
     })
     .catch((err) => {
         console.error(err);
         
         
     }) 

})