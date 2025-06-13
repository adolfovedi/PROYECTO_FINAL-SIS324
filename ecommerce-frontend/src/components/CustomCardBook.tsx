// src/components/CustomCardBook.tsx

import React from "react";

interface CustomCardBookProps {
    id: string;
    imageUrl?: string | null;
    title: string;
    author: string;
    price?: number | null;
    category?: string | number | null;
}

const CustomCardBook: React.FC<CustomCardBookProps> = ({
    id,
    imageUrl,
    title,
    author,
    price,
    category,
}) => {
    const fallbackImageUrl = "https://placehold.co/240x300/e0e0e0/ffffff?text=No+Image";

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer m-2 w-64 h-[400px] flex flex-col justify-between">
            <img
                src={imageUrl || fallbackImageUrl}
                alt={title}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                    e.currentTarget.src = fallbackImageUrl;
                }}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{title}</h3>
                <p className="text-gray-600 text-sm mb-2">{author}</p>
                <p className="text-green-700 font-bold text-lg">
                    Bs. {typeof price === 'number' ? price.toFixed(2) : 'N/A'}
                </p>
                <p className="text-sm text-gray-500 mb-4 flex-grow">
                    Categoría: {category !== undefined && category !== null ? category : 'Desconocida'}
                </p>
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors self-end"
                >
                    ver más
                </button>
            </div>
        </div>
    );
};

export default CustomCardBook;