export const ProposalTemplate = ({
  subject,
  related,
  customerId,
  openTill,
  discountType,
  status,
  city,
  state,
  country,
  zipCode,
  email,
  phone,
  packages,
  subTotal,
  discount,
  total,
}) => {
  return `
  <div style="font-family:Arial, sans-serif; background:#f8f9fa; padding:30px;">
    <div style="max-width:700px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <div style="background:#0d6efd; color:#fff; text-align:center; padding:20px;">
        <h2>📄 New Proposal Created</h2>
      </div>
      <div style="padding:25px;">
        <h3 style="color:#333;">Proposal Details</h3>
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <tr><td><b>Subject:</b></td><td>${subject}</td></tr>
          <tr><td><b>Related:</b></td><td>${related}</td></tr>
          <tr><td><b>Customer ID:</b></td><td>${customerId}</td></tr>
          <tr><td><b>Status:</b></td><td>${status}</td></tr>
          <tr><td><b>Open Till:</b></td><td>${openTill}</td></tr>
          <tr><td><b>Discount Type:</b></td><td>${discountType}</td></tr>
          <tr><td><b>Sub Total:</b></td><td>₹${subTotal}</td></tr>
          <tr><td><b>Discount:</b></td><td>${discount}%</td></tr>
          <tr><td><b>Total:</b></td><td><b>₹${total}</b></td></tr>
        </table>

        <h3 style="color:#333; margin-top:25px;">Customer Info</h3>
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <tr><td><b>Email:</b></td><td>${email}</td></tr>
          <tr><td><b>Phone:</b></td><td>${phone}</td></tr>
          <tr><td><b>City:</b></td><td>${city}</td></tr>
          <tr><td><b>State:</b></td><td>${state}</td></tr>
          <tr><td><b>Country:</b></td><td>${country}</td></tr>
          <tr><td><b>ZIP Code:</b></td><td>${zipCode}</td></tr>
        </table>

        <h3 style="color:#333; margin-top:25px;">Package Details</h3>
        <pre style="background:#f1f1f1; padding:15px; border-radius:8px; overflow:auto; font-size:14px;">
${JSON.stringify(packages, null, 2)}
        </pre>
      </div>
      <div style="background:#f1f1f1; text-align:center; padding:15px; color:#777; font-size:12px;">
        © ${new Date().getFullYear()} Lets Go | Proposal Management System
      </div>
    </div>
  </div>
  `;
};
