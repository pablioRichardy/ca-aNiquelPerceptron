import { initNetwork, nn } from "./NeuralNetwork/init.js";

// Carregando conteúdo após a Rede Neural
initNetwork().then( 
    () => { 
        document.querySelector("displayContentOnLoad").style.display = "block";
    }
);

/**
 * Valida se os slots fornecidos são válidos, ou seja, se são iguais ou difentes, caso iguais então retorna true, caso diferentes então retorna falso.
 * 
 * @param {number} slot1 - O primeiro número a ser usado como input.
 * @param {number} slot2 - O segundo número a ser usado como input.
 * @param {number} slot3 - O terceiro número a ser usado como input.
 * 
 * @returns {boolean} O resultado da comparação entre os 3 slots.
 */
window.validate = function(slot1, slot2, slot3) {
    const output = nn.feedforward([slot1, slot2, slot3]);
    
    return output <= 0.5 ? false : true;
}

// Código inicia aqui

			// Largura dos icones
			const 	icon_width = 79,	
			// Altura
			icon_height = 79,	
			// Quantidade
			num_icons = 9,	
			// Velocidade da animação
			time_per_icon = 100,
			// Indexes
			indexes = [0, 0, 0];



const roll = (reel, offset = 0) => {
	// 2 voltas + o valor do atraso entre cada rolo
	const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons); 
	
	// Retorna uma promise para esperar os rolos girarem 
	return new Promise((resolve, reject) => {
		
		const style = getComputedStyle(reel),
					// Posição atual do background
					backgroundPositionY = parseFloat(style["background-position-y"]),
					// Posição esperada do background
					targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
					// Posição do background para reiniciar 
					normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);
		
		// Aplicar um delay com timeout
		setTimeout(() => { 
			// Transição: https://cubic-bezier.com/#.41,-0.01,.63,1.09 talvez eu seja burro
			reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			// Define a posição do fundo
			reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
		}, offset * 150);
			
		// Depois da animação
		setTimeout(() => {
			// Reinicia a posição
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			// Resolve a promise dos rolos
			resolve(delta%num_icons);
		}, (8 + 1 * delta) * time_per_icon + offset * 150);
		
	});
};



 //Roda os três rolos, quando a promise é resolvide o rodo voltar a girar

function rollAll() {
	
	const reelsList = document.querySelectorAll('.slots > .reel');
	
	Promise
		
		// Converte a nodelist dos rodos em um vetor, quando as animações acabarem executa a soma dos indexes
		.all( [...reelsList].map((reel, i) => roll(reel, i)) )	
		
		// Quando os rolos terminam de rodar 
		.then((deltas) => {
			// Soma dos indexes
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
			
            document.getElementById('validate').textContent = validate(indexes[0], indexes[1], indexes[2]);
            document.getElementById('feedforward').textContent = nn.feedforward(indexes);
            document.getElementById('indexes').textContent = ` ${indexes.join(', ')}`;
			
			// Condição de vitória (2 simbolos iguais da esquerda pra direita e da direita da pra esquerda e 3 simbolos iguais)
			if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
				const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
				document.querySelector(".slots").classList.add(winCls);
				setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000)
			}
		
			// Começa novamente
			setTimeout(rollAll, 3000);
		});
};

// Inicio
setTimeout(rollAll, 1000);
