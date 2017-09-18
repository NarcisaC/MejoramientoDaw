$( document ).ready( function(){

	// Al dar click en el boton de submit
	$("#btnSubmit").on("click", function(e){

		e.preventDefault();

		//var correo = $("#inputEmail").val();
		//var contrasena = $("#inputPassword").val();
		//console.log(correo);
		//console.log(contrasena);
		
		//comprobacionUsuario(correo, contrasena);
	});
	
	

});


function comprobacionUsuario(correo, contrasena){

	var ruta = "./datos/usuarios.json";

    $.ajax(
    	{
    		method: "GET",
    		url: ruta,
    		data: {},
    		mimeType: "application/json; charset=utf-8"
    	}
    ).done(function(arreglo){
    	//0var encontrado = false;
    	//var check = false;

    	$.each(arreglo, function (i) {
    		if(arreglo[i].logeo=="true"){
    			$(#nombrecompleto).value(arreglo[i].name);
    			$(#idCorreo).value(arreglo[i].user);
    		}
    		
			
		}); // End each()

		}


	}); // End done()
}