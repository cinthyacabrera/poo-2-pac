
var localStorage = window.localStorage;
/*llenarTabla();
//Leer toda la informaci??n del localStorage
function llenarTabla(){
  document.getElementById('perfil-empresa').innerHTML = ""; //Limpiar la tabla
  for (let i=0;i<localStorage.length;i++){
      console.log(localStorage.key(i));
      let datoempre = JSON.parse(localStorage.getItem(localStorage.key(i))); //Convertir de cadena a JSON
      anexarRegistroTabla(datoempre, localStorage.key(i));
  }
}*/
var campoempre =[
  {campo:'nombre-empre',valido:false},
  {campo:'pais-empre',valido:false},
  {campo:'email-empre',valido:false},
  {campo:'direccion-empre',valido:false},
  {campo:'foto-empre',valido:false}
];
function registrarEmpresa(){
  for (let i=0;i<campoempre.length;i++)
      campoempre[i].valido = validarCampoVacio(campoempre[i].campo);  
  for (let i=0;i<campoempre.length;i++)
  if (!campoempre[i].valido) return;
  let datoempre = {
        EmpreName: document.getElementById('nombre-empre').value,
        PaisName: document.getElementById('pais-empre').value,
        facebook: document.getElementById('facebook-empre').value,
        foto: document.getElementById('foto-empre').value,
        email: document.getElementById('email-empre').value,
        direccion: document.getElementById('direccion-empre').value
    }
    let key = localStorage.key(localStorage.length-1)==null?0:parseInt(localStorage.key(localStorage.length-1))+1;

    console.log("Llave a guardar: "+ key);
    localStorage.setItem( key,JSON.stringify(datoempre));
    /*anexarRegistroTabla(datoempre);*/


location.href="perfilempresa.html";
}
function validarCampoVacio(id){
  let resultado = (document.getElementById(id).value=='')?false:true;
  marcarInput(id, resultado);
  return resultado;
}
function marcarInput(id,valido){
  if (valido){
      document.getElementById(id).classList.remove('is-invalid');
      document.getElementById(id).classList.add('is-valid');
  } else{
      document.getElementById(id).classList.remove('is-valid');
      document.getElementById(id).classList.add('is-invalid');        
  } 
}






/*
function anexarRegistroTabla(datoempre,id){
  document.getElementById('perfil-empresa').innerHTML+=
`<div class="col-12 mb-4 ">
<img id ="foto-perfil "style="width:200px; height=200px;" class ="img-fluid " src = "${datoempre.foto}">

</div>
<form action="#" method="post">
<div  class="row">

<div class="col-md-6 mb-3">
    <label  type="text" class="form-control" placeholder="nombre">${datoempre.EmpreName}</label>
</div>
<div class="col-md-6 mb-3">
    <label  class="form-control" placeholder="descripcion">${datoempre.PaisName},${datoempre.facebook}</label>
</div>
<div class="col-12 mb-4">
     <label class="form-control" placeholder="email">${datoempre.email}</label>
</div>

<div class="col-12 mb-3">
    <label class="form-control mb-3" placeholder="direccion">${datoempre.direccion}</label>
</div>
<div id="perfil-empresa"></div>


<div class="col-md-12 row botones-registro">
    <a href="#"><button class="form-control" type="button" onclick="eliminar(${id})" >ficha promocional</button></a>
</div>

</div>
</form>`;
}
*/





 /* function anexarRegistroTabla(datoempre,id){
    document.getElementById('tabla-registros').innerHTML+=
        `<tr>
            <th>${datoempre.EmpreName}</th>
            <th>${datoempre.PaisName}</th>
            <th>${datoempre.email}</th>
            
            <th>${datoempre.direccion}</th>
            <th>${datoempre.foto}</th>
            <th>${datoempre.facebook}</th>
            
            <td><button type="button" onclick="eliminar(${id})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
        
}

function eliminar(id){
  console.log("Eliminar registro con id: " + id);
  localStorage.removeItem(id);
  llenarTabla();
}
*/

