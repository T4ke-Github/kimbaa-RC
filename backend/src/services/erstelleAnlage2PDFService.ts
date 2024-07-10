import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { AntragAnlage2Resource } from "../Resources";
import * as antragAnlage2Service from "../services/AntragAnlage2Service";

const LINE_SPACING = 23; // Globale Variable für den Zeilenabstand
const CHECKBOX_TEXT_OFFSET = -2; // Globale Variable für den vertikalen Offset der Checkboxen
const TOP_MARGIN = 75; // Abstand der ersten Zeile zum oberen Rand
const FONT_SIZE = 12; // Größe der Schriftart
const HEADING_FONT_SIZE = 14; // Größe der Schriftart für Überschriften
const SIGNATURE_LINE_SPACING = 30; // Abstand für die Zeile mit der Unterschrift

export const createAnlage2PDF = async (id: string): Promise<Buffer[]> => {
    try {
        // Daten aus der Datenbank abrufen
        const anlage2Data = await antragAnlage2Service.getAntragAnlage2ById(id) as AntragAnlage2Resource;
        if (!anlage2Data) {
            throw new Error("Anlage 2 Daten nicht gefunden.");
        }

        // PDF-Dokument erstellen
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4-Format

        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

        // Logo hinzufügen
        const logoPath = path.resolve(__dirname, '../BHT_Antrag_logo.png');
        const logoImageBytes = fs.readFileSync(logoPath);
        const logoImage = await pdfDoc.embedPng(logoImageBytes);
        const logoDims = logoImage.scale(0.5);
        const pageWidth = page.getWidth();
        const logoWidth = logoDims.width;
        const logoHeight = logoDims.height;
        const logoX = (pageWidth - logoWidth) / 2;

        page.drawImage(logoImage, {
            x: logoX, 
            y: page.getHeight() - logoHeight - 10,
            width: logoWidth,
            height: logoHeight,
        });

        const textOptions = { font: timesRomanFont, size: FONT_SIZE, color: rgb(0, 0, 0) };
        const headingOptions = { font: timesRomanBoldFont, size: HEADING_FONT_SIZE, color: rgb(0, 0, 0) };
        let currentY = page.getHeight() - logoHeight - TOP_MARGIN; 

        const drawText = (text: string, indent: number = 0, options = textOptions) => {
            page.drawText(text, { x: 50 + indent, y: currentY, ...options });
            currentY -= LINE_SPACING;
        };

        const drawCheckbox = (label: string, checked: boolean, x: number, y: number) => {
            page.drawRectangle({ x, y: y + CHECKBOX_TEXT_OFFSET, width: 10, height: 10, borderColor: rgb(0, 0, 0), borderWidth: 1 });
            if (checked) {
                page.drawText('x', { x: x + 2, y, size: 10 });
            }
            page.drawText(label, { x: x + 15, y, ...textOptions });
        };

        drawText('Persönliche Daten:', 0, headingOptions);
        currentY -= 10; // Add space after title
        drawText(`Themenvorschlag: ${anlage2Data.themenvorschlag}`, 0, textOptions);
        drawText(`Betreuung 1: ${anlage2Data.betreuung1}`);
        drawText(`Akademischer Grad 1: ${anlage2Data.akademischerGradVonBetreuung1}`);
        
        if (anlage2Data.betreuung2) {
            drawText(`Betreuung 2: ${anlage2Data.betreuung2}`);
            drawText(`Akademischer Grad 2: ${anlage2Data.akademischerGradVonBetreuung2}`);
            currentY -= LINE_SPACING;
        }

        if (anlage2Data.arbeitAlsGruppenarbeit) {
            drawText(`Gruppenmitglied 1: ${anlage2Data.gruppenmitglied1}`);
            drawText(`Matrikelnummer 1: ${anlage2Data.matrikelnummerVonGruppenmitglied1}`);
            drawText(`Gruppenmitglied 2: ${anlage2Data.gruppenmitglied2}`);
            drawText(`Matrikelnummer 2: ${anlage2Data.matrikelnummerVonGruppenmitglied2}`);
        }

        drawCheckbox('an der Hochschule', anlage2Data.studentenSindAnHochschule!, 50, currentY);
        drawCheckbox('bei der Firma', anlage2Data.studentenSindBeiFirma!, 150, currentY);
        currentY -= LINE_SPACING;

        if (anlage2Data.startVorlesungszeit) {
            drawCheckbox('zum Vorlesungsbeginn', anlage2Data.startVorlesungszeit!, 50, currentY);
        } else {
            drawCheckbox('zum', true, 50, currentY);
            drawText(anlage2Data.startZum!.toISOString().split('T')[0], 70, textOptions);
            drawText(anlage2Data.begruendungFuerDatum!, 50, textOptions);
            currentY -= 2 * LINE_SPACING;
        }

        const pdfBytes = await pdfDoc.save();
        const outputPath = path.resolve(__dirname, '../output/final_antrag_anlage2.pdf');
        await fs.promises.writeFile(outputPath, pdfBytes);

        console.log(`PDF erfolgreich gespeichert: ${outputPath}`);
        return [Buffer.from(pdfBytes)];
    } catch (error) {
        console.error("Fehler beim Erstellen der Anlage 2:", error);
        throw error;
    }
};
