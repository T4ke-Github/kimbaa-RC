// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

// Get all the filenames from the patients folder
const files = fs.readdirSync("testFiles");

// All of the parse patients
let student = [];

// Make a IIFE so we can run asynchronous code
(async () => {

    // Await all of the patients to be passed
    // For each file in the patients folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        // Load the pdf document
        pdfParser.loadPDF(`testFiles/${file}`);

        // Parsed the patient
        let data = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                // The raw PDF data in text form
                const extract = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                const filter = /BewertungenAusreichende Noten:[\s\S]*?----------------Page \(\d+\) Break----------------/g;
                const raw = extract.replace(filter, "");

                fs.writeFileSync("Test2.json", JSON.stringify(raw));


            });

        });

    }));
    

})();  