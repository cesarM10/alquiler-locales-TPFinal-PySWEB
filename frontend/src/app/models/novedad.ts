import { Local } from "./local";
import { Usuario } from "./usuario";

export class Novedad {
    _id!: string;
    local: Local;
    usuario: Usuario;
    texto: string;
    estado: string;

    constructor(){
        this.local = new Local();
        this.usuario = new Usuario();
        this.texto = '';
        this.estado = '';
    }
}
