export class Vista {
    static {
        Vista.VistaEditor = Symbol('Editor')
    }

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
    }

    mostrar(ver) {
        if (ver)
            this.base.style.display = 'flex'
        else 
            this.base.style.display = 'none'
    }
}