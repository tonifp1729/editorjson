export class Modelo {
    constructor(jsonEditor) {
        this.jsonEditor = jsonEditor;
    }

    //Devolvemos el JSON
    getCabecera() {
        return {"campos":[ 
            { "nombre":"Título", "tipo":"texto" },
            { "nombre":"Curso", "tipo":"selección", "valores":[ "--SELECCIONAR", "1DAW", "2DAW" ] },
            { "nombre":"Modo", "tipo":"opciones", "valores":[ "entranamiento", "examen" ] },
            { "nombre": "Preguntas", "tipo": "especial", "elementos": [{ "tipo": "selección", "valores": ["--SELECCIONAR","Texto", "Área"] }, { "tipo": "botón", "texto": "+"}]}
        ]}
    }

    getPregunta() {
        return {"preguntas":[
            { "modalidad": "Texto", "campos": [{ "nombre": "Pregunta", "tipo": "texto" }, { "nombre": "Respuesta", "tipo": "texto" }, { "nombre": "Puntos", "tipo": "number" }]},
            { "modalidad": "Área", "campos": [{ "nombre": "Pregunta", "tipo": "texto" }, { "nombre": "Respuesta", "tipo": "area" }, { "nombre": "Puntos", "tipo": "number" }]}
        ]}
    }
}