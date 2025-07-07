import { NextApiRequest, NextApiResponse } from 'next';
import { RecaptchaService } from '@/services/recaptchaService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ 
      success: false, 
      message: 'Token de reCAPTCHA requerido' 
    });
  }
  
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({
      success: false,
      message: 'Configuración del servidor incompleta'
    });
  }

  try {
    const recaptchaService = new RecaptchaService(secretKey, 0.6);
    const result = await recaptchaService.verifyToken(token);

    return res.status(200).json({
      success: true,
      message: 'Validacion de token exitosa',
      data: result,
    });

  } catch (error) {
    console.error('❌ Error en el endpoint:', error);
    return res.status(400).json({
      success: false,
      message: (error instanceof Error ? error.message : 'Error al procesar el formulario'),
    });
  }
}