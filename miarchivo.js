

import puppeteer from "puppeteer";

async function openWebPage(numRuc){
    const browser=await puppeteer.launch({
        headless:true,  // hace que nos muestre el navegador o no 
        //slowMo:300
    });
    
    const page=await browser.newPage();
    await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp')
    await page.click("#txtRuc"); 
    //await page.waitForSelector("#txtRuc");
    await page.type("#txtRuc", numRuc);
    await page.click("#btnAceptar");
    await page.waitForSelector(".list-group");
    const result=await page.evaluate(()=>{
    var elemento = document.querySelectorAll('.list-group')[0].children;
        
       const numeroRucName= elemento[0].children[0].children[1].children[0].innerText.trim(); // el primer corchete decide cual salir
       const tipoContribuyente= elemento[1].children[0].children[1].children[0].innerText.trim();
       const nombreComercial=elemento[2].children[0].children[1].children[0].innerHTML.trim(); 
       const fechaInscripcion=elemento[3].children[0].children[1].children[0].innerText.trim();
       const estadoContribuyente=elemento[4].children[0].children[1].children[0].innerText.trim(); 
       const condicionContribuyente=elemento[5].children[0].children[1].children[0].innerText.trim(); 
       const domicilioFiscal=elemento[6].children[0].children[1].children[0].innerText.trim();
       const sistemaEmisionComprobante=elemento[7].children[0].children[1].children[0].innerText.trim();
       const actividadComercio=elemento[7].children[0].children[3].children[0].innerText.trim();
       const sistemaContabilidad=elemento[8].children[0].children[1].children[0].innerText.trim();

       const emisorElectronicoDesde=elemento[12].children[0].children[1].children[0].innerText.trim();
       const comprobanteElectronico=elemento[13].children[0].children[1].children[0].innerText.trim();
       const afiliadoAlPleDesde=elemento[14].children[0].children[1].children[0].innerText.trim();
      
     
       return {
        numeroRucName: numeroRucName,
        tipoContribuyente: tipoContribuyente,
        nombreComercial: nombreComercial,
        fechaInscripcion: fechaInscripcion,
        estadoContribuyente: estadoContribuyente,
        condicionContribuyente: condicionContribuyente,
        domicilioFiscal: domicilioFiscal,
        sistemaEmisionComprobante: sistemaEmisionComprobante,
        actividadComercio: actividadComercio,
        sistemaContabilidad:sistemaContabilidad,
        emisorElectronicoDesde:emisorElectronicoDesde,
        comprobanteElectronico:comprobanteElectronico,
        afiliadoAlPleDesde: afiliadoAlPleDesde,
     
       }
       
    })
    await browser.close();
    return result;

}


export {openWebPage};


