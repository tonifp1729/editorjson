import { Vista } from "../view/vista.js";
import { Editor } from "../view/vistaeditor.js";

class Controlador {
   //Objeto Map que se utilizará para almacenar las distintas vistas de la aplicación
    vistas = new Map();

    constructor() {
        //Inicializamos los elementos contenedores de las distintas vistas
        const divEditor = document.getElementById('divEditor');

        //Creamos la vista
        this.vistas.set(Vista.VistaEditor, new Editor(this, divEditor));

        //Mostramos la vista inicial
        this.verVista(Vista.VistaEditor);
    }

    verVista(vista) {
        this.ocultarVistas();
        this.vistas.get(vista).mostrar(true);
    }

    ocultarVistas(){
        for(const vista of this.vistas.values()){
            vista.mostrar(false);
        }
    }
}

//Llamamos al constructor dentro de controlador.
window.onload = () => {
    new Controlador();
}