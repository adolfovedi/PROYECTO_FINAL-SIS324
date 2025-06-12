export class AllCompraModel {
    Title: string;
    Quantity: number;
    Total: number;
    constructor(
        Title: string,
        Quantity: number,
        Total: number
    ) {
        this.Title = Title;
        this.Quantity = Quantity;
        this.Total = Total;
    }
}