import { Local } from "./local";

export class Promocion {
    _id!: string;
    local: Local;
    imagen: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    usuario: string;

    constructor(){
        this.local = new Local();
        this.imagen = "";
        this.descripcion = "";
        this.fechaInicio = "";
        this.fechaFin = "";
        this.usuario = "";
    }
}
