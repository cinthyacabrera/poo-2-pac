
	$("#btn-login").click(function(){
        let=parametros =$("#form-login").serialize();
        console.log('login :'+ parametros);


       /*esto erea para probar so funcinaba con un checkbox entrar a cada ajax 
       let escogerInput = document.querySelector('input[type="radio"][name="escoger"]:checked');
        
            escoger=(escogerInput==null)?'':escogerInput.value;     
     
       
      if (escogerInput.value=='usuario') {   */
          
            $.ajax({
                url:"../../minew/backend/ajax/usuarios/?accion=login",
                method:"POST",
                data:parametros,
                dataType:"json",
                success:(res)=>{
                    console.log(res);
                    if (res.valido)
                        window.location.href='das.php';

                    else
                    //aqui hay q cambiar por un modal o colorear en rojo
                        alert('no es correcto');
                },
                error:(error)=>{
                    console.error(error);
                }
            });
       /* }
        
           /* $.ajax({
                url:"../../minew/backend/ajax/empresas/?accion=login",
                method:"POST",
                data:parametros,
                dataType:"json",
                success:(res)=>{
                    console.log(res);
                    if (res.valido)
                        window.location.href='das.php';
                    else
                    //aqui hay q cambiar por un modal o colorear en rojo
                        alert('no es correcto');
    
                },
                error:(error)=>{
                    console.error(error);
                }
            });
        
        if(escogerInput.value=='admin'){
        $.ajax({
            url:"../../minew/backend/ajax/administrador/?accion=login",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:(res)=>{
                console.log(res);
                if (res.valido)
                    window.location.href='comentarios.php';
                else
                //aqui hay q cambiar por un modal o colorear en rojo
                    alert('no es correcto');
            },
            error:(error)=>{
                console.error(error);
            }
        });

        }*/

    });

    function anexoform(){
        $.ajax({
            url:"../../minew/backend/ajax/usuarios/?accion=login",
            method:"GET",
            dataType:"json",
            success:(res)=>{
                console.log(res);
                
                $('#formanexo').html(
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
            },
            error:(error)=>{
                console.error(error);
            }
        });
    }
 