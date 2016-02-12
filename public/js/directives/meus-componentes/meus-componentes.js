angular.module('meusComponentes', [])
	   .directive('meuPainel', meuPainel)
	   .directive('meuBotaoAviso', meuBotaoAviso)
	   .directive('meuFocus', meuFocus);
	   
function meuPainel() {
	return {
		restrict: "EA",
		templateUrl: 'js/directives/meus-componentes/meu-painel.html',
		scope: {
			titulo: '@'
		},
		transclude: true
	};
}

function meuBotaoAviso() {
	return {
		restrict: 'E',
		template: '<button ng-click="acao()" class="btn btn-warning">'
				+ '{{nome}}'
				+ '</buttom>',
		scope: {
			nome: '@',
			acao: '&'
		}
	};
}

function meuFocus() {
	return {
		retrict: 'A',
		scope: {
			evento: '@'
		},
		link: function(scope, element) {
			scope.$on(scope.evento, function() {
				element[0].focus();
			});
		}
	};
}