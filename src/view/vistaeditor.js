import { Vista } from "./vista.js";
import { Modelo } from "../model/model.js";

export class Editor extends Vista {
    constructor(controlador, base) {
        // Llama al constructor de la clase padre (Vista)
        super(controlador, base);
        
        // Crear una instancia del modelo con el JSON de ejemplo
        const modelo = new Modelo(); // Pasa el JSON al modelo

        //Obtenemos el JSON utilizando el método getJSON() presente en el modelo
        const jsonObtenido = modelo.getCabecera();

        //Llamamos al método de la vista para generar el formulario dinámicamente
        if (jsonObtenido) { // Verifica que jsonObtenido esté definido
            this.generarFormulario(jsonObtenido);
        } else {
            console.error("No se pudo obtener el JSON."); // Manejo de error si no se obtiene el JSON
        }
    }

// Generamos el formulario dinámicamente según el JSON proporcionado
generarFormulario(jsonObtenido) {
    // Obtener el contenedor principal
    const container = document.createElement('div');
    container.classList.add('container');

    // Crear el título h1
    const titulo = document.createElement('h1');
    titulo.textContent = 'Nuevo JSON';
    container.appendChild(titulo);

    // Iterar sobre los campos del JSON y crear los elementos del formulario
    jsonObtenido.campos.forEach((campo) => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = campo.nombre + ':';

        // Según el tipo de campo, creamos el elemento correspondiente
        let inputElement;
        if (campo.tipo === 'texto') {
            inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
        } else if (campo.tipo === 'selección') {
            inputElement = document.createElement('select');
            campo.valores.forEach((valor) => {
                const option = document.createElement('option');
                option.setAttribute('value', valor);
                option.textContent = valor;
                inputElement.appendChild(option);
            });
        } else if (campo.tipo === 'opciones') {
            const fieldLabel = document.createElement('label'); // Agregar label para el campo "Modo"
            fieldLabel.textContent = campo.nombre + ':'; // Añadir nombre del campo
            container.appendChild(fieldLabel); // Agregar label al contenedor principal

            campo.valores.forEach((valor) => {
                const labelOption = document.createElement('label');
                const inputOption = document.createElement('input');
                inputOption.setAttribute('type', 'radio');
                inputOption.setAttribute('name', campo.nombre.toLowerCase());
                inputOption.setAttribute('value', valor);
                labelOption.appendChild(inputOption);
                labelOption.appendChild(document.createTextNode(' ' + valor));
                formGroup.appendChild(labelOption);
            });
            // No olvides agregar el formGroup al contenedor principal si el campo es de tipo "opciones"
            container.appendChild(formGroup);
            return; // Terminar la iteración aquí para evitar agregar el campo dos veces
        }

        // Agregar elementos al formulario
        inputElement.setAttribute('id', campo.nombre.toLowerCase());
        inputElement.setAttribute('name', campo.nombre.toLowerCase());
        if (campo.tipo !== 'selección') {
            inputElement.setAttribute('required', '');
        }
        formGroup.appendChild(label);
        formGroup.appendChild(inputElement);
        container.appendChild(formGroup);
    });

    // Crear el botón "Generar"
    const buttonGenerar = document.createElement('button');
    buttonGenerar.textContent = 'Generar';
    buttonGenerar.addEventListener('click', () => {
        // Llama a la función botongenerar cuando se hace clic en el botón
        this.botongenerar('formulario.json', this.obtenerDatosFormulario());
    });
    container.appendChild(buttonGenerar);

    // Agregar el contenedor al cuerpo del documento
    document.body.appendChild(container);
}


    // Obtener los datos del formulario y devolverlos como un objeto JSON
    obtenerDatosFormulario() {
        const formData = {};
        const formElements = document.querySelectorAll('input, select');
        formElements.forEach((element) => {
            formData[element.name] = element.value;
        });
        return JSON.stringify(formData, null, 2);
    }

    botongenerar(nombreFichero, texto) {
        const a = document.createElement('a')
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto))
        a.setAttribute('download', nombreFichero)
        a.style.display = 'none';
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
}