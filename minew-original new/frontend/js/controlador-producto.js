(()=>{
    $("#loading-tabla").show();
    $.ajax({
        url:'../../minew/backend/ajax/producto/',
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
function llenarTabla(productos){
    console.log(productos);
    $('#anexoproducto').empty(); //Limpiar la tabla
    for (let llave in productos) {
        console.log("llave: " +llave);
        anexarRegistroProducto(productos[llave], llave);
    }
}

//var registros=[];//Variable global//Este es el arreglo de JSONs, ya no se ocupa porque se guarda la informacion en LocalStorage
var campos =[
    
    {campo:'nombre',valido:false},
    {campo:'precio',valido:false},
    {campo:'descripcion',valido:false},
    {campo:'foto',valido:false}
];



function registrarProducto(){
    
    for (let i=0;i<campos.length;i++)
        campos[i].valido = validarCampoVacio(campos[i].campo);


    
    for (let i=0;i<campos.length;i++)
        if (!campos[i].valido) return;

    
    let articulo = {
        
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        descripcion: document.getElementById('descripcion').value,
        foto: document.getElementById('foto').value
    }
    
    //Peticion AJAX para enviar la información al servidor
    let parametros = $('#formulario').serialize();
    console.log('Información a enviar al servidor: ' + parametros);
    
    $.ajax({
        url:'../../minew/backend/ajax/productos/',
        method:'POST',
        data:parametros,//La informacion que se envia al servidor, URLEncoded
        dataType:'json',
        success:function(res){
            console.log(res);
            anexarRegistroProducto(articulo,res.key);
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



function marcarInput(id,valido){
    if (valido){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    } else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');        
    }
}
//agregar prodcuto  a la tabla
function anexarRegistroProducto(producto, llave){
        $('#anexoproducto').append( 
            `
            <div  class="row" id="${llave}">
                                <div class="col-12 col-sm-6 col-md-4 col-lg-3" >
                                <div class="single-product-wrapper">
                                    <!-- Product Image -->
                                    <div class="product-img">
                                        <img src="${producto.foto}" alt="">
                                        <!-- Product Badge -->
                                        <div class="product-badge offer-badge">
                                            <span>-30%</span>
                                        </div>
                                        <!-- Favourite -->
                                        <div class="product-favourite">
                                            <a href="#" class="favme fa fa-heart"></a>
                                        </div>
                                    </div>




                                    <!-- Product Description -->
                                    <div class="product-description">
                                        <span>${producto.nombre}</span>
                                        <a href="detalledeprod.html">
                                            <h6>${producto.descripcion}</h6>
                                        </a>
                                        <p class="product-price"><span class="old-price">$75.00</span> ${producto.precio}</p>

                                        <!-- Hover Content -->
                                        <div class="hover-content">
                                            <!-- Add to Cart -->
                                            <div class="add-to-cart-btn">
                                                <a href="#" class="btn essence-btn">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>


                            </div>
      `);
    
}


function eliminar(id){
    $.ajax({
        url:"../../prueba/backend/ajax/productos/?id="+id,
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
        url:"../../minew/backend/ajax/productos/?id="+id,
        method:"GET",
        dataType:"json",
        success:(res)=>{
            console.log(res);
            
            $('#nombre').val(res.nombre);
            $('#precio').val(res.precio);
            $('#descripcion').val(res.descripcion);
            $('#foto').val(res.foto);
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
 



function limpiarFormulario() {
    
    $('#nombre').val(null);
    $('#precio').val(null);

    $('#descripcion').val(null);
    $('#foto').val(null);

    $("#btn-registrar").show();
    $("#btn-actualizar").hide();
    $("#btn-limpiar").hide();
    
}