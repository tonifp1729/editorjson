import { Vista } from "./vista.js";
import { Modelo } from "../model/model.js";

export class Editor extends Vista {
    constructor(controlador, base) {
        // Llama al constructor de la clase padre (Vista)
        super(controlador, base);
        
        // Crear una instancia del modelo con el JSON de ejemplo
        const modelo = new Modelo(); // Pasa el JSON al modelo

        //Obtenemos el JSON utilizando el método getJSON() presente en el modelo
        const jsonObtenido = modelo.getJSON();

        //Llamamos al método de la vista para generar el formulario dinámicamente
        if (jsonObtenido) { // Verifica que jsonObtenido esté definido
            this.generarFormulario(jsonObtenido);
        } else {
            console.error("No se pudo obtener el JSON."); // Manejo de error si no se obtiene el JSON
        }
    }

    //Generamos el formulario
    generarFormulario(jsonObtenido) {
        // Obtener el contenedor principal
        const container = document.createElement('div');
        container.classList.add('container');

        // Crear el título h1
        const titulo = document.createElement('h1');
        titulo.textContent = 'Nuevo JSON';
        container.appendChild(titulo);

        // Crear el primer grupo de formulario para el título
        const formGroupTitulo = document.createElement('div');
        formGroupTitulo.classList.add('form-group');
        const labelTitulo = document.createElement('label');
        labelTitulo.setAttribute('for', 'titulo');
        labelTitulo.textContent = 'Título:';
        const inputTitulo = document.createElement('input');
        inputTitulo.setAttribute('type', 'text');
        inputTitulo.setAttribute('id', 'titulo');
        inputTitulo.setAttribute('name', 'titulo');
        inputTitulo.setAttribute('required', '');
        formGroupTitulo.appendChild(labelTitulo);
        formGroupTitulo.appendChild(inputTitulo);
        container.appendChild(formGroupTitulo);

        // Crear el segundo grupo de formulario para el curso
        const formGroupCurso = document.createElement('div');
        formGroupCurso.classList.add('form-group');
        const labelCurso = document.createElement('label');
        labelCurso.setAttribute('for', 'curso');
        labelCurso.textContent = 'Curso:';
        const selectCurso = document.createElement('select');
        selectCurso.setAttribute('id', 'curso');
        selectCurso.setAttribute('name', 'curso');
        selectCurso.setAttribute('required', '');
        const optionCursoDefault = document.createElement('option');
        optionCursoDefault.setAttribute('value', '');
        optionCursoDefault.textContent = 'Selecciona un curso';
        const option1DAW = document.createElement('option');
        option1DAW.setAttribute('value', '1DAW');
        option1DAW.textContent = '1DAW';
        const option2DAW = document.createElement('option');
        option2DAW.setAttribute('value', '2DAW');
        option2DAW.textContent = '2DAW';
        selectCurso.appendChild(optionCursoDefault);
        selectCurso.appendChild(option1DAW);
        selectCurso.appendChild(option2DAW);
        formGroupCurso.appendChild(labelCurso);
        formGroupCurso.appendChild(selectCurso);
        container.appendChild(formGroupCurso);

        // Crear el tercer grupo de formulario para el modo
        const formGroupModo = document.createElement('div');
        formGroupModo.classList.add('form-group');
        const labelModo = document.createElement('label');
        labelModo.textContent = 'Modo:';
        const labelEntrenamiento = document.createElement('label');
        const inputEntrenamiento = document.createElement('input');
        inputEntrenamiento.setAttribute('type', 'radio');
        inputEntrenamiento.setAttribute('id', 'entrenamiento');
        inputEntrenamiento.setAttribute('name', 'modo');
        inputEntrenamiento.setAttribute('value', 'entrenamiento');
        inputEntrenamiento.setAttribute('required', '');
        labelEntrenamiento.appendChild(inputEntrenamiento);
        labelEntrenamiento.appendChild(document.createTextNode(' Entrenamiento'));
        const labelExamen = document.createElement('label');
        const inputExamen = document.createElement('input');
        inputExamen.setAttribute('type', 'radio');
        inputExamen.setAttribute('id', 'examen');
        inputExamen.setAttribute('name', 'modo');
        inputExamen.setAttribute('value', 'examen');
        inputExamen.setAttribute('required', '');
        labelExamen.appendChild(inputExamen);
        labelExamen.appendChild(document.createTextNode(' Examen'));
        formGroupModo.appendChild(labelModo);
        formGroupModo.appendChild(labelEntrenamiento);
        formGroupModo.appendChild(labelExamen);
        container.appendChild(formGroupModo);

        // Crear el botón "Generar"
        const buttonGenerar = document.createElement('button');
        buttonGenerar.textContent = 'Generar';
        container.appendChild(buttonGenerar);

        // Agregar el contenedor al cuerpo del documento
        document.body.appendChild(container);
    }

    // botongenerar(nombreFichero, texto) {
    //     const a = document.createElement('a')
    //     a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto))
    //     a.setAttribute('download', nombreFichero)
    //     a.style.display = 'none';
    //     document.body.appendChild(a)
    //     a.click()
    //     document.body.removeChild(a)
    // }
}