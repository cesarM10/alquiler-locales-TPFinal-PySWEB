import { Alquiler } from "../models/alquiler";
import { Cuota } from "../models/cuota";
import { Pago } from "../models/pago";

export class CuotaAlquilerPago {
    alquiler!: Alquiler;
    cuota!: Cuota;
    pago!: Array<Pago>;

    constructor(){
        this.alquiler = new Alquiler();
        this.cuota = new Cuota();
        this.pago = new Array<Pago>();
    }
}
