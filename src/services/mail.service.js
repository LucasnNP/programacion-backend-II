import { transporter } from "../config/mailing.js";

export const sendPasswordRecoveryEmail = async (email, recoveryLink) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Recuperación de contraseña",

    html: `
        <h2>Recuperación de contraseña</h2>
        
        <p>Hola, parece que has olvidado tu contraseña :(</p>
        <p>No te preocupes, hacé click en el siguiente botón para restablecer tu contraseña:</p>
        
        <a href="${recoveryLink}">
            <button>
                Recuperar contraseña
            </button>
        </a>

        <p>
            Este enlace expirará en 1 hora.
        </p>
    `,
  });
};
