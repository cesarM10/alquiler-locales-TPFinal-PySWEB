export class Cuota {
    _id!: string;
    alquiler: string;
    montoPago: number;
    estadoPago: string;
    mesPago: number;
    anioPago: number;
    idMercadoPago: String;
    
    constructor() {
        this.alquiler = "";
        this.montoPago = 0;
        this.estadoPago = "";
        this.mesPago = 0;
        this.idMercadoPago = "";
        this.anioPago = 0;
    }

}
