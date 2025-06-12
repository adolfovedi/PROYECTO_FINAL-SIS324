import { Router } from "express";
// controladores
import { UserController } from "../controllers/UserController";
import { BookController } from "../controllers/BookController";
import { CompraController } from "../controllers/CompraController";
// middleware
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";

const router = Router();

// rutas de usuario
//crear usuario
router.post('/user', UserController.createUser);
// traer usuario por username
router.get('/user/:username',authenticateToken,UserController.getbyUsername);
// traer todos los usuarios
router.get('/users', authenticateToken, authorizeAdmin, UserController.getAllUser);
// actualizar usuario
router.put('/user/:username',authenticateToken, UserController.UpdateData.bind(UserController));
// eliminar usuario
router.delete('/user/:username',authenticateToken, UserController.deleteByUsername);
// login
router.post('/login', UserController.Login);

// rutas de Libros
//crear libro
router.post('/book', BookController.createBook);
// traer libro por Id
router.get('/book/:id', BookController.getBookById);
// traer todos los libros
router.get('/books', BookController.getAllBooks);
// actualizar libro
router.put('/book/:id', BookController.updateData);
// eliminar libro
router.delete('/book/:id', BookController.deleteBook);

// rutas de compras
// crear compra
router.post('/compra', CompraController.createCompra);
// traer compras por usuario
router.get('/compras/:userId', CompraController.getComprasByUserId);


export default router;