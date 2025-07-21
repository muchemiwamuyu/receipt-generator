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

    // function for generating  CU s/no
    function generateSKraSNumber(count, min, max) {
        const numbers = []

        for(let i = 0; i < count; i++) {
            const random = Math.floor(Math.random() * (max - min + 1 )) + min;
            numbers.push(random)
        }

        return numbers
    }

    generateSKraSNumber(14, 0, 5)

    // Generate Receipt HTML
    const receiptHTML = `
        <div class="center bold">${businessName}</div>
        <div class="center">PIN: ${kraPin}</div>
        <div class="line"></div>
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
        <div>CASH <span class="right">${price.toFixed(2)}</span></div>
        <div>01 ARTICLES</div>
        <div class="line"></div>
        <div class="center">- Control Unit Info -</div>
        <div class="center" id='serial'>CU S/No: KRAM</div>
        <div class="center" id=''>CU INVOICE NUMBER: 0044848445454544454</div>
        <div class="center">${date} ${time}</div>
        <div class="center bold">FISCAL RECEIPT</div>
    `;

    const displaySerial = document.getElementById('serial')

    document.addEventListener('DOMContentLoaded', () => {
        const numbers = generateSKraSNumber(14, 1, 5) // generate dummy
        displaySerial.textContent = numbers.join(',')
    })

    document.getElementById('receiptPreview').innerHTML = receiptHTML;
});
