function sendInvoices() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Invoices'); // Change sheet name if needed
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  // Column indices
  const BILL_NO = headers.indexOf("Bill No");
  const CLIENT_NAME = headers.indexOf("Client Name");
  const CLIENT_ADDRESS = headers.indexOf("Client Address");
  const MONTH = headers.indexOf("Month");
  const YEAR = headers.indexOf("Year");
  const AMOUNT = headers.indexOf("Amount");
  const AMOUNT_WORDS = headers.indexOf("Amount in Words");
  const EMAIL = headers.indexOf("Email");
  const SEND = headers.indexOf("Send");

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[SEND] === true) {
      const pdf = generateInvoicePDF(
        row[BILL_NO], row[CLIENT_NAME], row[CLIENT_ADDRESS],
        row[MONTH], row[YEAR], row[AMOUNT], row[AMOUNT_WORDS]
      );

      GmailApp.sendEmail(
        row[EMAIL],
        `Invoice for ${row[MONTH]} - ${row[BILL_NO]}`,
        `Dear ${row[CLIENT_NAME]},\n\nPlease find attached your invoice for ${row[MONTH]}.\n\nBest regards,\nFEX STOCK`,
        {
          attachments: [pdf],
          name: "FEX STOCK Invoicing Bot"
        }
      );

      // Mark as sent
      sheet.getRange(i + 1, SEND + 1).setValue(false);
    }
  }
}

function generateInvoicePDF(billNo, clientName, clientAddress, month, year, amount, amountWords) {
  const dateToday = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy");

  const htmlContent = `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header, .footer { text-align: center; }
        .invoice-box {
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
          padding: 20px 0;
          margin-top: 20px;
        }
        .section { margin-bottom: 20px; }
        .right { text-align: right; }
        .bold { font-weight: bold; }
        pre { font-family: Arial, sans-serif; white-space: pre-wrap; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>FEX - STOCK</h2>
        <p>Providing Online Consultancy on Forex and Money Market</p>
        <p>45/9D Vivekananda Sarani, Kolkata - 700 078</p>
      </div>

      <div class="section">
        <p><strong>Bill No:</strong> ${billNo} &nbsp;&nbsp;&nbsp;&nbsp; <strong>Date:</strong> ${dateToday}</p>
        <p><strong>To:</strong><br>
        <pre>${clientName}
${clientAddress}</pre></p>
      </div>

      <div class="invoice-box">
        <p><strong>PARTICULARS</strong></p>
        <p>Being the professional fees for Consultancy of<br>
        ACCOUNTANCY on FOREX Transaction,<br>
        Accounting and Procedures for the Month of ${month} ${year}.</p>
        <br>
        <p class="right bold">AMOUNT (Rs)</p>
        <p class="right">${Number(amount).toFixed(2)}</p>
        <hr>
        <p class="right bold">TOTAL</p>
        <p class="right bold">${Number(amount).toFixed(2)}</p>
        <p>Rupees ${amountWords}</p>
      </div>

      <div class="section">
        <p>Cheque should be issued in favour of <strong>M/S FEX STOCK</strong></p>
        <p>PAN No : AYIPB7723R<br>
        PROP NAME : Mrs Susmita Bhattacharjee</p>
        <br><br>
        <p><strong>For FEX STOCK</strong><br>
        Susmita Bhattacharjee<br>
        PROPRIETOR</p>
      </div>
    </body>
  </html>`;

  const blob = Utilities.newBlob(htmlContent, 'text/html')
                        .getAs('application/pdf')
                        .setName(`Invoice_${billNo}_${month}.pdf`);
  return blob;
}
