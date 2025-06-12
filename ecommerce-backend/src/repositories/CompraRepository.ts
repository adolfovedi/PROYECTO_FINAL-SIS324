import { AllCompraModel } from "../models/AllCompraModel";
import { DataBase } from "../config/turso";
import { CompraModel } from "../models/CompraModel";
import { format } from 'date-fns/format';

const getFormattedDateDatefns = (): string => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};

export class CompraRepository {
    static async createCompra(compra: CompraModel): Promise<CompraModel> {
        const newCompra = 'INSERT INTO Purchases (UserId, BookId, Quantity, Total, Date) VALUES (:user_id, :book_id, :cantidad, :total, :Fecha) RETURNING *';
        try {
            const result = await DataBase.execute({
                sql: newCompra,
                args: {
                    user_id: compra.user_id,
                    book_id: compra.book_id,
                    cantidad: compra.cantidad,
                    total: compra.total,
                    Fecha: getFormattedDateDatefns()
                },
            });
            const createdCompra = result.rows[0];

            return new CompraModel(
                Number(createdCompra.UserId),
                Number(createdCompra.BookId),
                Number(createdCompra.Quantity),
                Number(createdCompra.Total),
                String(createdCompra.Date),
                Number(createdCompra.Id)
            );
        } catch (error) {
            console.error('error al crear compra: repository', error);
            throw new Error('Error al crear compra repository');
        }
    }

    static async getComprasByUserId(userId: number): Promise<AllCompraModel[]> {
        const query = 'SELECT Title, SUM(Quantity) AS Quantity,SUM(Total) As Total FROM Purchases  INNER JOIN Books ON Books.id = Purchases.BookId WHERE UserId = :userId GROUP BY Title;';
        try {
            const result = await DataBase.execute({
                sql: query,
                args: {
                    userId,
                },
            });
            return result.rows.map(compra => new AllCompraModel(
                String(compra.Title),
                Number(compra.Quantity),
                Number(compra.Total),
            ));
        } catch (error) {
            console.error('error al obtener compras por usuario: repository', error);
            throw new Error('Error al obtener compras por usuario repository');
        }
    }
}