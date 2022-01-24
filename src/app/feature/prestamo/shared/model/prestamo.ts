export class Prestamo {
    id: number;
    fechaPago: string;
    valorPrestamo: number;
    persona: number;
    estadoPrestamoPago: boolean;

    constructor(id: number, fechaPago: string, valorPrestamo: number, persona: number, estadoPrestamoPago: boolean) {
        this.id = id;
        this.fechaPago = fechaPago;
        this.valorPrestamo = valorPrestamo;
        this.persona = persona;
        this.estadoPrestamoPago = estadoPrestamoPago;
    }
}
