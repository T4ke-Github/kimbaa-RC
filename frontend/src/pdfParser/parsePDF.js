// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

const inputFile = document.getElementById("fileInput");
const btnUpload = document.getElementById("btnUpload");

// All of the parse patients
let student = [];

btnUpload.addEventListener("click", () => {
    const formData = new FormData();
    formData.append("file", inputFile.files[0]);
});

// const files = fs.readdirSync("testFiles");
const files = formData.get("file");

// Make a IIFE so we can run asynchronous code
(async () => {

    // Await all of the patients to be passed
    // For each file in the patients folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        function extractDecimalNumber(value) {
            let match = value.match(/\d+,\d+/);
            if (match) {
                let grade = match[0].replace(',', '.');
                return grade.slice(4);
            }
            return "-1";
        }

        // Load the pdf document
        pdfParser.loadPDF(`testFiles/${file}`);

        // Parsed the patient
        let data = await new Promise(async (resolve, reject) => {

            // Define the extractValue function at the top or before the event handler
            function extractValue(numericValue, grade) {
                return (numericValue > 4.0 || isNaN(parseFloat(grade))) ? "-1" : grade;
            }

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                // The raw PDF data in text form
                // Filter out footer lines
                const extract = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                const filter = /BewertungenAusreichende Noten:[\s\S]*?----------------Page \(\d+\) Break----------------/g;
                const raw = extract.replace(filter, "");

                // Return the parsed data
                resolve({

                    Matrikelnummer: /Matrikel-Nr.:\s(.*?)Geboren/i.exec(raw)[1].trim(),

                    Mathematik_I_8637_106565: (() => {
                        let value = /8637_106565\s(.*?)143064/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),
                    
                    GdTI_11428_106565: (() => {
                        let value = /11428_106565\s(.*?)143132/i.exec(raw)[1].trim().split(" ")[2].slice(4);
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Mediendesign_11429_106565: (() => {
                        let value = /11429_106565\s(.*?)143133/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    TGdI_8640_106565: (() => {
                        let value = /8640_106565\s(.*?)143135/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Programmierung_I_11430_106565: (() => {
                        let value = /11430_106565\s(.*?)143137/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Mathematik_II_8643_106565: (() => {
                        let value = /8643_106565\s(.*?)143066/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    AlgoData_10985_106565: (() => {
                        let value = /10985_106565\s(.*?)143140/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),
                    
                    Datenbanken_8645_106565: (() => {
                        let value = /8645_106565\s(.*?)143009/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Programmierung_II_8646_106565: (() => {
                        let value = /8646_106565\s(.*?)143010/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Betriebssysteme_8644_106565: (() => {
                        let value = /8644_106565\s(.*?)143144/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Software_Engi_I_8649_106565: (() => {
                        let value = /8649_106565\s(.*?)143013/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Computergrafik_11431_106565: (() => {
                        let value = /11431_106565\s(.*?)143147/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Medientechnologien_11432_106565: (() => {
                        let value = /11432_106565\s(.*?)143149/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Verteilte_Systeme_10126_106565: (() => {
                        let value = /10126_106565\s(.*?)143151/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Web_Engi_I_11433_106565: (() => {
                        let value = /11433_106565\s(.*?)143153/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Software_Engi_II_8655_106565: (() => {
                        let value = /8655_106565\s(.*?)143019/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Web_Engi_II_11434_106565: (() => {
                        let value = /11434_106565\s(.*?)143156/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    HDI_11435_106565: (() => {
                        let value = /11435_106565\s(.*?)143158/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Projekt_11436_106565: (() => {
                        let value = /11436_106565\s(.*?)143163/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    GwA_10531_106565: (() => {
                        let value = /10531_106565\s(.*?)143105/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Interface_Design_11437_106566: (() => {
                        let value = /11437_106566\s(.*?)143164/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Software_Engi_AuW_11438_106566: (() => {
                        let value = /11438_106566\s(.*?)143165/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),
                    
                    Web_Graphics_11439_106566: (() => {
                        let value = /11439_106566\s(.*?)143166/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Softwarequalitaet_11440_106566: (() => {
                        let value = /11440_106566\s(.*?)143167/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    BWL_8663_106566: (() => {
                        let value = /8663_106566\s(.*?)143168/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Medienproduktion_11441_106566: (() => {
                        let value = /11441_106566\s(.*?)143169/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    C_PlusPlus_Programmierung_11385_106566: (() => {
                        let value = /11385_106566\s(.*?)143170/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    
                    Programmiersprachen_11442_106566: (() => {
                        let value = /11442_106566\s(.*?)143171/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    IOS_Anwendungsentwicklung_11443_106566: (() => {
                        let value = /11443_106566\s(.*?)143172/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Mobile_Anwendungsentwicklung_11444_106566: (() => {
                        let value = /11444_106566\s(.*?)143173/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Visual_Scientific_Compute_11445_106566: (() => {
                        let value = /11445_106566\s(.*?)143174/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Creative_Coding_11446_106566: (() => {
                        let value = /11446_106566\s(.*?)143175/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Signalverarbeitung_11447_106566: (() => {
                        let value = /11447_106566\s(.*?)143176/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Maschinelles_Lernen_11448_106566: (() => {
                        let value = /11448_106566\s(.*?)143177/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Webtechnologien_11449_106566: (() => {
                        let value = /11449_106566\s(.*?)143178/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Aktuelle_Themen_11450_106566: (() => {
                        let value = /11450_106566\s(.*?)143179/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),
                    
                    Maya_10385_106566: (() => {
                        let value = /10385_106566\s(.*?)143099/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    C_Plus_Plus_Java_10386_106566: (() => {
                        let value = /10386_106566\s(.*?)143101/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    C_Plus_Plus_Java_10386_106566: (() => {
                        let value = /10386_106566\s(.*?)143101/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    AngularJS_11384_106566: (() => {
                        let value = /11384_106566\s(.*?)143127/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Videoproduktion_10612_106566: (() => {
                        let value = /10612_106566\s(.*?)143109/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Cloud_Computing_10433_106566: (() => {
                        let value = /10433_106566\s(.*?)143181/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Frontend_Design_Web_11663_106566: (() => {
                        let value = /11663_106566\s(.*?)143182/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Microservice_Entwicklung_10501_106566: (() => {
                        let value = /10501_106566\s(.*?)143183/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Interactive_Media_Objects_1980_106566: (() => {
                        let value = /1980_106566\s(.*?)143184/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Webprogrammierung_Python_1150_106566: (() => {
                        let value = /1150_106566\s(.*?)143185/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Echtzeitgrafik_11958_106566: (() => {
                        let value = /11958_106566\s(.*?)143186/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Professionelle_Web_Anwendungen_12153_106566: (() => {
                        let value = /12153_106566\s(.*?)143187/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Data_Science_WP23: (() => {
                        let value = /WP23\s(.*?)143188/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Externes_Modul_1_WP25: (() => {
                        let value = /WP25\s(.*?)143189/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),
                    
                    Externes_Modul_2_WP26: (() => {
                        let value = /WP26\s(.*?)143190/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Externes_Modul_3_WP27: (() => {
                        let value = /WP27\s(.*?)143191/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Software_Tool_Construction_WP24: (() => {
                        let value = /WP24\s(.*?)143192/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                    Capture_to_Render_WP28: (() => {
                        let value = /WP\s28\s(.*?)143193/i.exec(raw)[1].trim();
                        let result = extractDecimalNumber(value);
                        return result;
                    })(),

                });
            });

        });

        // Add the patient to the patients array
        student.push(data);
    }));

    // Save the extracted information to a json file
    fs.writeFileSync("Test.json", JSON.stringify(student));
    console.log(student);

})();  