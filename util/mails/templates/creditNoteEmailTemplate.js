export const creditNoteEmailTemplate = ({
  customerName,
  creditNoteNumber,
  subtotal,
  discount,
  adjustment,
  total,
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Credit Note - ${creditNoteNumber}</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        max-width: 650px;
        background: #fff;
        margin: 30px auto;
        border-radius: 8px;
        box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .header {
        background-color: #e63946;
        color: #fff;
        padding: 20px 30px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px;
      }
      .content h2 {
        margin-top: 0;
        color: #444;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      .table th, .table td {
        text-align: left;
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }
      .table th {
        background-color: #f2f2f2;
      }
      .total {
        font-size: 18px;
        font-weight: bold;
        text-align: right;
        margin-top: 20px;
        color: #222;
      }
      .footer {
        background-color: #f5f5f5;
        padding: 15px 30px;
        text-align: center;
        font-size: 14px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Credit Note</h1>
        <p>${creditNoteNumber}</p>
      </div>
      <div class="content">
        <h2>Hello ${customerName},</h2>
        <p>We’ve issued a credit note for your recent invoice. Please find the summary below:</p>

        <table class="table">
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Subtotal</td>
            <td>₹${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Discount</td>
            <td>- ₹${discount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Adjustment</td>
            <td>- ₹${adjustment?.toFixed(2) || "0.00"}</td>
          </tr>
        </table>

        <div class="total">Total Credit: ₹${total.toFixed(2)}</div>

        <p>If you have any questions, feel free to contact our support team.</p>
      </div>

      <div class="footer">
        <p>Thank you for choosing <strong>Lets Go CRM</strong></p>
      </div>
    </div>
  </body>
  </html>
  `;
};
