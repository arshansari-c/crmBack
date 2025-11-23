export const estimateEmailTemplate = ({
  customerName,
  estimateNumber,
  subtotal,
  discount,
  tax,
  total,
}) => {
  return `
  <div style="font-family:Arial, sans-serif; color:#333; padding:20px;">
    <h2 style="color:#2c3e50;">Hello ${customerName},</h2>
    <p>We’ve prepared a new <strong>estimate</strong> for you.</p>
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; margin-top:15px;">
      <tr style="background-color:#f4f4f4;">
        <td><strong>Estimate Number</strong></td>
        <td>${estimateNumber}</td>
      </tr>
      <tr>
        <td>Subtotal</td>
        <td>₹${subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Discount</td>
        <td>₹${discount.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Tax</td>
        <td>₹${tax.toFixed(2)}</td>
      </tr>
      <tr style="background-color:#f9f9f9;">
        <td><strong>Total</strong></td>
        <td><strong>₹${total.toFixed(2)}</strong></td>
      </tr>
    </table>
    <p style="margin-top:25px;">Thank you for choosing <strong>Lets Go</strong>!</p>
  </div>
  `;
};
