export class Pago {
    _id!: string;
    cuota: string;
    importe: number;
    fechaPago: Date;
    metodoPago: string;
    
    constructor() {
        this.cuota = "";
        this.importe = 0;
        this.fechaPago = new Date();
        this.metodoPago = "";
    }

}
