// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

// // Read file input and Eventlistener for the upload button
// let inputFile = document.getElementById("fileInput");
// let btnUpload = document.getElementById("btnUpload");

// btnUpload.addEventListener("click", () => {
//     const formData = new FormData();
//     formData.append("file", inputFile.files[0]);
// });

// let files = formData.get("file");

// // Read the files in the testFiles folder
let files = fs.readdirSync("uploadedFiles");

// parsed module in an array
const Module = [];

// Make a IIFE so we can run asynchronous code
(async () => {

    // Await all of the data to be passed
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        // Load the pdf document
        pdfParser.loadPDF(`uploadedFiles/${file}`);

        // Parsed data from the pdf document
        let data = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                // The raw PDF data in text form
                // Filter out footer lines
                const extract = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                const filter = /BewertungenAusreichende Noten:[\s\S]*?----------------Page \(\d+\) Break----------------/g;
                const raw = extract.replace(filter, "");

                // Extract the decimal number from parsed string
                function extractDecimalNumber(value) {
                    let match = value.match(/\d+,\d+/);
                    if (match) {
                        let grade = match[0].replace(',', '.');
                        return grade.slice(4);
                    }
                    return "-404";
                }
                
                // Return  modulnummer string + result
                function returnResult(modulnummer, result) {
                    let solved = "true";
                    if (result === "-404") {
                        solved = "false";
                    }
                    return modulnummer + ", " + result + ", " + solved;
                }

                // Return the parsed data
                resolve({

                    Matrikelnummer: /Matrikel-Nr.:\s(.*?)Geboren/i.exec(raw)[1].trim(),

                    Mathematik_I: (() => {
                        let modulnummer = "8637_106565";
                        let value = /8637_106565\s(.*?)143064/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);                       
                        return returnResult(modulnummer, result);
                    })(),
                    
                    GdTI: (() => {
                        let modulnummer = "11428_106565";
                        let value = /11428_106565\s(.*?)143132/i.exec(raw)[1].trim().split(" ")[2].slice(4);
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Mediendesign: (() => {
                        let modulnummer = "11429_106565";
                        let value = /11429_106565\s(.*?)143133/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    TGdI: (() => {
                        let modulnummer = "8640_106565";
                        let value = /8640_106565\s(.*?)143135/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Programmierung_I: (() => {
                        let modulnummer = "11430_106565";
                        let value = /11430_106565\s(.*?)143137/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Mathematik_II: (() => {
                        let modulnummer = "8643_106565";
                        let value = /8643_106565\s(.*?)143066/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    AlgoData: (() => {
                        let modulnummer = "10985_106565";
                        let value = /10985_106565\s(.*?)143140/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),
                    
                    Datenbanken: (() => {
                        let modulnummer = "8645_106565";
                        let value = /8645_106565\s(.*?)143009/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Programmierung: (() => {
                        let modulnummer = "8646_106565";
                        let value = /8646_106565\s(.*?)143010/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Betriebssysteme: (() => {
                        let modulnummer = "8644_106565";
                        let value = /8644_106565\s(.*?)143144/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Software_Engi_I: (() => {
                        let modulnummer = "8649_106565";
                        let value = /8649_106565\s(.*?)143013/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Computergrafik: (() => {
                        let modulnummer = "11431_106565";
                        let value = /11431_106565\s(.*?)143147/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Medientechnologien: (() => {
                        let modulnummer = "11432_106565";
                        let value = /11432_106565\s(.*?)143149/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Verteilte_Systeme: (() => {
                        let modulnummer = "10126_106565";
                        let value = /10126_106565\s(.*?)143151/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Web_Engi_I: (() => {
                        let modulnummer = "11433_106565";
                        let value = /11433_106565\s(.*?)143153/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Software_Engi_II: (() => {
                        let modulnummer = "8655_106565";
                        let value = /8655_106565\s(.*?)143019/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Web_Engi_II: (() => {
                        let modulnummer = "11434_106565";
                        let value = /11434_106565\s(.*?)143156/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    HDI: (() => {
                        let modulnummer = "11435_106565";
                        let value = /11435_106565\s(.*?)143158/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Projekt: (() => {
                        let modulnummer = "11436_106565";
                        let value = /11436_106565\s(.*?)143163/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    GwA: (() => {
                        let modulnummer = "10531_106565";
                        let value = /10531_106565\s(.*?)143105/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Interface_Design: (() => {
                        let modulnummer = "11437_106566";
                        let value = /11437_106566\s(.*?)143164/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Software_Engi_AuW: (() => {
                        let modulnummer = "11438_106566";
                        let value = /11438_106566\s(.*?)143165/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),
                    
                    Web_Graphics: (() => {
                        let modulnummer = "11439_106566";
                        let value = /11439_106566\s(.*?)143166/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Softwarequalitaet: (() => {
                        let modulnummer = "11440_106566";
                        let value = /11440_106566\s(.*?)143167/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    BWL: (() => {
                        let modulnummer = "8663_106566";
                        let value = /8663_106566\s(.*?)143168/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Medienproduktion: (() => {
                        let modulnummer = "11441_106566";
                        let value = /11441_106566\s(.*?)143169/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    C_PlusPlus_Programmierung: (() => {
                        let modulnummer = "11385_106566";
                        let value = /11385_106566\s(.*?)143170/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    
                    Programmiersprachen: (() => {
                        let modulnummer = "11442_106566";
                        let value = /11442_106566\s(.*?)143171/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    IOS_Anwendungsentwicklung: (() => {
                        let modulnummer = "11443_106566";
                        let value = /11443_106566\s(.*?)143172/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Mobile_Anwendungsentwicklung: (() => {
                        let modulnummer = "11444_106566";
                        let value = /11444_106566\s(.*?)143173/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Visual_Scientific_Compute: (() => {
                        let modulnummer = "11445_106566";
                        let value = /11445_106566\s(.*?)143174/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Creative_Coding: (() => {
                        let modulnummer = "11446_106566";
                        let value = /11446_106566\s(.*?)143175/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Signalverarbeitung: (() => {
                        let modulnummer = "11447_106566";
                        let value = /11447_106566\s(.*?)143176/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Maschinelles_Lernen: (() => {
                        let modulnummer = "11448_106566";
                        let value = /11448_106566\s(.*?)143177/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Webtechnologien: (() => {
                        let modulnummer = "11449_106566";
                        let value = /11449_106566\s(.*?)143178/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Aktuelle_Themen: (() => {
                        let modulnummer = "11450_106566";
                        let value = /11450_106566\s(.*?)143179/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),
                    
                    Maya: (() => {
                        let modulnummer = "10385_106566";
                        let value = /10385_106566\s(.*?)143099/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    C_Plus_Plus_Java: (() => {
                        let modulnummer = "10386_106566";
                        let value = /10386_106566\s(.*?)143101/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    C_Plus_Plus_Java: (() => {
                        let modulnummer = "10386_106566";
                        let value = /10386_106566\s(.*?)143101/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    AngularJS: (() => {
                        let modulnummer = "11384_106566";
                        let value = /11384_106566\s(.*?)143127/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Videoproduktion: (() => {
                        let modulnummer = "10612_106566";
                        let value = /10612_106566\s(.*?)143109/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Cloud_Computing: (() => {
                        let modulnummer = "10433_106566";
                        let value = /10433_106566\s(.*?)143181/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Frontend_Design_Web: (() => {
                        let modulnummer = "11663_106566";
                        let value = /11663_106566\s(.*?)143182/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Microservice_Entwicklung: (() => {
                        let modulnummer = "10501_106566";
                        let value = /10501_106566\s(.*?)143183/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Interactive_Media_Objects: (() => {
                        let modulnummer = "1980_106566";
                        let value = /1980_106566\s(.*?)143184/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Webprogrammierung_Python: (() => {
                        let modulnummer = "1150_106566";
                        let value = /1150_106566\s(.*?)143185/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Echtzeitgrafik: (() => {
                        let modulnummer = "11958_106566";
                        let value = /11958_106566\s(.*?)143186/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Professionelle_Web_Anwendungen: (() => {
                        let modulnummer = "12153_106566";
                        let value = /12153_106566\s(.*?)143187/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Data_Science: (() => {
                        let modulnummer = "WP23";
                        let value = /WP23\s(.*?)143188/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Externes_Modul_1: (() => {
                        let modulnummer = "WP25";
                        let value = /WP25\s(.*?)143189/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),
                    
                    Externes_Modul_2: (() => {
                        let modulnummer = "WP26";
                        let value = /WP26\s(.*?)143190/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Externes_Modul_3: (() => {
                        let modulnummer = "WP27";
                        let value = /WP27\s(.*?)143191/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Software_Tool_Construction: (() => {
                        let modulnummer = "WP24";
                        let value = /WP24\s(.*?)143192/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                    Capture_to_Render: (() => {
                        let modulnummer = "WP28";
                        let value = /WP\s28\s(.*?)143193/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return returnResult(modulnummer, result);;
                    })(),

                });
            });

        });

        // Add the patient to the patients array
        Module.push(data);
    }));

    // Save the extracted information to a json file
    fs.writeFileSync("Test.json", JSON.stringify(Module));
    console.log(Module);

})();  