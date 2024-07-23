export class Local {

    _id!:string;
    numeroLocal: string;
    superficie!:number;
    habilitado!:boolean;
    costoMes!: number;
    imagen!:string;
    alquilado!:boolean;
    usuario!: string;
    // constructor(){
    //     this.imagen = "/assets/images/productos/producto_nuevo.png"
    // }
    constructor(){
        this.numeroLocal = ""
        this.superficie = 0;
        this.habilitado = false;
        this.costoMes = 0;
        this.imagen = "";
        this.alquilado = false;
        this.usuario = "";
    }
    
    
}
