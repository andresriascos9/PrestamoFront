export class Abono {
    id: number;
    fechaAbono: string;
    valorAbono: number;
    prestamo: number;

    constructor(id: number, fechaAbono: string, valorAbono: number, prestamo: number) {
        this.id = id;
        this.fechaAbono = fechaAbono;
        this.valorAbono = valorAbono;
        this.prestamo = prestamo;
    }

}