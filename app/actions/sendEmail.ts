"use server";

import { Resend } from "resend";

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// El dominio desde donde envías (Debe estar verificado en Resend)
// Por ejemplo: contacto@tudominio.com
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev"; 

// A dónde te llegarán los leads a ti como administrador
const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "tu@correo.com"; 

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

    // =========================================================
    // 1. PLANTILLA HTML PARA EL ADMINISTRADOR (Lo que tú recibes)
    // =========================================================
    const adminHtmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
           <h2 style="color: #0f172a; margin: 0;">FLYDEV</h2>
           <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Nuevo lead / solicitud de presupuesto</p>
        </div>
        <div style="border-top: 2px solid #22d3ee; padding-top: 20px;">
          <p><strong>Servicio de Interés:</strong> ${data.serviceTitle}</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${data.name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #22d3ee;">${data.email}</a></p>
            <p style="margin: 0;"><strong>Empresa / Proyecto:</strong> ${data.company || 'No especificado'}</p>
          </div>
          <h3 style="color: #0f172a; margin-bottom: 10px;">Detalles de la solicitud:</h3>
          <p style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-style: italic; white-space: pre-wrap; line-height: 1.5;">${data.details}</p>
        </div>
      </div>
    `;

    // =========================================================
    // 2. PLANTILLA HTML PARA EL CLIENTE (Confirmación Automática)
    // =========================================================
    const clientHtmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 30px; color: #1e293b; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
           <h2 style="color: #0f172a; margin: 0; font-size: 28px; letter-spacing: -1px;">FLYDEV</h2>
           <div style="height: 4px; width: 40px; background-color: #22d3ee; margin: 15px auto; border-radius: 2px;"></div>
        </div>
        <h3 style="color: #0f172a; font-size: 20px; font-weight: 600;">¡Hola, ${data.name.split(' ')[0]}! 👋</h3>
        <p style="line-height: 1.6; color: #475569;">
          Hemos recibido correctamente tu solicitud de presupuesto para nuestro servicio de <strong>${data.serviceTitle}</strong>. 
        </p>
        <p style="line-height: 1.6; color: #475569;">
          Nuestro equipo ya está revisando los detalles de tu proyecto. Nos pondremos en contacto contigo lo antes posible para darte una asesoría personalizada y armar una propuesta a tu medida.
        </p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Resumen de tu solicitud</h4>
          <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;"><strong>Servicio:</strong> ${data.serviceTitle}</p>
          <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;"><strong>Empresa:</strong> ${data.company || 'N/A'}</p>
          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;"><strong>Detalles proporcionados:</strong><br/> ${data.details}</p>
        </div>
        <p style="line-height: 1.6; color: #475569;">
          Si olvidaste incluir algún detalle o tienes alguna duda adicional mientras tanto, puedes responder directamente a este correo.
        </p>
        <p style="line-height: 1.6; color: #475569; margin-top: 30px;">
          Saludos cordiales,<br/>
          <strong>El equipo de Flydev</strong>
        </p>
      </div>
    `;

    // =========================================================
    // 3. ENVIAR AMBOS CORREOS EN PARALELO CON RESEND
    // =========================================================
    const [adminEmailResult, clientEmailResult] = await Promise.all([
      // Correo para ti (Administrador)
      resend.emails.send({
        from: `Flydev Web <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        replyTo: data.email, // Si le das a "Responder", le contestas al cliente
        subject: `🔥 Nuevo Presupuesto: ${data.serviceTitle} - ${data.name}`,
        html: adminHtmlTemplate,
      }),
      
      // Correo de confirmación automática para el Cliente
      resend.emails.send({
        from: `Flydev <${FROM_EMAIL}>`,
        to: data.email, // Correo del cliente
        subject: `Hemos recibido tu solicitud - Flydev`,
        html: clientHtmlTemplate,
      })
    ]);

    // Verificar si Resend devolvió algún error en alguno de los dos envíos
    if (adminEmailResult.error) {
      console.error("Resend API Error (Admin):", adminEmailResult.error);
      return { success: false, error: "Error al notificar al administrador." };
    }
    if (clientEmailResult.error) {
      console.error("Resend API Error (Client):", clientEmailResult.error);
      // Opcional: Podrías retornar success aunque el correo al cliente falle,
      // pero para ser estrictos, marcamos error.
      return { success: false, error: "Error al enviar la confirmación al cliente." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    return { success: false, error: "Hubo un error crítico al enviar el mensaje. Intenta más tarde." };
  }
}
