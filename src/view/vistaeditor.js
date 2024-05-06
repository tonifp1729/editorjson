import { Vista } from "./vista.js";
import { Modelo } from "../model/model.js";

export class Editor extends Vista {
    constructor(controlador, base) {
        // Llama al constructor de la clase padre (Vista)
        super(controlador, base);
        
        // Crear una instancia del modelo con el JSON de ejemplo
        const modelo = new Modelo(); // Pasa el JSON al modelo
        // Obtener ambos JSON del modelo
        const jsonCabecera = modelo.getCabecera();
        const jsonPreguntas = modelo.getPregunta();

        //Llamamos al método de la vista para generar el formulario dinámicamente
        if (jsonCabecera && jsonPreguntas) { // Verifica que ambos JSON estén definidos
            this.generarFormulario(jsonCabecera, jsonPreguntas); // Pasamos ambos JSON a la función
        } else {
            console.error("No se pudo obtener el JSON."); // Manejo de error si no se obtiene algún JSON
        }
    }

    // Generamos el formulario dinámicamente según el JSON proporcionado
    generarFormulario(jsonCabecera, jsonPreguntas) {
        // Obtener el contenedor principal
        const container = document.createElement('div');
        container.classList.add('container');

        // Crear el título h1
        const titulo = document.createElement('h1');
        titulo.textContent = 'Nuevo JSON';
        container.appendChild(titulo);

        // Iterar sobre los campos del JSON de la cabecera y crear los elementos del formulario
        jsonCabecera.campos.forEach((campo) => {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');

            const label = document.createElement('label');
            label.textContent = campo.nombre + ':';

            // Según el tipo de campo, creamos el elemento correspondiente
            if (campo.tipo === 'texto') {
                const inputElement = document.createElement('input');
                inputElement.setAttribute('type', 'text');
                inputElement.setAttribute('id', campo.nombre.toLowerCase());
                inputElement.setAttribute('name', campo.nombre.toLowerCase());
                inputElement.setAttribute('required', '');
                formGroup.appendChild(label);
                formGroup.appendChild(inputElement);
            } else if (campo.tipo === 'selección') {
                const inputElement = document.createElement('select');
                campo.valores.forEach((valor) => {
                    const option = document.createElement('option');
                    option.setAttribute('value', valor);
                    option.textContent = valor;
                    inputElement.appendChild(option);
                });
                inputElement.setAttribute('id', campo.nombre.toLowerCase());
                inputElement.setAttribute('name', campo.nombre.toLowerCase());
                formGroup.appendChild(label);
                formGroup.appendChild(inputElement);
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
            } else if (campo.tipo === 'especial') {
                const selectElement = document.createElement('select');
                campo.elementos[0].valores.forEach((valor) => {
                    const option = document.createElement('option');
                    option.setAttribute('value', valor);
                    option.textContent = valor;
                    selectElement.appendChild(option);
                });
                selectElement.setAttribute('id', campo.nombre.toLowerCase());
                selectElement.setAttribute('name', campo.nombre.toLowerCase());
                formGroup.appendChild(label);
                formGroup.appendChild(selectElement);

                const addButton = document.createElement('button');
                addButton.textContent = campo.elementos[1].texto;
                addButton.addEventListener('click', () => {
                    //AQUÍ VA LA FUNCIÓN QUE DEBE INTRODUCIR EL NUEVO CÓDIGO
                    this.botonAgregarPregunta(jsonPreguntas); // Pasamos el JSON de preguntas como argumento
                });
                formGroup.appendChild(addButton);
            }

            //Agregar formGroup al contenedor principal
            container.appendChild(formGroup);
        });

        // Crear el contenedor para las preguntas
        const preguntasContainer = document.createElement('div');
        preguntasContainer.setAttribute('id', 'preguntasContainer');
        container.appendChild(preguntasContainer);

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

    botonAgregarPregunta(jsonPreguntas) {
        // Obtener el tipo de pregunta seleccionado
        const modalidadSelect = document.getElementById('preguntas').value;
    
        // Verificar si la modalidad seleccionada no es "--SELECCIONAR"
        if (modalidadSelect !== '--SELECCIONAR') {
            // Obtener el contenedor donde se agregarán los campos de la nueva pregunta
            const preguntasContainer = document.getElementById('preguntasContainer');
    
            // Crear un div para contener los campos de la nueva pregunta
            const nuevaPreguntaDiv = document.createElement('div');
            nuevaPreguntaDiv.classList.add('nueva-pregunta');
    
            // Iterar sobre la configuración de preguntas del modelo
            jsonPreguntas.preguntas.forEach((preguntaConfig) => {
                if (preguntaConfig.modalidad === modalidadSelect) {
                    // Crear los campos de la nueva pregunta según la configuración
                    preguntaConfig.campos.forEach((campoConfig) => {
                        const label = document.createElement('label');
                        label.textContent = campoConfig.nombre + ':';
    
                        let inputElement;
                        if (campoConfig.tipo === 'texto') {
                            inputElement = document.createElement('input');
                            inputElement.setAttribute('type', 'text');
                            inputElement.setAttribute('name', campoConfig.nombre.toLowerCase()); // Agregar nombre al campo
                        } else if (campoConfig.tipo === 'area') {
                            inputElement = document.createElement('textarea');
                            inputElement.setAttribute('name', campoConfig.nombre.toLowerCase()); // Agregar nombre al campo
                        } else if (campoConfig.tipo === 'number') {
                            inputElement = document.createElement('input');
                            inputElement.setAttribute('type', 'number');
                            inputElement.setAttribute('name', campoConfig.nombre.toLowerCase()); // Agregar nombre al campo
                        }
    
                        // Agregar los campos al div de la nueva pregunta
                        nuevaPreguntaDiv.appendChild(label);
                        nuevaPreguntaDiv.appendChild(inputElement);
                    });
                }
            });
    
            // Crear el botón "-" para eliminar la pregunta
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-';
            deleteButton.addEventListener('click', () => {
                preguntasContainer.removeChild(nuevaPreguntaDiv); // Eliminar la pregunta al hacer clic en el botón "-"
            });
            nuevaPreguntaDiv.appendChild(deleteButton); // Agregar el botón "-" al div de la nueva pregunta
    
            // Agregar la nueva pregunta al contenedor de preguntas
            preguntasContainer.appendChild(nuevaPreguntaDiv);
        }
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

    botongenerar(nombreFichero) {
        // Obtener todas las preguntas
        const preguntas = document.querySelectorAll('.nueva-pregunta');
    
        // Array para almacenar los datos de las preguntas
        const preguntasData = [];
    
        // Iterar sobre cada pregunta y obtener sus datos
        preguntas.forEach((pregunta) => {
            const preguntaData = {};
    
            // Obtener todos los campos de la pregunta
            const campos = pregunta.querySelectorAll('input, textarea, select');
    
            // Iterar sobre cada campo y agregarlo a los datos de la pregunta
            campos.forEach((campo) => {
                // Ignorar campos vacíos o que no tienen nombre
                if (campo.name && campo.value) {
                    preguntaData[campo.name] = campo.value;
                }
            });
    
            // Agregar los datos de la pregunta al array de preguntas
            preguntasData.push(preguntaData);
        });
    
        // Convertir el array de preguntas a formato JSON
        const jsonPreguntas = JSON.stringify(preguntasData, null, 2);
    
        // Crear el enlace de descarga con el JSON de las preguntas
        const a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonPreguntas));
        a.setAttribute('download', nombreFichero);
        a.style.display = 'none';
    
        // Agregar el enlace al cuerpo del documento y simular un clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();
    
        // Eliminar el enlace del cuerpo del documento después de la descarga
        document.body.removeChild(a);
    }    
}