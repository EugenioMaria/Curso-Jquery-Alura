$("#btFrase").click(fraseAleatoria);
$("#btFraseId").click(buscaFrase);

function fraseAleatoria(){
	var spinner = $("#spinner");
	spinner.show();
	//get(link, o que fazer) - requisições AJAX para puxar dados do server
	$.get("http://localhost:3000/frases", trocaFraseAleatoriamente)
	//fail() se der errado a requisição executa alguma ação
	.fail(erro)
	//Executa se a requisicao der certo ou errado, ou seja, sempre
	.always(function(){
		spinner.hide();
	});
}

function trocaFraseAleatoriamente(data){
	$("#erro").hide();
	var frase = $(".frase");
	//Math.random() retorna um número aleatorio entre 0 e 1
	var numAleatorio = Math.floor(Math.random()*data.length);
	frase.text(data[numAleatorio].texto);

	atualizaTamFrase();
	atualizaTempoInicial(data[numAleatorio].tempo);
}

function buscaFrase(){
	var spinner = $("#spinner");
	spinner.show();

	var fraseId = ($("#frase-id").val()-1);
	//Objeto JS
	var dados = {id: fraseId};
	//get(link, dados para passar ao link, o que fazer) - requisições AJAX para puxar dados do server
	$.get("http://localhost:3000/frases", dados, trocaFrase)
	//fail() se der errado a requisição executa alguma ação
	.fail(erro)
	//Executa se a requisicao der certo ou errado, ou seja, sempre
	.always(function(){
		spinner.hide();
	});
}

function trocaFrase(data){
	$("#erro").hide();
	$(".frase").text(data.texto);
}

function erro(){
	$("#erro").show();
	$("#spinner").hide();
}