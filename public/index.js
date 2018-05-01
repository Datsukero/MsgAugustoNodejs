function resposta(data, status){
	
	$("#comment").val('')
	$('#mensagens').empty()
	
	data.forEach(function(data, index){
		var line = $('<pre/>')
		line.html(data.mensagem)
		$('#mensagens').append(line)		
	})
}

function send(){
	$.post(
		'set_mensagem',
		{mensagem : $("#comment").val()},
		resposta		
	)
}

function load(){
	$.get(
		'get_mensagens',
		{},
		resposta
	)
}