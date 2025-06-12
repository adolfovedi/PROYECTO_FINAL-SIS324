import { CompraRepository } from "../repositories/CompraRepository";
import { CompraModel } from "../models/CompraModel";
import { AllCompraModel } from "../models/AllCompraModel";

export class CompraService {
    static async createCompra(User_Id: number, Book_Id: number, Cantidad: number, Total_amount: number): Promise<CompraModel> {
        if (!User_Id || !Book_Id || !Cantidad || !Total_amount) {
            throw new Error('Todos los campos son obligatorios');
        }
        try {
            const compra = new CompraModel(
                User_Id,
                Book_Id,
                Cantidad,
                Total_amount
            );
            const newCompra = await CompraRepository.createCompra(compra);
            return newCompra;
        } catch (error) {
            console.error('error al crear compra: service', error);
            throw new Error('Error al crear compra service');
        }
    }

    static async getComprasByUserId(userId: number): Promise<AllCompraModel[]> {
        return await CompraRepository.getComprasByUserId(userId);
    }
}