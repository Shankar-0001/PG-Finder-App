import axios from "axios";
import { useEffect, useState } from "react";

export function Home() {
    const [products, setProduct] = useState([]);

    function LoadProduct() {
        axios.get(`http://127.0.0.1:4040/products`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    useEffect(() => {
        LoadProduct();
    }, []);

    return (
        <div>
            <section className="px-16 py-6 bg-gray-200 ">
                <div className="grid lg:grid-cols-3 gap-4 bg-gray-100">
                    {products.map(product => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-xl hover:bg-blue-50 ">
                            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h2 className="text-xl font-semibold">{product.title}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-gray-800 font-bold">Price: ₹{product.price}</p>
                            <p className="text-gray-600">Location: {product.state}</p>
                            <p className="text-gray-600">Category: {product.category}</p>
                            <p className="text-gray-600">Contact: {product.contact}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}


