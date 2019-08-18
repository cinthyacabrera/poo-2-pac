$(document).ready(function () {

  var navListItems = $('div.setup-panel div a'),
          allWells = $('.setup-content'),
          allNextBtn = $('.nextBtn');

  allWells.hide();

  navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
              $item = $(this);

      if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
      }
  });

  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

      $(".form-group").removeClass("has-error");
      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid){
              isValid = false;
              $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
      }

      if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
  });

  $('div.setup-panel div a.btn-primary').trigger('click');
});








/*inicio valida la pagina registrate.html*/

var campos =[
    {campo:'email',valido:false},
    {campo:'password',valido:false}
];
function registrarUsuario(){
    for (let i=0;i<campos.length;i++)
        campos[i].valido = validarCampoVacio(campos[i].campo);
    if (document.getElementById('email')!=''){
        let resultadoEmail = validarEmail(document.getElementById('email').value);
        console.log('Validar el email: ' + resultadoEmail);
        campos[0].valido = resultadoEmail;
        marcarInput('email',resultadoEmail);
        if (!resultadoEmail)
            document.getElementById('email-invalid-feedback').innerHTML = "Correo Invalido";
        console.log(campos);
    }
    for (let i=0;i<campos.length;i++)
        if (!campos[i].valido) return;
        let persona = {/* esto servisa para almacenar en el localstorage*/ 
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }
}
function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=='')?false:true;
    marcarInput(id, resultado);
    return resultado;
}
/*
function validarEmail(email){
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return re.test(email);
}
*/
function validarEmailEnLinea(email){
    console.log(email);
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    let resultado =  re.test(email);
    marcarInput('email',resultado);
    document.getElementById('email-invalid-feedback').innerHTML = "Correo Invà¸£à¸�lido";
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
/* fin de valida la pagina registrate.html*/
