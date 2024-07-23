import { Local } from "./local";
import { Usuario } from "./usuario";

export class Alquiler {

    _id!: string;
    usuario: Usuario;
    local: Local;
    plazomes: number;
    costoalquiler: number;
    fechaAlquiler: string;
    
    constructor() {
        this.usuario = new Usuario();
        this.local = new Local();
        this.plazomes = 0;
        this.costoalquiler = 0;
        this.fechaAlquiler = "";
    }

}
