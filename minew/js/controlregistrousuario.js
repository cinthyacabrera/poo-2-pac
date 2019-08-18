
var localStorage = window.localStorage;
/*llenarTabla();
//Leer toda la informaci??n del localStorage
function llenarTabla(){
  document.getElementById('tabla-registros').innerHTML = ""; //Limpiar la tabla
  for (let i=0;i<localStorage.length;i++){
      console.log(localStorage.key(i));
      let datocliente = JSON.parse(localStorage.getItem(localStorage.key(i))); //Convertir de cadena a JSON
      anexarRegistroTabla(datocliente, localStorage.key(i));
  }
}*/
var campocliente =[
    {campo:'nombre-usuario',valido:false},
    {campo:'pass-usuario',valido:false},
    {campo:'first-usuario',valido:false},
    {campo:'last-usuario',valido:false},
    {campo:'email-usuario',valido:false},
    {campo:'direccion-usuario',valido:false},
    {campo:'foto-usuario',valido:false}
  ];
  
  function registrarUsuario(){
    for (let i=0;i<campocliente.length;i++)
        campocliente[i].valido = validarCampoVacio(campocliente[i].campo);  
    for (let i=0;i<campocliente.length;i++)
    if (!campocliente[i].valido) return;
    let datocliente = {
          nombreuser: document.getElementById('nombre-usuario').value,
          PassUser: document.getElementById('pass-usuario').value,
          firstuser: document.getElementById('first-usuario').value,
          lastUser: document.getElementById('last-usuario').value,
          emailuser: document.getElementById('email-usuario').value,
          direccion: document.getElementById('direccion-usuario').value,
          fotouser: document.getElementById('foto-usuario').value,
          faceuser: document.getElementById('facebook-usuario').value
        }
    let key = localStorage.key(localStorage.length-1)==null?0:parseInt(localStorage.key(localStorage.length-1))+1;
  
      console.log("Llave a guardar: "+ key);
      localStorage.setItem( key,JSON.stringify(datocliente));
      /*anexarRegistroTabla(datocliente);*/
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
    document.getElementById('tabla-registros').innerHTML+=
        `<tr>
            <th>${datoempre.nombreuser}</th>
            <th>${datoempre.PassUser}</th>
            <th>${datoempre.firstuser}</th>
            <th>${datoempre.lastUser}</th>
            <th>${datoempre.emailuser}</th>
            
            <th>${datoempre.direccion}</th>
            <th>${datoempre.fotouser}</th>
            <th>${datoempre.faceuser}</th>
            
            <td><button type="button" onclick="eliminar(${id})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
        
}

function eliminar(id){
  console.log("Eliminar registro con id: " + id);
  localStorage.removeItem(id);
  llenarTabla();
}
*/