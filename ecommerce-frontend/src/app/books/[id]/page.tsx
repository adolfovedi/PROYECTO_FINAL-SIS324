'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Interfaz para el tipo de libro
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

// Datos de libros (normalmente vendrían de una API)
const booksData: Book[] = [
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "Una obra maestra de la literatura americana sobre la era del jazz y el sueño americano. Una historia de amor, traición y la búsqueda del sueño americano en los años 20.",
    "price": 15.99,
    "stock": 25,
    "category": "1",
    "imageUrl": "/images/gatsby.jpg"
  },
  {
    "id": 2,
    "title": "The Great Adventure",
    "author": "John Doe",
    "description": "Una épica aventura en mundos fantásticos llenos de magia y misterio. Sigue la historia de un joven héroe en su búsqueda para salvar su reino.",
    "price": 18.99,
    "stock": 30,
    "category": "2",
    "imageUrl": "/images/adventure.jpg"
  },
  {
    "id": 3,
    "title": "El principito",
    "author": "Antoine de Saint-Exupéry",
    "description": "Un clásico cuento sobre la amistad, el amor y la naturaleza humana. Una historia filosófica contada a través de los ojos de un niño de otro planeta.",
    "price": 12.99,
    "stock": 40,
    "category": "3",
    "imageUrl": "/images/principito.jpg"
  },
  {
    "id": 4,
    "title": "El dilema de los innovadores",
    "author": "Clayton M. Christensen",
    "description": "Análisis sobre cómo las tecnologías disruptivas cambian los mercados y por qué las grandes empresas fallan ante la innovación.",
    "price": 22.99,
    "stock": 15,
    "category": "4",
    "imageUrl": "/images/innovadores.jpg"
  },
  {
    "id": 5,
    "title": "La Cuarta Revolución Industrial",
    "author": "Klaus Schwab",
    "description": "Exploración del impacto de las nuevas tecnologías como la inteligencia artificial, la robótica y el Internet de las cosas en la sociedad moderna.",
    "price": 19.99,
    "stock": 20,
    "category": "4",
    "imageUrl": "/images/cuarta-revolucion.jpg"
  },
  {
    "id": 6,
    "title": "Atomic Habits",
    "author": "James Clear",
    "description": "Métodos probados para crear buenos hábitos y eliminar los malos. Una guía práctica para mejorar tu vida mediante pequeños cambios consistentes.",
    "price": 16.99,
    "stock": 35,
    "category": "5",
    "imageUrl": "/images/atomic-habits.jpg"
  },
  {
    "id": 7,
    "title": "Sapiens",
    "author": "Yuval Noah Harari",
    "description": "Una breve historia de la humanidad desde la Edad de Piedra hasta la actualidad. Explora cómo los humanos llegaron a dominar el mundo.",
    "price": 24.99,
    "stock": 28,
    "category": "6",
    "imageUrl": "/images/sapiens.jpg"
  },
  {
    "id": 8,
    "title": "The Hustle",
    "author": "Neil Patel",
    "description": "Estrategias de marketing digital y emprendimiento en la era moderna. Aprende cómo construir un negocio exitoso desde cero.",
    "price": 21.99,
    "stock": 18,
    "category": "7",
    "imageUrl": "/images/hustle.jpg"
  },
  {
    "id": 9,
    "title": "1984",
    "author": "George Orwell",
    "description": "Una novela distópica sobre el totalitarismo y la vigilancia. Una advertencia sobre los peligros del control gubernamental absoluto.",
    "price": 18.5,
    "stock": 32,
    "category": "8",
    "imageUrl": "/images/1984.jpg"
  },
  {
    "id": 10,
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "description": "La obra cumbre del realismo mágico latinoamericano. La historia de la familia Buendía a lo largo de siete generaciones.",
    "price": 22.99,
    "stock": 22,
    "category": "1",
    "imageUrl": "/images/cien-anos.jpg"
  },
  {
    "id": 11,
    "title": "Think and Grow Rich",
    "author": "Napoleon Hill",
    "description": "Los principios del éxito basados en el estudio de los hombres más ricos de América. Una guía clásica para lograr el éxito financiero.",
    "price": 17.99,
    "stock": 26,
    "category": "5",
    "imageUrl": "/images/think-grow-rich.jpg"
  },
  {
    "id": 12,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "description": "Una guía para escribir código limpio y mantenible. Principios fundamentales para cualquier programador profesional.",
    "price": 29.99,
    "stock": 12,
    "category": "4",
    "imageUrl": "/images/clean-code.jpg"
  },
  {
    "id": 13,
    "title": "The Power of Now",
    "author": "Eckhart Tolle",
    "description": "Una guía espiritual para vivir en el presente. Descubre cómo encontrar la paz interior y la iluminación espiritual.",
    "price": 16.5,
    "stock": 24,
    "category": "9",
    "imageUrl": "/images/power-now.jpg"
  },
  {
    "id": 14,
    "title": "Harry Potter y la Piedra Filosofal",
    "author": "J.K. Rowling",
    "description": "El inicio de la saga más famosa de fantasía moderna. La historia de un niño mago que descubre su verdadero destino.",
    "price": 19.99,
    "stock": 45,
    "category": "2",
    "imageUrl": "/images/harry-potter.jpg"
  },
  {
    "id": 15,
    "title": "El código Da Vinci",
    "author": "Dan Brown",
    "description": "Un thriller de misterio que combina arte, historia y religión. Una búsqueda frenética por descubrir secretos ocultos durante siglos.",
    "price": 20.99,
    "stock": 19,
    "category": "10",
    "imageUrl": "/images/da-vinci.jpg"
  }
];

// Mapeo de categorías para mostrar nombres legibles
const categoryNames: { [key: string]: string } = {
  "1": "Literatura Clásica",
  "2": "Fantasía y Aventura",
  "3": "Infantil y Juvenil",
  "4": "Tecnología y Negocios",
  "5": "Desarrollo Personal",
  "6": "Historia",
  "7": "Marketing y Emprendimiento",
  "8": "Ciencia Ficción",
  "9": "Espiritualidad",
  "10": "Misterio y Thriller"
};

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Obtener el ID desde los parámetros dinámicos de la URL
  const bookId = params.id as string;
  const currentBookId = bookId ? parseInt(bookId, 10) : 1;
  
  // Estados del componente
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para buscar libro por ID
  const findBookById = (id: number): Book | null => {
    return booksData.find(book => book.id === id) || null;
  };

  // Efecto para cargar los datos del libro
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundBook = findBookById(currentBookId);
        
        if (foundBook) {
          setBook(foundBook);
          setError(null);
        } else {
          setError('Libro no encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(currentBookId)) {
      fetchBook();
    }
  }, [currentBookId]);

  // Función para manejar la navegación
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Función para cambiar de libro (para demostración)
  const handleBookChange = (bookId: number) => {
    router.push(`/books/${bookId}`);
  };

  // Estados de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-amber-600 flex justify-center items-center">
        <div className="text-2xl text-white">Cargando libro...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-amber-600 flex justify-center items-center">
        <div className="text-red-800 text-2xl">Error: {error}</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-amber-600 flex justify-center items-center">
        <div className="text-2xl text-white">Libro no encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-amber-600">
      {/* Header Navigation */}
      <header className="bg-amber-500 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex justify-center flex-1">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <div className="text-center">
                  <div className="text-red-600 font-bold text-lg">📚</div>
                  <div className="text-xs text-gray-600">BOOKSTORE</div>
                  <div className="text-xs text-gray-500">ONLINE SHOP</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="mt-4">
            <div className="flex justify-center space-x-12">
              <button 
                onClick={() => handleNavigation('/')}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer transition duration-200 bg-transparent border-none"
              >
                <span className="text-xl">🏠</span>
                <span className="font-medium">Inicio</span>
              </button>
              <button 
                onClick={() => handleNavigation('/productos')}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer transition duration-200 bg-transparent border-none"
              >
                <span className="text-xl">🛍️</span>
                <span className="font-medium">Productos</span>
              </button>
              <button 
                onClick={() => handleNavigation('/recomendados')}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer transition duration-200 bg-transparent border-none"
              >
                <span className="text-xl">✅</span>
                <span className="font-medium">Recomendados</span>
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-200">
                Iniciar Sesión
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Selector de libros para demostración */}
      <div className="bg-amber-400 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-gray-700 font-medium mr-4">Cambiar libro:</span>
            {booksData.slice(0, 8).map((bookItem) => (
              <button
                key={bookItem.id}
                onClick={() => handleBookChange(bookItem.id)}
                className={`px-3 py-1 rounded text-sm transition duration-200 ${
                  currentBookId === bookItem.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {bookItem.title.length > 20 ? bookItem.title.substring(0, 20) + '...' : bookItem.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Botón para volver atrás */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 cursor-pointer transition duration-200 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Volver</span>
          </button>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 max-w-6xl">
            {/* Book Image */}
            <div className="flex-shrink-0">
              {/* Aquí se va a renderizar la imagen del libro o el placeholder */}
              <div className="w-64 h-80 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden">
                {book.imageUrl ? ( // Si existe una URL de imagen para el libro
                  <img
                    src={book.imageUrl} // Usa la URL de la imagen del libro
                    alt={`Portada de ${book.title}`} // Texto alternativo para accesibilidad
                    className="w-full h-full object-cover rounded-lg" // Asegura que la imagen se adapte y cubra el contenedor
                  />
                ) : (
                  // Si no hay imageUrl, muestra el icono de libro genérico
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">📖</div>
                    <div className="text-sm font-medium px-4">
                      {book.title}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Book Details */}
            <div className="text-left space-y-6 max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">
                {book.title}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-700 font-medium">
                {book.author}
              </p>
              
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                {book.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-lg text-gray-700">
                  <span className="font-medium">Categoría: </span>
                  <span>{categoryNames[book.category] || 'General'}</span>
                </div>
                
                <div className="text-lg text-gray-700">
                  <span className="font-medium">Stock disponible: </span>
                  <span className={book.stock > 10 ? 'text-green-600' : book.stock > 0 ? 'text-orange-600' : 'text-red-600'}>
                    {book.stock > 0 ? `${book.stock} unidades` : 'Agotado'}
                  </span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-gray-800">
                Bs. {book.price.toFixed(2)}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className={`px-8 py-3 rounded-lg font-medium text-lg transition duration-200 shadow-lg ${
                    book.stock > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  disabled={book.stock === 0}
                >
                  {book.stock > 0 ? 'Iniciar sesión para comprar' : 'Producto agotado'}
                </button>
                
                <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-amber-700 transition duration-200 shadow-lg">
                  Agregar a favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-600 text-white py-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-white">Contáctanos</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center space-x-2">
                  <span className="text-red-400">📍</span>
                  <span>Dirección: Calle Ficticia #123, Ciudad</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-yellow-400">📞</span>
                  <span>Teléfono: +591 4 1234 5678</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-blue-400">📧</span>
                  <span>Email: contacto@tu-tienda.com</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-white">Enlaces Rápidos</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <button 
                    onClick={() => handleNavigation('/')}
                    className="hover:underline text-white cursor-pointer transition duration-200 bg-transparent border-none p-0 text-left"
                  >
                    Inicio
                  </button>
                </p>
                <p>
                  <button 
                    onClick={() => handleNavigation('/productos')}
                    className="hover:underline text-white cursor-pointer transition duration-200 bg-transparent border-none p-0 text-left"
                  >
                    Productos
                  </button>
                </p>
                <p>
                  <button 
                    onClick={() => handleNavigation('/recomendados')}
                    className="hover:underline text-white cursor-pointer transition duration-200 bg-transparent border-none p-0 text-left"
                  >
                    Recomendamos
                  </button>
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-white">Síguenos</h3>
              <div className="flex space-x-3">
                <button 
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition duration-200 text-white font-bold text-sm cursor-pointer"
                >
                  f
                </button>
                <button 
                  onClick={() => window.open('https://twitter.com', '_blank')}
                  className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition duration-200 text-white font-bold text-sm cursor-pointer"
                >
                  t
                </button>
                <button 
                  onClick={() => window.open('https://instagram.com', '_blank')}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition duration-200 text-white font-bold text-xs cursor-pointer"
                >
                  ig
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-500 mt-6 pt-4 text-center">
            <p className="text-sm">&copy; 2025 Tu Tienda de Libros. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}