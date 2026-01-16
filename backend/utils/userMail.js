function userMail(otp) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>
</head>

<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:40px 0;">
  <tr>
    <td align="center">

      <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="background:#0d6efd;padding:24px;text-align:center;color:#ffffff;">
            <h1 style="margin:0;font-size:22px;font-weight:600;">
              OTP Verification
            </h1>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px 30px;text-align:center;">
            
            <div style="
              display:inline-block;
              padding:16px 30px;
              font-size:26px;
              font-weight:700;
              letter-spacing:6px;
              color:#0d6efd;
              border:2px solid #0d6efd;
              border-radius:10px;
              background:#f9fbff;
            ">
              ${otp}
            </div>

            <p style="margin-top:20px;font-size:13px;color:#777;">
              OTP is valid for 10 minutes.  
              Please do not share it with anyone.
            </p>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
  `;
}

module.exports = userMail;
