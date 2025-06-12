export class CompraModel {
    id?: number;
    Fecha_compra?: string;
    user_id: number;
    book_id: number;
    cantidad: number;
    total: number;
    constructor(
        user_id: number,
        book_id: number,
        cantidad: number,
        total: number,
        Fecha_compra?: string,
        id?: number,
    ) {
        this.id = id;
        this.user_id = user_id;
        this.book_id = book_id;
        this.Fecha_compra = Fecha_compra;
        this.cantidad = cantidad;
        this.total = total;
    }
}