import { NeuralNetwork } from "./NeuralNetwork.js";

// Exemplo de uso
export const nn = new NeuralNetwork(3, 4, 1, 0.6);

// Gerar todas as combinações possíveis de 1 a 6
function generateCombinations() {
    const combinations = [];
    const range = [1, 2, 3, 4, 5, 6];

    for (let i = 0; i < range.length; i++) {
        for (let j = 0; j < range.length; j++) {
            for (let k = 0; k < range.length; k++) {
                combinations.push([range[i], range[j], range[k], range[i] && range[j] === range[k] ? 1 : 0]);
            }
        }
    }

    return combinations;
}

const allCombinations = generateCombinations();


export function initNetwork()
{
    return new Promise( ( resolve ) => {
        for (let i = 0; i < 10000; i++) {
            allCombinations.forEach(combination => {
                const input = combination.slice(0, 3);
                const output = combination.slice(3);
                nn.train(input, output);
            });
        }

        resolve(true);
    });
}


// Teste
/*
console.log(nn.feedforward([1, 1, 1])); // Deve retornar algo próximo de 1
console.log(nn.feedforward([2, 2, 2])); // Deve retornar algo próximo de 1
console.log(nn.feedforward([1, 1, 2])); // Deve retornar algo próximo de 0
console.log(nn.feedforward([3, 3, 3])); // Deve retornar algo próximo de 1
console.log(nn.feedforward([4, 5, 6])); // Deve retornar algo próximo de 0
console.log(nn.feedforward([5, 5, 5])); // Deve retornar algo próximo de 1*/