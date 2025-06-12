-- Estructura de tablas (ya tienes esto)
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    UserName TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    Role TEXT CHECK (Role IN ('admin', 'user')) DEFAULT 'user'
);

CREATE TABLE Categories (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL UNIQUE
);

CREATE TABLE Books (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Author TEXT NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INTEGER NOT NULL,
    ImageUrl TEXT,
    Category INTEGER,
    FOREIGN KEY (Category) REFERENCES Categories(Id)
);

CREATE TABLE Purchases (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    BookId INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    Date TEXT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (BookId) REFERENCES Books(Id)
);

-- INSERTAR CATEGORÍAS
INSERT OR IGNORE INTO Categories (Id, Name) VALUES
(1, 'Classic Literature'),
(2, 'Fantasy'),
(3, 'Romance'),
(4, 'Technology'),
(5, 'Self-Help'),
(6, 'History'),
(7, 'Business'),
(8, 'Science Fiction'),
(9, 'Philosophy'),
(10, 'Mystery');

-- INSERTAR LIBROS
INSERT OR IGNORE INTO Books (Id, Title, Author, Description, Price, Stock, ImageUrl, Category) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Una obra maestra de la literatura americana sobre la era del jazz y el sueño americano. Una historia de amor, traición y la búsqueda del sueño americano en los años 20.', 15.99, 25, '/images/gatsby.jpg', 1),

(2, 'The Great Adventure', 'John Doe', 'Una épica aventura en mundos fantásticos llenos de magia y misterio. Sigue la historia de un joven héroe en su búsqueda para salvar su reino.', 18.99, 30, '/images/adventure.jpg', 2),

(3, 'El principito', 'Antoine de Saint-Exupéry', 'Un clásico cuento sobre la amistad, el amor y la naturaleza humana. Una historia filosófica contada a través de los ojos de un niño de otro planeta.', 12.99, 40, '/images/principito.jpg', 3),

(4, 'El dilema de los innovadores', 'Clayton M. Christensen', 'Análisis sobre cómo las tecnologías disruptivas cambian los mercados y por qué las grandes empresas fallan ante la innovación.', 22.99, 15, '/images/innovadores.jpg', 4),

(5, 'La Cuarta Revolución Industrial', 'Klaus Schwab', 'Exploración del impacto de las nuevas tecnologías como la inteligencia artificial, la robótica y el Internet de las cosas en la sociedad moderna.', 19.99, 20, '/images/cuarta-revolucion.jpg', 4),

(6, 'Atomic Habits', 'James Clear', 'Métodos probados para crear buenos hábitos y eliminar los malos. Una guía práctica para mejorar tu vida mediante pequeños cambios consistentes.', 16.99, 35, '/images/atomic-habits.jpg', 5),

(7, 'Sapiens', 'Yuval Noah Harari', 'Una breve historia de la humanidad desde la Edad de Piedra hasta la actualidad. Explora cómo los humanos llegaron a dominar el mundo.', 24.99, 28, '/images/sapiens.jpg', 6),

(8, 'The Hustle', 'Neil Patel', 'Estrategias de marketing digital y emprendimiento en la era moderna. Aprende cómo construir un negocio exitoso desde cero.', 21.99, 18, '/images/hustle.jpg', 7),

(9, '1984', 'George Orwell', 'Una novela distópica sobre el totalitarismo y la vigilancia. Una advertencia sobre los peligros del control gubernamental absoluto.', 18.50, 32, '/images/1984.jpg', 8),

(10, 'Cien años de soledad', 'Gabriel García Márquez', 'La obra cumbre del realismo mágico latinoamericano. La historia de la familia Buendía a lo largo de siete generaciones.', 22.99, 22, '/images/cien-anos.jpg', 1),

(11, 'Think and Grow Rich', 'Napoleon Hill', 'Los principios del éxito basados en el estudio de los hombres más ricos de América. Una guía clásica para lograr el éxito financiero.', 17.99, 26, '/images/think-grow-rich.jpg', 5),

(12, 'Clean Code', 'Robert C. Martin', 'Una guía para escribir código limpio y mantenible. Principios fundamentales para cualquier programador profesional.', 29.99, 12, '/images/clean-code.jpg', 4),

(13, 'The Power of Now', 'Eckhart Tolle', 'Una guía espiritual para vivir en el presente. Descubre cómo encontrar la paz interior y la iluminación espiritual.', 16.50, 24, '/images/power-now.jpg', 9),

(14, 'Harry Potter y la Piedra Filosofal', 'J.K. Rowling', 'El inicio de la saga más famosa de fantasía moderna. La historia de un niño mago que descubre su verdadero destino.', 19.99, 45, '/images/harry-potter.jpg', 2),

(15, 'El código Da Vinci', 'Dan Brown', 'Un thriller de misterio que combina arte, historia y religión. Una búsqueda frenética por descubrir secretos ocultos durante siglos.', 20.99, 19, '/images/da-vinci.jpg', 10);

-- INSERTAR USUARIO ADMIN DE EJEMPLO
INSERT OR IGNORE INTO Users (Id, Name, UserName, Email, Password, Role) VALUES
(1, 'Administrador', 'admin', 'admin@bookstore.com', 'admin123', 'admin');

-- VERIFICAR DATOS INSERTADOS
SELECT 'Categorías insertadas:' as info, COUNT(*) as count FROM Categories
UNION ALL
SELECT 'Libros insertados:' as info, COUNT(*) as count FROM Books
UNION ALL
SELECT 'Usuarios insertados:' as info, COUNT(*) as count FROM Users;