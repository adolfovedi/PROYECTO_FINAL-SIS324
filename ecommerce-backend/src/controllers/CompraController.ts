import { CompraService } from "../services/CompraService";
import { Request, Response } from "express";

export class CompraController {
    static async createCompra(req: Request, res: Response): Promise<void> {
        try {
            const { User_Id, Book_Id, Cantidad, Total_amount } = req.body;
            const newCompra = await CompraService.createCompra(User_Id, Book_Id, Cantidad, Total_amount);
            res.status(201).json({ compra: newCompra });
        } catch (error) {
            res.status(400).json({
                message: "Error al crear la compra controller" + error
            });
        }
    }
    static async getComprasByUserId(req: Request, res: Response): Promise<void> {
        try{
            const userId = Number(req.params.userId);
            const compras = await CompraService.getComprasByUserId(userId);
            res.json(compras);
        }catch(error){
            res.status(400).json({
                message: "Error al obtener las compras controller -> " + error
            });
        }
    }
}