// src/lib/firestoreService.ts

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, Auth, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, Timestamp, Firestore, DocumentData } from 'firebase/firestore';
import { Product } from '@/utils/cartUtils'; // Importar la interfaz Product desde cartUtils

// Declaraciones de variables globales para la configuración de Firebase
declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string | undefined;

// Interfaz para un ítem de libro tal como se guardará en Firestore dentro de un registro de compra
interface PurchaseRecordItem {
  bookId: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Interfaz para el registro completo de una compra en Firestore
interface PurchaseRecord {
  id?: string; // Hacemos 'id' opcional porque no existe al añadir, pero sí al leer
  userId: string;
  purchaseDate: Timestamp; // Usamos Timestamp de Firestore para la fecha
  items: PurchaseRecordItem[]; // Array de ítems comprados
  totalAmount: number; // Monto total de la compra
}

// Variables para almacenar las instancias de Firebase (se inicializan una vez)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let currentUserId: string | null = null; // Almacena el ID del usuario autenticado actualmente

// Variable para controlar si la inicialización de Firebase ya se ha completado
let isFirebaseInitialized = false;

/**
 * Inicializa la aplicación Firebase.
 * Esta función debe llamarse una sola vez al inicio de tu aplicación (por ejemplo, en el Layout o en el componente raíz).
 * Maneja la autenticación anónima o con token personalizado proporcionado por el entorno.
 */
export const initializeFirebaseApp = async () => {
  if (isFirebaseInitialized) return; // Si la aplicación ya está inicializada, no hacer nada
  isFirebaseInitialized = true; // Marcar como en proceso de inicialización
  console.log("FirestoreService: Iniciando inicialización de Firebase...");

  try {
    const firebaseConfig = JSON.parse(__firebase_config);
    console.log("FirestoreService: Configuración de Firebase cargada.");
    
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("FirestoreService: Firebase App, Firestore y Auth inicializados.");

    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        currentUserId = user.uid;
        console.log("FirestoreService: onAuthStateChanged - Usuario autenticado. UID:", currentUserId);
      } else {
        console.log("FirestoreService: onAuthStateChanged - No hay usuario autenticado. Intentando inicio de sesión anónima...");
        try {
          if (typeof __initial_auth_token === 'undefined' || !__initial_auth_token) {
            const anonymousUser = await signInAnonymously(auth);
            currentUserId = anonymousUser.user.uid;
            console.log("FirestoreService: Sesión anónima iniciada. UID:", currentUserId);
          } else {
            console.log("FirestoreService: Token inicial presente, esperando autenticación con token.");
          }
        } catch (error: any) {
          console.error("FirestoreService: Error al iniciar sesión anónimamente:", error.message);
          currentUserId = null;
        }
      }
    });

    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      console.log("FirestoreService: Intentando signInWithCustomToken...");
      await signInWithCustomToken(auth, __initial_auth_token);
      console.log("FirestoreService: Sesión con token personalizado iniciada.");
    } else if (!auth.currentUser) {
      console.log("FirestoreService: No hay token inicial ni usuario actual. Intentando signInAnonymously inicial...");
      await signInAnonymously(auth);
    }
    console.log("FirestoreService: Inicialización de Firebase completada.");

  } catch (error: any) {
    console.error("FirestoreService: Error FATAL al inicializar la app o autenticar:", error.message);
    isFirebaseInitialized = false; // Marcar como no inicializado si hay un error fatal
  }
};

/**
 * Obtiene el ID del usuario actualmente autenticado.
 * Nota: Esto puede ser null si la autenticación aún no ha terminado.
 * @returns El UID del usuario o null.
 */
export const getUserId = (): string | null => {
  return auth?.currentUser?.uid || currentUserId; // Preferir auth.currentUser.uid si está disponible
};

/**
 * Obtiene la instancia de Firestore.
 * @returns La instancia de Firestore o null si no está inicializada.
 */
export const getFirestoreInstance = (): Firestore | null => {
  return db;
};

/**
 * Obtiene la instancia de Auth.
 * @returns La instancia de Auth o null si no está inicializada.
 */
export const getAuthInstance = (): Auth | null => {
  return auth;
};

/**
 * Registra una compra en Firestore.
 * Los datos de la compra se guardan en una colección específica del usuario.
 * @param cartItems Los ítems del carrito que se compraron.
 * @param totalAmount El monto total de la compra.
 */
export const recordPurchase = async (cartItems: Product[], totalAmount: number): Promise<void> => {
  console.log("FirestoreService: Intentando registrar compra...");
  const firestoreDb = getFirestoreInstance();
  const userId = getUserId();

  if (!firestoreDb) {
    console.error("FirestoreService: Firestore no está inicializado. No se puede registrar la compra.");
    return;
  }
  if (!userId) {
    console.error("FirestoreService: currentUserId no está disponible. No se puede registrar la compra.");
    return;
  }

  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  console.log("FirestoreService: App ID para registro de compra:", appId);
  console.log("FirestoreService: UID para registro de compra:", userId);

  try {
    const purchaseRecordItems: PurchaseRecordItem[] = cartItems.map(item => ({
      bookId: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity || 1,
    }));

    const purchaseData: PurchaseRecord = {
      userId: userId,
      purchaseDate: Timestamp.now(),
      items: purchaseRecordItems,
      totalAmount: totalAmount,
    };
    console.log("FirestoreService: Datos de compra a registrar:", purchaseData);

    const userPurchasesCollection = collection(firestoreDb, `artifacts/${appId}/users/${userId}/purchases`);
    const docRef = await addDoc(userPurchasesCollection, purchaseData);
    console.log("FirestoreService: Compra registrada en Firestore con éxito. ID del documento:", docRef.id);
  } catch (error: any) {
    console.error("FirestoreService: Error al registrar la compra en Firestore:", error.message);
  }
};

/**
 * Obtiene el historial de compras de un usuario en tiempo real.
 * Utiliza un listener de `onSnapshot` para actualizar los datos automáticamente.
 * @param setHistory Función para actualizar el estado del historial de compras.
 * @param setLoading Función para actualizar el estado de carga.
 * @param setError Función para actualizar el estado de error.
 * @returns Una función de limpieza para desuscribirse del listener.
 */
export const getPurchaseHistory = (
  setHistory: (history: PurchaseRecord[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  console.log("FirestoreService: Intentando obtener historial de compras...");
  const firestoreDb = getFirestoreInstance();
  const userId = getUserId();
  const firebaseAuth = getAuthInstance(); // Obtener la instancia de Auth para el listener

  if (!firestoreDb) {
    console.warn("FirestoreService: Firestore no está inicializado para historial (getPurchaseHistory).");
    setError("No se pudo cargar el historial: Firestore no listo.");
    setLoading(false);
    return () => {};
  }
  if (!userId) {
      console.warn("FirestoreService: currentUserId no disponible para historial (getPurchaseHistory). Esperando autenticación.");
      // No establecer error aquí, ya que onAuthStateChanged debería manejarlo
      setLoading(true); // Mantener cargando mientras se espera el usuario
      return () => {};
  }
  if (!firebaseAuth) {
    console.warn("FirestoreService: Auth no está inicializado para historial.");
    setError("No se pudo cargar el historial: Autenticación no lista.");
    setLoading(false);
    return () => {};
  }


  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  console.log("FirestoreService: App ID para historial:", appId);
  console.log("FirestoreService: UID para historial:", userId);


  const userPurchasesCollection = collection(firestoreDb, `artifacts/${appId}/users/${userId}/purchases`);
  const q = query(userPurchasesCollection, orderBy("purchaseDate", "desc"));

  setLoading(true);
  setError(null);

  const unsubscribe = onSnapshot(q, (snapshot: any) => {
    console.log("FirestoreService: onSnapshot recibido. Documentos:", snapshot.docs.length);
    try {
      const history: PurchaseRecord[] = [];
      snapshot.forEach((doc: DocumentData) => {
        history.push({ id: doc.id, ...doc.data() } as PurchaseRecord); 
      });
      setHistory(history);
      console.log("FirestoreService: Historial de compras actualizado:", history);
      setError(null);
    } catch (e: any) {
      console.error("FirestoreService: Error al procesar el snapshot de historial de compras:", e.message);
      setError("Error al cargar el historial de compras. Datos corruptos.");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, (error: any) => {
    console.error("FirestoreService: Error en la suscripción a historial de compras:", error.message);
    setError(`Error de conexión al historial: ${error.message || "Desconocido"}`);
    setLoading(false);
    setHistory([]);
  });

  return unsubscribe;
};

