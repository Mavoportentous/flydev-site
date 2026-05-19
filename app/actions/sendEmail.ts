"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  details: string;
  serviceTitle: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Basic validation
    if (!data.name || !data.email || !data.details) {
      return { success: false, error: "Por favor, completa todos los campos requeridos." };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Flydev Web" <${process.env.SMTP_USER}>`, // Usar el mismo correo autenticado como remitente para evitar bloqueos por SPAM
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // A dónde te llegará el correo
      replyTo: data.email, // Cuando le des a "Responder", le contestará al cliente
      subject: `🔥 Nuevo Presupuesto: ${data.serviceTitle} - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #22d3ee; padding-bottom: 10px;">Nueva Solicitud de Presupuesto</h2>
          <p><strong>Servicio solicitado:</strong> ${data.serviceTitle}</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${data.name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 0;"><strong>Empresa / Proyecto:</strong> ${data.company || 'No especificado'}</p>
          </div>
          <h3 style="color: #0f172a;">Detalles de la solicitud:</h3>
          <p style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-style: italic; white-space: pre-wrap;">${data.details}</p>
          <p style="font-size: 12px; color: #64748b; margin-top: 30px; text-align: center;">Este mensaje fue enviado desde el formulario de contacto de Flydev.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    return { success: false, error: "Hubo un problema al enviar el correo. Revisa la configuración de SMTP." };
  }
}
