import { Rol } from "./rol";

export class Usuario {
    _id!: string;
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    telefono: number;
    password: string;
    activo: boolean;
    rol: Rol;

    constructor() {
        this.nombre = "";
        this.apellido = "";
        this.dni = 0;
        this.email = "";
        this.telefono = 0;
        this.password = "";
        this.activo = false;
        this.rol = new Rol();
    }
}
