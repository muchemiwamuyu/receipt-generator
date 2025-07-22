const modal = document.getElementById("confirmModal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

let receiptData = {}; // Temporary store

document.getElementById("generateBtn").addEventListener("click", () => {
  const businessName = document.getElementById("businessName").value;
  const kraPin = document.getElementById("kraPin").value;
  const item = document.getElementById("item").value;
  const price = parseFloat(document.getElementById("price").value);

  receiptData = { businessName, kraPin, item, price };

  // Prefill modal fields
  document.getElementById("poBox").value = "P.O. Box 312-00100";
  document.getElementById("editPrice").value = price;

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("editDate").value = today;

  modal.style.display = "flex";
});

confirmBtn.addEventListener("click", () => {
  const poBox = document.getElementById("poBox").value;
  const newPrice = parseFloat(document.getElementById("editPrice").value);
  const selectedDate = document.getElementById("editDate").value;

  modal.style.display = "none";

  generateReceipt(
    receiptData.businessName,
    receiptData.kraPin,
    receiptData.item,
    newPrice,
    poBox,
    selectedDate
  );
});


// Cancel action
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

function generateReceipt(businessName, kraPin, item, price, poBox, selectedDate) {
  const vatRate = parseFloat(document.getElementById("vatRate").value);
  const vatAmount = 0.00
  const subtotal = price;

  const date = selectedDate || new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const bizPin = generateBusinessPin();
  const serial = generateCNumber();

  const qrData = `Business: ${businessName}\nPIN: ${kraPin}\nInvoice: ${serial}\nAmount: ${price}\nDate: ${date}`;

  const receiptHTML = `
    <div class="center bold">${businessName}</div>
    <div class="center">${poBox}</div>
    <div class="center">PIN: ${kraPin}</div>
    <div class="line"></div>
    <div class="businessPin">PIN: ${bizPin}</div>
    <div class="center bold">FISCAL RECEIPT</div>
    <div class="line"></div>
    <table style="width:100%;">
        <tr><td>${item}</td><td class="right">${price.toFixed(2)}</td></tr>
        <tr><td>SUBTOTAL</td><td class="right">${subtotal.toFixed(2)}</td></tr>
    </table>
    <div class="line"></div>
    <table style="width:100%;">
        <tr><td class="bold">TOTAL</td><td class="right bold">${price.toFixed(2)}</td></tr>
        <tr><td>TOTAL TAX A</td><td class="right">${vatAmount.toFixed(2)}</td></tr>
        <tr><td>TOTAL TAXES</td><td class="right">${vatAmount.toFixed(2)}</td></tr>
    </table>
    <div class="line"></div>
    <table style="width:100%;">
        <tr><td class="left">CASH</td><td class="right">${price.toFixed(2)}</td></tr>
        <tr><td class="left">01 ARTICLES</td><td class="right"></td></tr>
    </table>
    <div class="line"></div>
    <div class="center">- Control Unit Info -</div>
    <div class="center">CU S/No: ${serial}</div>
    <div class="center">CU INVOICE NUMBER: ${Math.floor(10000000000 + Math.random() * 50000000000)}</div>
    <br />
    <div id="qrCode" class="centqr"></div>
    <br />
    <div class="center">${date} ${time}</div>
    <div class="center bold">FISCAL RECEIPT</div>
  `;

  document.getElementById("receiptPreview").innerHTML = receiptHTML;
  new QRCode(document.getElementById("qrCode"), { text: qrData, width: 120, height: 120 });
}

function generateBusinessPin() {
  const prefix = "PO";
  const randomNumb = Math.floor(500000000 + Math.random() * 800000000);
  return prefix + randomNumb;
}

function generateCNumber() {
  const prefix = "KRAM";
  const randomPart = Math.floor(100000000000000 + Math.random() * 900000000000000);
  return prefix + randomPart;
}

// PDF Download
document.getElementById("downloadBtn").addEventListener("click", () => {
  const receiptPreviews = document.getElementById("receiptPreview");
  const businessName = document.getElementById("businessName").value.trim() || "ETR_Receipt";

  html2canvas(receiptPreviews).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const imgWidth = 200;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    pdf.addImage(imgData, "PNG", x, 40, imgWidth, 0);
    pdf.save(`${businessName.replace(/\\s+/g, '_')}_Receipt.pdf`);
  });
});
