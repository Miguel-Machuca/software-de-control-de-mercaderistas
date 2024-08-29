import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";


import QRCode from 'qrcode.react';

function GenerarQrDemostracion(props) {
  let {id} = useParams();
  const [qr, setQr] = useState(id);

  const handleChange = (event) => {
    setQr(event.target.value);
  };

  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar pageText="Generador Qr de la orden de trabajo"/>
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
			 <div className="bg-primary flex h-screen w-screen items-center justify-center">
			  <div className="w-10/12 flex flex-col items-center mt-10">

        <input
          type="text"
          value={qr}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          placeholder="Enter text for QR code"
          style={{ visibility: 'hidden' }}
        />

				<div className="mb-8">
				  {qr ? (
					<QRCode
					  id="myqr"
					  value={qr}
					  size={320}
					  includeMargin={true}
					/>
				  ) : (
					<p>No QR code preview</p>
				  )}
				</div>

				<button
				  onClick={downloadQR}
				  className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				>
				  Descargar
				  <i className="fas fa-download ml-2" />
				</button>
			  </div>
			</div>           
            
          </div>

          <FooterAdmin />
        </div>
      </div>
    </>

  );
}

export default GenerarQrDemostracion;
