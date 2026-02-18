import React from "react"
import { useState } from "react"
import './QrCodes.css'
+ function QrCode (){
   const [img,setImg]=useState("");
   const [loading,setLoading]=useState(false)
   const [qrData,setQrData]=useState("Enter your data for qr code");
   const [qrSize,setQrSize]=useState("150");
   async function generateQR(){
     setLoading(true);
     try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
      setImg(url)
     }catch(error){
      console.log("Error generating QR code",error)
     }
     finally{
      setLoading(false)
     }
   }
   function downloadQR(){
     fetch(img).then(res=>res.blob()).then(blob=>{
       const url=window.URL.createObjectURL(blob);
       const a=document.createElement("a");
       a.href=url;
       a.download="QrCode.png";
       document.body.appendChild(a);
       a.click();
       window.URL.revokeObjectURL(url);
     }).catch(error=>{
      console.log("Error downloading QR code",error)
     })
   }
  return (   
    <div className="app-container">
     <h1>QR Code Generator</h1>
     {loading && <p>Please Wait....</p>}
      {img && <img src={img} alt="images" className="qr-code-image" />} 
      <div> 
        <label htmlFor="dataInput" value={qrData} className="input-label" onChange={(e)=>setQrData(e.target.value)}>Data for QR Code</label>
        <input type="text"  id="dataInput" placeholder="Enter your data for QR code" />
        <label htmlFor="sizeInput" value={qrSize}className="input-label" onChange={(e)=>setQrSize(e.target.value)}>Image-Size (e.g.,150)</label>
        <input type="text" id="sizeInput"placeholder="Enter Image Size" />
        <button className="generate-button" onClick={generateQR} disabled={loading}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQR}>Download QR Code</button>
      </div>
      <p className="footer">Designed By <a href="#">Suvetha</a></p>
    </div>
  
  )
}
export default QrCode
