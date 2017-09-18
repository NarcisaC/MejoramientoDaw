function cargarAgenda() {
	/*
	$.getJSON("data/imagenes.json", function(data) {
*/
	$.ajax({
		dataType: "json",
		url: "../data/imagenes.json",
		mimeType: "text/json",
		success: function(data){
			$.each(data, function(key, val) {
				var fecha = val["Fecha"]; 
				var post = $("<div></div>");
				var postTitle = $("<div></div>");
				var postDate = $("<div></div>");
				var p = $("<p></p>");
				var img = $("<img></img>");
				var a = $('<a></a>');
								
				var mes = fecha.split(" ").pop();

				post.attr('class','post');
				postTitle.attr('class','postTitle col-xs-6 col-sm-4 col-md-3');
				postTitle.attr('id',mes);
				postDate.attr('class','postDate');
				img.attr('src','/img/imgDate.png');
				img.attr('class','hidden-img');
				
				p.text(fecha);

				postDate.append(p);
				postTitle.append(
					$('<div>',{
						'class':'click'
					}).append(
						a.append(
							$('<span>',{
								'class':'glyphicon glyphicon-menu-left'
							})
						)
					)
					,postDate);

				postTitle.append(img);
				post.append(postTitle);

				$('.postList').append(post);

				a.click({dia:fecha},showImg);

				$.each(val["Eventos"],function(key,val){
					post.append(
						$('<div>',{
							'class': 'postImages col-xs-6 col-md-3'
						}).append(
							$('<div>',{
								'class':'img-wrapper'
							}).append(
								$('<img>',{
									'src': val['Imagen'],
									'class': 'right-img'
								}),
								$('<div>',{
									'class':'caption'
								}).append(
									$('<a>',{
										'href':'#',
									}).append(
										$('<span>').append($('<em>',{
											'text':val['Descripcion']
										}))
									)
								)
							)
							)
						
					);
				});


			});	
		}
		
	});
}


function showImg(event) {
	var p = $('.post .postTitle .postDate p');
	for(var i=0; i<p.length; i++){
		peq = p.eq(i)
		if ( event.data.dia == peq.text() ) {

			var click = peq.parent().parent().find('.click');
			var phicon = click.find('.glyphicon');
			click.parent().parent().find('.postImages').toggle(250);
			var left = '.glyphicon-menu-left';
			var rigth = '.glyphicon-menu-right';
			if ( click.find(left).length > 0 ){
				phicon.removeClass('glyphicon-menu-left');
				phicon.addClass('glyphicon-menu-right');
			}else if ( click.find(rigth).length > 0){
				phicon.removeClass('glyphicon-menu-right');
				phicon.addClass('glyphicon-menu-left');
			}
		}
	}
	
}

function showImg(event) {
	var p = $('.post .postTitle .postDate p');
	for(var i=0; i<p.length; i++){
		peq = p.eq(i)
		if ( event.data.dia == peq.text() ) {

			var click = peq.parent().parent().find('.click');
			var phicon = click.find('.glyphicon');
			click.parent().parent().find('.postImages').toggle(250);
			var left = '.glyphicon-menu-left';
			var rigth = '.glyphicon-menu-right';
			if ( click.find(left).length > 0 ){
				phicon.removeClass('glyphicon-menu-left');
				phicon.addClass('glyphicon-menu-right');
			}else if ( click.find(rigth).length > 0){
				phicon.removeClass('glyphicon-menu-right');
				phicon.addClass('glyphicon-menu-left');
			}
		}
	}
	
}

$(document).ready(function(){
	$('.time ul li a#mes').click(function(){
		var click = $(this);
		var content = click.parent().parent().parent().parent();
		var junio = $('.postList .post #Junio');
		var julio = $('.postList .post #Julio');
		
		junio.find('.postDate p').text('Junio 2017');
		for(var i=1; i<junio.length; i++){
			junio.eq(i).hide(100);
		}

		julio.find('.postDate p').text('Julio 2017');
		for(var j=1; j<julio.length; j++){
			julio.eq(j).hide(100);
		}
		
	});
});

window.onload=function() {

    cargarAgenda();
 

}