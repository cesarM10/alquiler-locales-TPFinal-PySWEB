export class Propietario {

    _id!: string;
    apellido: string;
    nombres: string;
    dni: number;
    email: string;
    telefono: number;

    constructor() {
        this.apellido = "";
        this.nombres = "";
        this.dni = 0;
        this.email = "";
        this.telefono = 0;
    }
}
