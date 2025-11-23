export const invoiceEmailTemplate = ({
  customerName,
  invoiceNumber,
  subtotal,
  discount,
  tax,
  total,
  dueDate,
}) => {
  return `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f8f9fa; padding: 40px;">
    <div style="max-width: 650px; background: #fff; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div style="background-color: #d32f2f; color: #fff; padding: 20px 30px;">
        <h2 style="margin: 0;">Lets Go — Invoice</h2>
        <p style="margin: 5px 0 0;">Invoice Number: <strong>${invoiceNumber}</strong></p>
      </div>

      <div style="padding: 30px;">
        <p>Hi <strong>${customerName}</strong>,</p>
        <p>Thank you for choosing <strong>Lets Go</strong>! Below are the details of your invoice.</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">Subtotal:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">Discount:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${discount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">Tax:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 2px solid #000;"><strong>Total:</strong></td>
              <td style="padding: 10px; border-bottom: 2px solid #000; text-align: right;"><strong>₹${total.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p style="margin-top: 25px;">Payment Due Date: <strong>${new Date(dueDate).toLocaleDateString()}</strong></p>

        <div style="margin-top: 30px; padding: 15px; background-color: #f1f1f1; border-radius: 8px;">
          <p style="margin: 0; color: #555;">Please make your payment before the due date to avoid any late charges.</p>
        </div>

        <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br><strong>The Lets Go Team</strong></p>
      </div>

      <div style="background-color: #f5f5f5; text-align: center; padding: 15px; color: #888; font-size: 13px;">
        © ${new Date().getFullYear()} Lets Go. All rights reserved.
      </div>
    </div>
  </div>
  `;
};
