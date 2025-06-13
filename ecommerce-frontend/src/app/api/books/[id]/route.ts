import { NextRequest, NextResponse } from 'next/server';

// Datos de ejemplo (reemplaza con tu base de datos)
const books = [
  {
    id: '1',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    description: 'Una hermosa historia sobre la amistad, el amor y la búsqueda del sentido de la vida.',
    price: 15.99,
    image: '/images/principito.jpg'
  },
  {
    id: '2',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    description: 'La obra maestra del realismo mágico que narra la historia de la familia Buendía.',
    price: 22.50,
    image: '/images/cien-anos.jpg'
  }
  // Agrega más libros según necesites
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Buscar el libro por ID
    const book = books.find(b => b.id === id);
    
    if (!book) {
      return NextResponse.json(
        { error: 'Libro no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}