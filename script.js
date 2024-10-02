import { initNetwork, nn } from "./neuralNetwork/init";

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


