$("#btPlacar").click(mostrarPlacar)

function inserePlacar(){
	//'find' acha um objeto dentro de outro
	var corpoTabela = $(".placar").find("tbody");
	var usuario = "Eugenio";
	var numeroPalavras = $("#cont-palavras").text();
	var linha = novaLinha(usuario, numeroPalavras);
	//'find' acha objeto que tenha tal classe dentro de outro objeto
	linha.find(".botao-remover").click(removeLinha);
	//'apend' a linha adiciona no final, 'prepend' no comeco
	corpoTabela.prepend(linha);
	//Salva placar no server
	syncPlacar();
}

//Salva placar no server
function syncPlacar(){
	var placar = [];
	//'>' trás todas tr's que são filhas diretas de tbory
	var linhas = $("tbody>tr");
	//Passa por todas linhas
	linhas.each(function(){
		//'find(td:nth-child(n))'' trás o n filho achado
		var usuario = $(this).find("td:nth-child(1)").text();
		var numPalavras = $(this).find("td:nth-child(2)").text();

		var score = {
			usuario: usuario,
			pontos: numPalavras
		};

		//coloca score dentro do array placar
		placar.push(score);
	});

	var dados = {
		placar: placar
	};

	$.post("http://localhost:3000/placar", dados, function(){
		console.log("Placar salvo no banco de dados");
	}).fail("Ocorreu um erro ao salvar no banco de dados")
}

function atualizaPlacar(){
	$.get("http://localhost:3000/placar", function(data){
		$(data).each(function(){
			var linha = novaLinha(this.usuario, this.pontos).removeClass("blue");;
			$("tbody").append(linha);
			linha.find(".botao-remover").click(removeLinha);
		});
	});
}

function novaLinha(usuario, palavras){
	//Criando elemento HTML por JS
	var linha = $("<tr>");
	linha.addClass("blue");
	var colunaUser = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(palavras);
	var colunaRemover = $("<td>");
	var link = $("<a>").addClass("botao-remover");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);
	colunaRemover.append(link);
	linha.append(colunaUser);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;
}

function removeLinha(){
	$(".botao-remover").click(function(event){
		//Previne o padrão do html acontecer, como a tag 'a' levar ao topo da pagina / objeto
		event.preventDefault();
		//'parent()' leva ao pai do objeto
		var linha = $(this).parent().parent();
		//fadeout(1000) faz o elemento desaparecer devagar em 1000ms, mas não remove, só faz sumir
		linha.fadeOut();
		setTimeout(function(){
			linha.remove();
		}, 1000);
	});
}

function mostrarPlacar(){
	//Mostra placar
	//CODIGO -> $(".placar").show();
	//Esconde placar
	//CODIGO -> $(".placar").hide();
	//Esconde quando esta visivel e mostra quando esta invisivel
	//CODIGO -> $(".placar").toggle();
	//Mostrar placar aos poucos
	//CODIGO -> $(".placar").slideDown(2000);
	//Esconde placar aos poucos
	//CODIGO -> $(".placar").slideUp(2000);
	//slideToggle() Esconde quando esta visivel e mostra quando esta invisivel devagar
	$(".placar").stop().slideToggle(500);//stop() para a animação se outra for requisitada
	setTimeout(function(){
		scrollPlacar();
		/*
		//manda a window para a localizacao do <a> id = #foo
		$(document).ready(function() {
			//scrolla a tela para o placar quando clicado
			window.location.href='#foo';
		});
		*/
	}, 1000);
}

function scrollPlacar(){
	//offset() trás a posicao do elemento, no caso do topo do elemento
	var posicaoPlacar = $(".placar").offset().top;
	console.log(posicaoPlacar);
	//animate anima o objeto de acordo com algum comando
	$("html").animate({
		//scrolla para baixo até a posicao do placar
		scrollTop: posicaoPlacar+"px"
	}, 500);
}