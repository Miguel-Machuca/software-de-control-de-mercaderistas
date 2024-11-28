import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import axios from "axios"; // Utilizaremos axios para enviar la URL de la imagen al servidor
import { actualizarOrdenTrabajoEstado } from "dato/OrdenTrabajoDato"; // Función para actualizar el estado de la orden

function VerificarImagen(props) {
  const { id } = useParams();
  const [data, setData] = useState('No result');
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(""); // Cambiar de "image" a "imageUrl"
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Función para manejar el cambio de la URL de la imagen
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value); // Cambiar el estado con la URL proporcionada
  };

  console.log(imageUrl)
  const handleSubmit = async () => {
    if (!imageUrl) {
      setResponseMessage("Por favor, ingrese una URL de imagen.");
      return;
    }

    

    setIsLoading(true);
    setResponseMessage("Analizando imagen...");

    try {
      // Enviar la URL de la imagen a la API de OpenAI para su análisis
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o", // Usar el modelo adecuado, en este caso GPT-4
          messages: [
            {
              role: "system",
              
            },
            {
              role: "user",
              content: `Analice la imagen en la siguiente url de imagen y diga si contiene un producto o publicidad, respondiendo con true o false`,
              image_url: imageUrl
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer API_KEY`, // Reemplaza con tu clave de API de OpenAI
          }
        }
      );

      // Suponemos que el backend devuelve una respuesta sobre si se detectaron productos o carteles
      const result = response.data.choices[0].message.content;
      if (result.includes("producto") || result.includes("cartel publicitario")) {
        setResponseMessage("Imagen verificada con éxito. El estado de la orden se actualizará a 'Completado'.");
        // Cambiar el estado de la orden a "Completado"
        await actualizarOrdenTrabajoEstado(id, "Completado");
      } else {
        setResponseMessage("No se detectaron productos ni carteles publicitarios.");
      }
    } catch (error) {
      console.error(error);
      setResponseMessage("Hubo un error al procesar la imagen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar pageText="Verificar Imagen" />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="bg-primary flex h-screen w-screen items-center justify-center">
              <h1>Cargar URL de Imagen de la Tienda</h1>
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageUrl}
                onChange={handleUrlChange}
              />
              <button 
                className="text-white bg-lightBlue-400" 
                onClick={handleSubmit} 
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Verificar Imagen"}
              </button>
              <p>{responseMessage}</p>
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default VerificarImagen;
