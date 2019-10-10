(()=>{
    $("#loading-tabla").show();
    $.ajax({
        url:'../../minew/backend/ajax/usuarios/',
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
function llenarTabla(usuarios){
    console.log(usuarios);
    $('#formanexo').empty(); //Limpiar la tabla
    for (let llave in usuarios) {
        console.log("llave: " +llave);
        anexarRegistroTabla(usuarios[llave], llave);
    }
}

//var registros=[];//Variable global//Este es el arreglo de JSONs, ya no se ocupa porque se guarda la informacion en LocalStorage
var campos =[
    
    {campo:'firstName',valido:false},
    {campo:'lastName',valido:false},
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
        
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        direccion: document.getElementById('direccion').value,
        facebook: document.getElementById('facebook').value
    }
    
    //Peticion AJAX para enviar la información al servidor
    let parametros = $('#formulario').serialize();
    console.log('Información a enviar al servidor: ' + parametros);
    
    $.ajax({
        url:'../../minew/backend/ajax/usuarios/',
        method:'POST',
        data:parametros,//La informacion que se envia al servidor, URLEncoded
        dataType:'json',
        success:function(res){
            console.log(res);
            anexarRegistroTabla(persona,res.key);
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

function anexarRegistroTabla(usuario, llave){
        $('#formanexo').append( 
            ` <div class="row" id="${llave}">
                              
            <div class="col-md-6 mb-3">
                <label  type="text" class="form-control" name="firstName" id="firstName" > ${usuario.firstName}</label>
            </div>
            <div class="col-md-6 mb-3">
                <label  class="form-control" id="lastName">${usuario.lastName} </label>
            </div>
            <div class="col-12 mb-4">
                 <label class="form-control" id="email">${usuario.email}</label>
            </div>
        
            <div class="col-12 mb-3">
                <label class="form-control mb-3" id="direccion" >${usuario.direccion} </label>
            </div>
        </div>`);
    

}
function anexoform(usuario){
    $.ajax({
        url:"../../minew/backend/ajax/usuarios/?accion=login",
        method:"GET",
        dataType:"json",
        success:(res)=>{
            console.log(res);
            if (res.valido)
            $('#formanexo').append(
                `
                <div class="row">
                              
    <div class="col-md-6 mb-3">
        <label  type="text" class="form-control" name="firstName" id="firstName" > ${usuario.firstName}</label>
    </div>
    <div class="col-md-6 mb-3">
        <label  class="form-control" id="lastName">${usuario.lastName} </label>
    </div>
    <div class="col-12 mb-4">
         <label class="form-control" id="email">${usuario.email}</label>
    </div>

    <div class="col-12 mb-3">
        <label class="form-control mb-3" id="direccion" >${usuario.direccion} </label>
    </div>
</div>
               `
            );
            
        else
        //aqui hay q cambiar por un modal o colorear en rojo
            alert('no es correcto');
           
        },
        error:(error)=>{
            console.error(error);
        }
    });
}
function anexarRegistroForm(usuario){
    $('#formanexo').append( 
        `<div class="row">
                                  
        <div class="col-md-6 mb-3">
            <label  type="text" class="form-control" name="firstName" id="firstName" > ${usuario.firstName}</label>
        </div>
        <div class="col-md-6 mb-3">
            <label  class="form-control" id="lastName">${usuario.lastName} </label>
        </div>
        <div class="col-12 mb-4">
             <label class="form-control" id="email">${usuario.email}</label>
        </div>

        <div class="col-12 mb-3">
            <label class="form-control mb-3" id="direccion" >${usuario.direccion} </label>
        </div>
    </div>
    `);


}
function llenarForm(usuarios){
    console.log(usuarios);
    $('#formanexo').empty(); //Limpiar la tabla
    for (let llave in usuarios) {
        console.log("llave: " +llave);
        anexarRegistroForm(usuarios[llave]);
    }
}


function eliminar(id){
    $.ajax({
        url:"../../prueba/backend/ajax/usuarios/?id="+id,
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
        url:"../../minew/backend/ajax/usuarios/?id="+id,
        method:"GET",
        dataType:"json",
        success:(res)=>{
            console.log(res);
            
            $('#firstName').val(res.firstName);
            $('#lastName').val(res.lastName);
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

        let usuario = {
            
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            direccion: document.getElementById('direccion').value,
            facebook: document.getElementById('facebook').value
        }
    var parametros = $('#formulario').serialize();
    console.log('Información a enviar al servidor: ' + parametros);
    
    $.ajax({
        url:`../../minew/backend/ajax/usuarios/?id=${$("#key").val()}`,
        method:"PUT",
        data:parametros,//La informacion que se envia al servidor, URLEncoded
        dataType:"json",
        success:(res)=>{
            console.log(res);
            limpiarFormulario();
            $('#'+res.key).html(
                `
                <td>${usuario.firstName}</td>
                <td>${usuario.lastName}</td>
                <td>${usuario.email}</td>
                <td>${usuario.password}</td>
                <td>${usuario.direccion}</td>
                <td>${usuario.facebook}</td>
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
    
    $('#firstName').val(null);
    $('#lastName').val(null);
    $('#email').val(null);
    $('#password').val(null);
    $('#direccion').val(null);
    $('#facebook').val(null);

    $("#btn-registrar").show();
    $("#btn-actualizar").hide();
    $("#btn-limpiar").hide();
    
}

