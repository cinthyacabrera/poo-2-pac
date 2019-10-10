(()=>{
    $("#loading-tabla").show();
    $.ajax({
        url:'../../minew/backend/ajax/empresas/',
        dataType:'json',
        success:(res)=>{
            llenarTabla(res);
            $("#loading-tabla").hide();
        },
        error:(error)=>{
            console.log(error);
            $("#loading-tabla").hide();
        }
    });
})();





//Leer toda la información del localStorage
function llenarTabla(empresas){
    console.log(empresas);
    $('#anexoempresa').empty(); //Limpiar la tabla
    for (let llave in empresas) {
        console.log("llave: " +llave);
        anexarRegistroEmpresa(empresas[llave], llave);
    }
}

//var registros=[];//Variable global//Este es el arreglo de JSONs, ya no se ocupa porque se guarda la informacion en LocalStorage
var campos =[
    
    {campo:'nombreEmpresa',valido:false},
    {campo:'pais',valido:false},
    {campo:'email',valido:false},
    {campo:'password',valido:false},
    {campo:'direccion',valido:false},
    {campo:'facebook',valido:false}
];



function registrarUsuario(){
    
    for (let i=0;i<campos.length;i++)
        campos[i].valido = validarCampoVacio(campos[i].campo);
    
    if (document.getElementById('email')!=''){
        
        let resultadoEmail = validarEmail(document.getElementById('email').value);
        console.log('Validará el correo electronico: ' + resultadoEmail);
        campos[2].valido = resultadoEmail;
        marcarInput('email',resultadoEmail);
        if (!resultadoEmail)
            document.getElementById('email-invalid-feedback').innerHTML = "Correo Inválido";
            
        console.log(campos);
    }

    
    for (let i=0;i<campos.length;i++)
        if (!campos[i].valido) return;

    
    let persona = {
        
        nombreEmpresa: document.getElementById('nombreEmpresa').value,
        pais: document.getElementById('pais').value,
        
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        direccion: document.getElementById('direccion').value,
        facebook: document.getElementById('facebook').value
    }
    
    //Peticion AJAX para enviar la información al servidor
    let parametros = $('#formulario').serialize();
    console.log('Información a enviar al servidor: ' + parametros);
    
    $.ajax({
        url:'../../minew/backend/ajax/empresas/',
        method:'POST',
        data:parametros,//La informacion que se envia al servidor, URLEncoded
        dataType:'json',
        success:function(res){
            console.log(res);
            anexarRegistroEmpresa(persona,res.key);
        },
        error:function(error){
            console.error(error);
        }
    });
    
}

function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=='')?false:true;
    marcarInput(id, resultado);
    return resultado;
}


function validarEmail(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function validarEmailEnLinea(email){
    console.log(email);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado =  re.test(email);
    marcarInput('email',resultado);
    document.getElementById('email-invalid-feedback').innerHTML = "Correo Inválido";
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

function anexarRegistroEmpresa(empresa, llave){
        $('#anexoempresa').append( 
            `
            <div  class="row" id="${llave}">
                                <div class="col-md-6 mb-3">
                                    <label id="nombreEmpresa" name="nombreEmpresa" type="text" class="form-control" >${empresa.nombreEmpresa} </label>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label id="descripcion" name="descripcion" class="form-control" >${empresa.pais}</label>
                                </div>
                                <div class="col-12 mb-4">
                                     <label id="email" name="email" class="form-control" >${empresa.email}l</label>
                                </div>
                                <div class="col-12 mb-3">
                                    <label id="direccion" class="form-control mb-3" >${empresa.direccion} </label>
                                </div>
                                <div id="perfil-empresa"></div>
                                <div class="col-md-6 row botones-registro">
                                    <a href="ficha.html" target="_blank"><button class="form-control" type="button" >ficha promocional</button></a>
                                </div>
                                <div class="col-md-6 row botones-registro">
                                    <a href="das.html" ><button class="form-control" type="button" >tablero</button></a>
                                </div>
                            </div>
      `);
    
}


function eliminar(id){
    $.ajax({
        url:"../../prueba/backend/ajax/empresas/?id="+id,
        method:"DELETE",
        dataType:"json",
        success:(res)=>{
            console.log(res);
            $("#"+id).remove();
        },
        error:(error)=>{
            console.error(error);
        }
    });
}

function editar(id){
    $.ajax({
        url:"../../minew/backend/ajax/empresas/?id="+id,
        method:"GET",
        dataType:"json",
        success:(res)=>{
            console.log(res);
            
            $('#nombreEmpresa').val(res.nombreEmpresa);
            $('#pais').val(res.pais);
            $('#email').val(res.email);
            $('#password').val(res.password);
            $('#direccion').val(res.direccion);
            $('#facebook').val(res.facebook);
            $('#key').val(id);

            $("#btn-registrar").hide();
            $("#btn-actualizar").show();
            $("#btn-limpiar").show();
        },
        error:(error)=>{
            console.error(error);
        }
    });
}
 
function actualizarUsuario() {
    for (let i=0;i<campos.length;i++)
        campos[i].valido = validarCampoVacio(campos[i].campo);
    
    if (document.getElementById('email')!=''){
        
        let resultadoEmail = validarEmail(document.getElementById('email').value);
        console.log('Validará el correo electronico: ' + resultadoEmail);
        campos[2].valido = resultadoEmail;
        marcarInput('email',resultadoEmail);
        if (!resultadoEmail)
            document.getElementById('email-invalid-feedback').innerHTML = "Correo Inválido";
            
        console.log(campos);
    }
    for (let i=0;i<campos.length;i++)
        if (!campos[i].valido) return;

        let empresa = {
            
            nombreEmpresa: document.getElementById('nombreEmpresa').value,
            pais: document.getElementById('pais').value,
            
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            direccion: document.getElementById('direccion').value,
            facebook: document.getElementById('facebook').value
        }
    var parametros = $('#formulario').serialize();
    console.log('Información a enviar al servidor: ' + parametros);
    
    $.ajax({
        url:`../../minew/backend/ajax/empresas/?id=${$("#key").val()}`,
        method:"PUT",
        data:parametros,//La informacion que se envia al servidor, URLEncoded
        dataType:"json",
        success:(res)=>{
            console.log(res);
            limpiarFormulario();
            $('#'+res.key).html(
                `
                <td>${empresa.nombreEmpresa}</td>
                <td>${empresa.pais}</td>
                <td>${empresa.email}</td>
                <td>${empresa.password}</td>
                <td>${empresa.direccion}</td>
                <td>${empresa.facebook}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editar('${res.key}')" type="button"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar('${res.key}')" type="button"><i class="fas fa-trash-alt"></i></button>
                </td>`
            );
        },
        error:(error)=>{
            console.error(error);
        }
    });
}


function limpiarFormulario() {
    
    $('#nombreEmpresa').val(null);
    $('#pais').val(null);
    $('#email').val(null);
    $('#password').val(null);
    $('#direccion').val(null);
    $('#facebook').val(null);

    $("#btn-registrar").show();
    $("#btn-actualizar").hide();
    $("#btn-limpiar").hide();
    
}

