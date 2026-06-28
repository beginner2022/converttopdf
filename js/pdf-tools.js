/* ==========================================
   ConvertToPDF.in
   PDF Tools Library
========================================== */

const statusBox = document.getElementById("status");

/* ---------------------------- */

function setStatus(message, color = "#2563eb") {

    if (!statusBox) return;

    statusBox.innerHTML = message;

    statusBox.style.color = color;

}

/* ---------------------------- */

function downloadPDF(bytes, filename) {

    const blob = new Blob([bytes], {
        type: "application/pdf"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

}

/* ==========================================
   MERGE PDF
========================================== */

async function mergePDF() {

    const input = document.getElementById("mergeFiles");

    if (!input) return;

    const files = input.files;

    if (files.length < 2) {

        alert("Please select at least two PDF files.");

        return;

    }

    setStatus("Merging PDFs...");

    const mergedPdf = await PDFLib.PDFDocument.create();

    for (const file of files) {

        const bytes = await file.arrayBuffer();

        const pdf = await PDFLib.PDFDocument.load(bytes);

        const copiedPages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
        );

        copiedPages.forEach(page => {

            mergedPdf.addPage(page);

        });

    }

    const mergedBytes = await mergedPdf.save();

    downloadPDF(mergedBytes, "merged.pdf");

    setStatus("PDF merged successfully.", "green");

}

/* ==========================================
   SPLIT PDF
========================================== */

async function splitPDF() {

    const file =
        document.getElementById("splitFile").files[0];

    if (!file) {

        alert("Please choose a PDF.");

        return;

    }

    setStatus("Splitting PDF...");

    const pdf =
        await PDFLib.PDFDocument.load(
            await file.arrayBuffer()
        );

    for (let i = 0; i < pdf.getPageCount(); i++) {

        const newPdf =
            await PDFLib.PDFDocument.create();

        const [page] =
            await newPdf.copyPages(pdf, [i]);

        newPdf.addPage(page);

        const bytes =
            await newPdf.save();

        downloadPDF(bytes, `page-${i + 1}.pdf`);

    }

    setStatus("Split complete.", "green");

}

/* ==========================================
   ROTATE PDF
========================================== */

async function rotatePDF() {

    const file =
        document.getElementById("rotateFile").files[0];

    if (!file) {

        alert("Choose a PDF.");

        return;

    }

    const angle = parseInt(
        document.getElementById("rotationAngle").value
    );

    setStatus("Rotating PDF...");

    const pdf =
        await PDFLib.PDFDocument.load(
            await file.arrayBuffer()
        );

    pdf.getPages().forEach(page => {

        page.setRotation(PDFLib.degrees(angle));

    });

    const bytes =
        await pdf.save();

    downloadPDF(bytes, "rotated.pdf");

    setStatus("Rotation complete.", "green");

}

/* ==========================================
   JPG TO PDF
========================================== */

async function jpgToPDF() {

    const files =
        document.getElementById("jpgFiles").files;

    if (files.length === 0) {

        alert("Select images.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {

        const reader = new FileReader();

        const imageData =
            await new Promise(resolve => {

                reader.onload = e => resolve(e.target.result);

                reader.readAsDataURL(files[i]);

            });

        if (i > 0) {

            pdf.addPage();

        }

        pdf.addImage(
            imageData,
            "JPEG",
            10,
            10,
            190,
            270
        );

    }

    pdf.save("converted.pdf");

    setStatus("PDF created.", "green");

}
