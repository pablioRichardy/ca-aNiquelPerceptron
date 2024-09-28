import { initNetwork } from "../NeuralNetwork/init.js";

initNetwork().then( 
    () => { 
        document.querySelector("displayContentOnLoad").style.display = "block";
    }
);