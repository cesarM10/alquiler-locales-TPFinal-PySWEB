import { Alquiler } from "../models/alquiler";
import { Cuota } from "../models/cuota";

export class CuotaAlquiler {
    alquiler!: Alquiler;
    cuota!: Array<Cuota>;

    constructor(){
        this.alquiler = new Alquiler();
        this.cuota = new Array<Cuota>();
    }
}
