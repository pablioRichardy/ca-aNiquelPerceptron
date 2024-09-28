export class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes, learning_rate = 0.1) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.learning_rate = learning_rate;

        // Pesos
        this.weights_ih = new Array(this.hidden_nodes).fill().map(() => new Array(this.input_nodes).fill().map(() => Math.random() * 2 - 1));
        this.weights_ho = new Array(this.output_nodes).fill().map(() => new Array(this.hidden_nodes).fill().map(() => Math.random() * 2 - 1));

        // Biases
        this.bias_h = new Array(this.hidden_nodes).fill().map(() => Math.random() * 2 - 1);
        this.bias_o = new Array(this.output_nodes).fill().map(() => Math.random() * 2 - 1);
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    dsigmoid(y) {
        return y * (1 - y);
    }

    normalize(input_array) {
        return input_array.map(x => x / 6); // Normaliza entre 0 e 1
    }

    feedforward(input_array) {
        input_array = this.normalize(input_array);

        // Entrada -> Camada Oculta
        let hidden = this.weights_ih.map((weights, i) => weights.reduce((sum, weight, j) => sum + weight * input_array[j], this.bias_h[i]));
        hidden = hidden.map(this.sigmoid);

        // Camada Oculta -> Saída
        let output = this.weights_ho.map((weights, i) => weights.reduce((sum, weight, j) => sum + weight * hidden[j], this.bias_o[i]));
        output = output.map(this.sigmoid);

        return output;
    }

    train(input_array, target_array) {
        input_array = this.normalize(input_array);

        // Feedforward
        let hidden = this.weights_ih.map((weights, i) => weights.reduce((sum, weight, j) => sum + weight * input_array[j], this.bias_h[i]));
        hidden = hidden.map(this.sigmoid);

        let outputs = this.weights_ho.map((weights, i) => weights.reduce((sum, weight, j) => sum + weight * hidden[j], this.bias_o[i]));
        outputs = outputs.map(this.sigmoid);

        // Backpropagation
        let output_errors = target_array.map((target, i) => target - outputs[i]);
        let hidden_errors = this.weights_ho[0].map((_, i) => this.weights_ho.reduce((sum, weights, j) => sum + weights[i] * output_errors[j], 0));

        // Atualização dos pesos e biases com taxa de aprendizado
        this.weights_ho = this.weights_ho.map((weights, i) => weights.map((weight, j) => weight + this.learning_rate * output_errors[i] * hidden[j] * this.dsigmoid(outputs[i])));
        this.bias_o = this.bias_o.map((bias, i) => bias + this.learning_rate * output_errors[i] * this.dsigmoid(outputs[i]));

        this.weights_ih = this.weights_ih.map((weights, i) => weights.map((weight, j) => weight + this.learning_rate * hidden_errors[i] * input_array[j] * this.dsigmoid(hidden[i])));
        this.bias_h = this.bias_h.map((bias, i) => bias + this.learning_rate * hidden_errors[i] * this.dsigmoid(hidden[i]));
    }
}
