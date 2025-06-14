// src/app/HistoryPurchases/HistoryPurchases.tsx

"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import HistoryIcon from "@/assets/icons/historyIcon"; 

// Importar SOLO las funciones necesarias de Firestore desde tu servicio
import { initializeFirebaseApp, getPurchaseHistory, getUserId } from "@/lib/firestoreService";

// Interfaz para un ítem dentro de un registro de compra
interface PurchaseRecordItem {
    bookId: number;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

// Interfaz para un registro de compra completo
interface PurchaseRecord {
    id: string; 
    userId: string;
    purchaseDate: {
        seconds: number;
        nanoseconds: number;
    };
    items: PurchaseRecordItem[]; 
    totalAmount: number;
}

const HistoryPurchasesPage = () => { 
    const router = useRouter();
    const [purchaseRecords, setPurchaseRecords] = useState<PurchaseRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false); // Nuevo estado para controlar si Firebase está listo

    useEffect(() => {
        // Inicializar Firebase (esto es seguro llamarlo múltiples veces, solo se ejecuta una vez)
        initializeFirebaseApp();

        // Observer para el estado de Firebase y Auth
        const checkFirebaseReady = setInterval(() => {
            // getUserId() devolverá el UID solo cuando Firebase Auth haya completado su inicialización
            // y la instancia 'db' de Firestore esté disponible en el servicio.
            if (getUserId() !== null && typeof window !== 'undefined' && (window as any).firebaseDBInstance) {
                console.log("HistoryPurchasesPage: Firebase y UID listos.");
                setIsFirebaseReady(true);
                clearInterval(checkFirebaseReady); // Detener el intervalo una vez listo
            } else {
                console.log("HistoryPurchasesPage: Esperando Firebase y UID. UID actual:", getUserId());
            }
        }, 500); // Revisa cada 500ms

        // Limpieza del intervalo
        return () => clearInterval(checkFirebaseReady);
    }, []);

    // Este useEffect se ejecutará SÓLO cuando Firebase esté listo
    useEffect(() => {
        if (isFirebaseReady) {
            console.log("HistoryPurchasesPage: Firebase está listo. Intentando obtener historial de compras...");
            const unsubscribe = getPurchaseHistory(setPurchaseRecords, setLoading, setError);

            // Función de limpieza para desuscribirse del listener de Firestore
            return () => {
                console.log("HistoryPurchasesPage: Desmontando componente o Firebase ya no listo. Desuscribiendo de Firestore.");
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [isFirebaseReady]); // Este efecto depende de isFirebaseReady

    // Función auxiliar para formatear la fecha y hora de un timestamp de Firestore
    const formatTimestamp = (timestamp: { seconds: number; nanoseconds: number }): string => {
        if (!timestamp || typeof timestamp.seconds !== 'number') {
            return "Fecha desconocida";
        }
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleString(); 
    };

    return (
        <Layout>
            <div className="w-2/3 h-full p-4 mx-auto"> 
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="flex flex-row justify-center items-center h-max w-max">
                        <HistoryIcon className="w-12 h-12 text-gray-800" /> 
                        <p className="text-3xl font-bold pl-2 text-gray-800">Mi Historial de Compras</p>
                    </div>
                </div>

                {/* Mostrar estado de carga */}
                {(loading || !isFirebaseReady) && ( // Muestra "Cargando" si no está listo o está cargando
                    <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-700 mt-4">
                        Cargando historial de compras...
                    </div>
                )}

                {/* Mostrar errores */}
                {error && !loading && isFirebaseReady && ( // Solo muestra error si está listo y hay error
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mt-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                        {error.includes("autenticado") && (
                            <button
                                onClick={() => router.push('/')} 
                                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                            >
                                Ir a Inicio para Iniciar Sesión
                            </button>
                        )}
                    </div>
                )}

                {/* Mostrar mensaje si no hay compras */}
                {!loading && !error && isFirebaseReady && purchaseRecords.length === 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-700 mt-4">
                        <p className="text-xl">Aún no tienes compras registradas.</p>
                        <button
                            onClick={() => router.push('/productos')}
                            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg"
                        >
                            Explorar Productos
                        </button>
                    </div>
                )}

                {/* Mostrar el historial de compras */}
                {!loading && !error && isFirebaseReady && purchaseRecords.length > 0 && (
                    <div className="flex flex-col p-3 bg-blue-700 rounded-3xl my-3 shadow-lg">
                        {purchaseRecords.map((purchase) => (
                            <div key={purchase.id} className="bg-white text-gray-800 rounded-lg p-4 my-2 shadow-sm border border-gray-200">
                                <div className="grid grid-cols-[1fr,1fr,1fr] items-center text-lg font-bold mb-2 pb-2 border-b border-gray-100">
                                    <p>Fecha: {formatTimestamp(purchase.purchaseDate)}</p>
                                    <p>Artículos: {purchase.items.length}</p>
                                    <p>Total: Bs. {purchase.totalAmount.toFixed(2)}</p>
                                </div>
                                
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                    <p className="text-sm font-semibold mb-2">Detalle de Artículos:</p>
                                    <div className="flex flex-col space-y-2">
                                        {purchase.items.map((item, itemIndex) => (
                                            <div key={item.bookId || itemIndex} className="flex items-center space-x-4 text-gray-700">
                                                <img
                                                    src={item.imageUrl || `https://placehold.co/40x50/E0E0E0/333333?text=Libro`}
                                                    alt={`Portada de ${item.title}`}
                                                    className="w-10 h-12 object-cover rounded-sm shadow-xs"
                                                    onError={(e) => { e.currentTarget.src = `https://placehold.co/40x50/E0E0E0/333333?text=Libro`; }}
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.title}</p>
                                                    <p className="text-sm">Cantidad: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">Bs. {(item.price * item.quantity).toFixed(2)}</p> 
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default HistoryPurchasesPage;
