var tempoInicial = $("#tempo-dig").text();

//Espera a pagina carregar para entao chamar as funcoes
$(function(){
	atualizaTamFrase();
	atualizaPlacar();
	inicializaCont();
	inicializaCron();
	//Reiniciar o jogo
	$("#btReiniciar").click(reiniciaJogo);//.click() é exatamente on.("click", ), mas com sintaxe facilitada
});

function atualizaTamFrase(){
	//Função de Query do jQuery é simplesmente jQuery("objeto") ou ainda só $("objeto")
	var frase = $(".frase").text();
	//Split("a") quebra o texto em um array com divisao no a, que pode ser um espaço, virgula, etc...
	var numPalavras = frase.split(" ").length;

	var tamFrase = $("#tam-frase");
	/*Ao passar o .text() sem nada ele retorna o valor de texto, se for passado com algo dentro - .text(a) - então
	ele muda o conteudo de texto do objeto*/
	tamFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo){
	tempoInicial = tempo;
	$("#tempo-dig").text(tempo);
}

var digitado = $(".digitado");
function inicializaCont(){
	//on é um eventListener mais facil de ser usado
	digitado.on("input", function(){
		var qntCaracteres = $("#cont-caracteres");
		//'/\S+/' é o valor para definir espaço, enter e etc...
		if(digitado.val() != " "){
			var qntCar = parseInt(qntCaracteres.text());
			qntCar++;
			qntCaracteres.text(qntCar.toString());
		}

		//val é value, só mais curtO
		var qntPalavras = digitado.val().split(/\S+/).length - 1;

		var contPalavras = $("#cont-palavras");
		contPalavras.text(qntPalavras);
	});
}

digitado.on("input", function(){
	var frase = $(".frase").text();
	var conteudo = digitado.val();
	//'substr(inicio, fim)' trás a string do inicio ao fim escolhidos
	var comparavel = frase.substr(0, conteudo.length);
	var fraseVF = $("#FraseVF");

	if(conteudo == comparavel){
		digitado.removeClass("borda-vermelha");
		digitado.addClass("borda-verde");
		fraseVF.text("A frase está correta");
	}
	else{
		digitado.removeClass("borda-verde");
		digitado.addClass("borda-vermelha");
		fraseVF.text("A frase está errada");
	}
});

function inicializaCron(){
	var tempoRestante = $("#tempo-dig").text();
	//one coloca o codigo no objeto uma unica vez, em vez de toda vez q clica
	digitado.on("focus", function(){//focus detecta quando o usuario entra no campo
		//setInterval chama a função a cada intervaldo de tempo determinado em ms, e ele retorna seu proprio ID
		var cronometroID = setInterval(function(){
			tempoRestante--;
			$("#tempo-dig").text(tempoRestante);
			if(tempoRestante == 0){
				tempoRestante = tempoInicial;
				$("#tempo-dig").text(tempoRestante);
				//Faz o setInverval parar
				clearInterval(cronometroID);
				finalizaJogo();
			}
		}, 1000);
	});
}

function finalizaJogo(){
	//Le e modifica atributos, como classes, id's e etc...
	digitado.attr("disabled", true); //disabled desabilita o campo texto
	//Muda o CSS do campo
	//CÓDIGO -> digitado.css("background-color", "lightgray")
	//Usaremos addClass que adiciona classes
	//CÓDIGO -> digitado.addClass("campo-desabilitado");
	//Remove classes
	//CÓDIGO -> digitado.removeClass("campo-habilitado");
	//Adiciona classe se ela não estiver, e retira se estiver
	digitado.removeClass("campo-habilitado");
	digitado.addClass("campo-desabilitado");
	inserePlacar();
}

function reiniciaJogo(){
	digitado.attr("disabled", false);
	digitado.val("");
	//CÓDIGO -> digitado.addClass("campo-habilitado");
	//CÓDIGO -> digitado.removeClass("campo-desabilitado");
	digitado.removeClass("campo-desabilitado");
	digitado.addClass("campo-habilitado");
	$("#cont-palavras").text("0");
	$("#cont-caracteres").text("0");

	var ultimo = $(".blue");
	ultimo.removeClass("blue");
}




