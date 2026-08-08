const resend = require("../config/resend");

const sendPasswordResetEmail = async (
  email,

  firstName,

  token,
) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",

    to: email,

    subject: "Reset Your Password",

    html: `

            <h2>Hello ${firstName}</h2>

            <p>

            Click below to reset your password.

            </p>

            <a href="${resetLink}">

                Reset Password

            </a>

            <p>

            This link expires in

            15 minutes.

            </p>

        `,
  });
};

module.exports = {
  sendPasswordResetEmail,
};
