//Funcion limpia mensajes de alertas y oculta el botón copiar.
function iniciar_modulo_encriptador(){
    limp_mensajes_alertas('h5');
    limp_mensajes_alertas('h6');
    limp_mensajes_alertas('h7');
    asig_mensajes_alertas('textarea','Ingrese el texto aquí...');
    oculta_etiqueta('Copiar');
}
//Función oculta etiquetas
function oculta_etiqueta(etiqueta){
    let etiquetaElemento=document.getElementById(etiqueta);
    etiquetaElemento.style.display="none";
}
//Funciona activa etiquetas
function activa_etiqueta(etiqueta){
    let etiquetaElemento=document.getElementById(etiqueta);
    etiquetaElemento.style.display="inline";
}
//Función limpia textarea de ingreso de texto a encriptar o desencriptar.
function limpiar_textarea(evento) {
    document.getElementById('CadenaTexto').value="";
}
//función asigna mensajes a etiquetas para informar al usuario las restricciónes o alertas del modulo encriptador.
function asig_mensajes_alertas(etiqueta,mensaje){
    let elemento_etiqueta=document.querySelector(etiqueta);
    elemento_etiqueta.innerHTML=mensaje;
}
function limp_mensajes_alertas(etiqueta){
    let elemento_etiqueta=document.querySelector(etiqueta);
    elemento_etiqueta.innerHTML="";
}
//Función que solo permit el ingreso de letras minusculas.
function permitir_sololetras(evento) {

    limp_mensajes_alertas('h6');
    limp_mensajes_alertas('h5');
    limp_mensajes_alertas('h7');
    oculta_etiqueta('Copiar'); 
    document.getElementById('CadenaConvertido').value="";
    key=evento.keyCode || evento.wicth;
    tecla=String.fromCharCode(key).toString();
    letras="abcdefghijklmnopqrstuvwxyz";

    //Permite ingresar los cararecter especiales de retroceso(8), enter(13) o espacio(32)
    caracter_especial=[8,13,32];
    tecla_especial=false;
    for(var i in caracter_especial){
        if(key==caracter_especial[i]){
            tecla_especial=true;
            break;
        }
    }

    if(letras.indexOf(tecla)==-1 && !tecla_especial)
    {
        //alert("Por favor, ingrese solo letras en minusculas. \n No esta permitido caracteres especiales o letras con tilde.");
        asig_mensajes_alertas('h6','Por favor, ingrese solo letras en minúsculas. \n No está permitido caracteres especiales o letras con tilde.');
       return false;
    }

}
function selecciona_cadena(etiqueta) {
    cadena=document.getElementById(etiqueta).value;
    return cadena;
}
//Funcion encripta cadena de texto.
function encripta_cadena(){
    let cadena_original=selecciona_cadena('CadenaTexto');
    let caracter_orgn="";
    let lst_caracter_cadena_original=[];
    let lst_caracter_cadena_convertido=[];
    let cadena_encritada="";
    //validamos si existen datos a encriptar, en caso que no activan los mensajes de alertas.
    if(cadena_original.length==0){
        asig_mensajes_alertas('h5',"Ningún mensaje fue encontrado");
        asig_mensajes_alertas('h7','Ingrese el texto que desea encriptar o desencriptar.');
        oculta_etiqueta('Copiar');
    }else{
    //Si, existe valores en la cadena por lo tanto se inicia el bucle for que examina cada caracter de la cadena.
    for(c=0;c<cadena_original.length;c++){
        caracter_orgn=cadena_original.charAt(c);
        lst_caracter_cadena_original.push(caracter_orgn);
    }
    //parametros y condiciones de transformación para las letras a,e,i,o,u
    for(l=0;l<lst_caracter_cadena_original.length;l++){
        caracter_orgn=lst_caracter_cadena_original[l];
        switch(true){
            case (caracter_orgn=='a'):
                caracter_orgn='ai';
                break;
            case (caracter_orgn=='e'):
                caracter_orgn='enter';
                break;
            case (caracter_orgn=='i'):
                caracter_orgn='imes';
                break;
            case (caracter_orgn=='o'):
                caracter_orgn='ober';
                break;
            case (caracter_orgn=='u'):
                caracter_orgn='ufat';
                break;
            default:
                caracter_orgn=lst_caracter_cadena_original[l];                                      
        }
        lst_caracter_cadena_convertido.push(caracter_orgn);
        cadena_encritada=cadena_encritada+lst_caracter_cadena_convertido[l];
    }
    limp_mensajes_alertas('h6');
    limpiar_textarea('event');
    activa_etiqueta('Copiar');
    return document.getElementById('CadenaConvertido').value=cadena_encritada;
    }
}
function desencripta_cadena(){
    let cadena_encritada=selecciona_cadena('CadenaTexto');
    let caracter_encriptado="";
    let lst_caracter_cadena_encriptada=[];
    let caracter_legible="";
    let lst_caracter_cadena_legible=[];
    let cadena_legible="";
    if(cadena_encritada.length==0){
        asig_mensajes_alertas('h5',"Ningún mensaje fue encontrado");
        asig_mensajes_alertas('h7','Ingrese el texto que desea encriptar o desencriptar.');
        oculta_etiqueta('Copiar');        
    }else{   
    for(x=0;x<cadena_encritada.length;x++){
        caracter_legible=cadena_encritada.charAt(x);
        caracter_encriptado=cadena_encritada.charAt(x);
        switch(true){
            case (caracter_legible=='a'):
                if(cadena_encritada.charAt(x+1)=='i'){
                    caracter_encriptado='ai';
                    caracter_legible='a';
                    x=x+1;
                    break;
                }else{
                    caracter_legible=cadena_encritada.charAt(x);
                    caracter_encriptado=cadena_encritada.charAt(x);
                }
                break;
            case (caracter_legible=='e'):
                if(cadena_encritada.charAt(x+1)=='n' && cadena_encritada.charAt(x+2)=='t' && cadena_encritada.charAt(x+3)=='e' && cadena_encritada.charAt(x+4)=='r'){
                    caracter_encriptado='enter';
                    caracter_legible='e';
                    x=x+4;
                    break;
                }else{
                    caracter_legible=cadena_encritada.charAt(x);
                    caracter_encriptado=cadena_encritada.charAt(x);
                }
                break;
            case (caracter_legible=='i'):
                if(cadena_encritada.charAt(x+1)=='m' && cadena_encritada.charAt(x+2)=='e' && cadena_encritada.charAt(x+3)=='s'){
                    caracter_encriptado='imes';
                    caracter_legible='i';
                    x=x+3;
                    break;
                }else{
                    caracter_legible=cadena_encritada.charAt(x);
                    caracter_encriptado=cadena_encritada.charAt(x);
                }
                break;
            case (caracter_legible=='o'):
                if(cadena_encritada.charAt(x+1)=='b' && cadena_encritada.charAt(x+2)=='e' && cadena_encritada.charAt(x+3)=='r'){
                    caracter_encriptado='ober';
                    caracter_legible='o';
                    x=x+3;
                    break;
                }else{
                    caracter_legible=cadena_encritada.charAt(x);
                    caracter_encriptado=cadena_encritada.charAt(x);
                }
                break;                                                  
            case (caracter_legible=='u'):
                if(cadena_encritada.charAt(x+1)=='f' && cadena_encritada.charAt(x+2)=='a' && cadena_encritada.charAt(x+3)=='t'){
                    caracter_encriptado='ufat';
                    caracter_legible='u';
                    x=x+3;
                    break;
                }else{
                    caracter_legible=cadena_encritada.charAt(x);
                    caracter_encriptado=cadena_encritada.charAt(x);
                }
                break; 
            default:
                caracter_legible=cadena_encritada.charAt(x);
                caracter_encriptado=cadena_encritada.charAt(x);                                      
        }
        lst_caracter_cadena_encriptada.push(caracter_encriptado);
        lst_caracter_cadena_legible.push(caracter_legible);
    }
    for(c=0;c<lst_caracter_cadena_legible.length;c++){
        cadena_legible=cadena_legible+lst_caracter_cadena_legible[c];
    }
    limp_mensajes_alertas('h6');
    limpiar_textarea('event');
    activa_etiqueta('Copiar');    
    return document.getElementById('CadenaConvertido').value=cadena_legible;
}
}
function copiar_cadena() {
    //Obtener la cadena del textarea
    let etiqueta=document.getElementById('CadenaConvertido');

    //Obtener la cadena seleccionada en el textarea
    let cadenaseleccionada=etiqueta.value.substring(etiqueta.selectionStart, etiqueta.selectionEnd);
    
    //Comprobar si se ha seleccionado la cadena
    if(cadenaseleccionada.length>0){
        // Usamos la API del portapapeles para copiar el texto selecccionado.
        navigator.clipboard.writeText(cadenaseleccionada)
            .then(()=>{
                //Mensaje de éxito
                asig_mensajes_alertas('h7','Texto seleccionado y copiado al portapapeles');
            })
            .catch(err=>{
                //Mensaje de error en caso el procedimiento anterior no se realice
                console.error('Error al copiar cadena',err);
                asig_mensajes_alertas('h7','No se logró copiar el texto, por favor intente nuevamente.');
            });
    }else{
        asig_mensajes_alertas('h7','Por favor, seleccione el texto que quiere copiar.');
    }
}
iniciar_modulo_encriptador();