document.getElementById('generateBtn').addEventListener('click', () => {
    const businessName = document.getElementById('businessName').value;
    const kraPin = document.getElementById('kraPin').value;
    const item = document.getElementById('item').value;
    const price = parseFloat(document.getElementById('price').value);
    const vatRate = parseFloat(document.getElementById('vatRate').value);

    // Calculate VAT and totals
    const vatAmount = (price * vatRate) / 116; // VAT portion from total
    const subtotal = price - vatAmount;

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // generate random business pin
    function generateBusinessPin() {
        const businessPrefix = 'PO'
        const randomNumb = Math.floor(500000000 + Math.random() * 800000000)
        return businessPrefix + randomNumb;
    }

    const bizPin = generateBusinessPin();

    // generate serial no
    function generateCNumber() {
        const prefix = 'KRAM'
        const randomPart = Math.floor(100000000000000 + Math.random() * 900000000000000);
        return prefix + randomPart
    }

    const serial = generateCNumber()

    // generating the qr code
    const qrData = `Business: ${businessName}\nPIN: ${kraPin}\nInvoice: ${serial}\nAmount: ${price}\nDate: ${date}`;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;


    // Generate Receipt HTML
    const receiptHTML = `
        <div class="center bold">${businessName}</div>
        <div class="center">P.O BOX 312 - 10100</div>
        <DIV class="center">NYERI</DIV>
        <div class="center">PIN: ${kraPin}</div>
        <div class="line"></div>
        <div class="bizpin"> PIN: ${bizPin}</div>
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
        <div class="center">CU INVOICE NUMBER: ${Math.floor(1000000000000000 + Math.random() * 900000000000000)}</div>
        <br />
        <div class="qr center"><img src="${qrUrl}" alt="QR Code"></div>
        <br />
        <div class="center">${date} ${time}</div>
        <div class="center bold">FISCAL RECEIPT</div>
    `;

    document.getElementById('receiptPreview').innerHTML = receiptHTML;
});

