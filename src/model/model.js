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
            { "nombre": "Preguntas", "tipo": "especial", "elementos": [ { "tipo": "selección", "valores": ["Texto", "Área"] }, { "tipo": "botón", "funcionalidad": "añadir"} ] }
        ]}
    }

    // getPregunta() {
    //     return {"":[

    //     ]}
    // }
}