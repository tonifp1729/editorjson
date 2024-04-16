export class Modelo {
    constructor(jsonEditor) {
        this.jsonEditor = jsonEditor;
    }

    //Devolvemos el JSON
    getJSON() {
        return {"campos":[ 
            { "nombre":"Curso", "tipo":"selección", "valores":[ "--SELECCIONAR", "1DAW", "2DAW" ] },
            { "nombre":"Otra Cosa", "tipo":"texto" },
            { "nombre":"Modo", "tipo":"opciones", "valores":[ "entranamiento", "examen" ] }
        ]}
    }
}