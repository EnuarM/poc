interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

interface VerificationResult {
  success: boolean;
  score: number;
  message: string;
  action?: string;
  errors?: string[];
}

export class RecaptchaService {
  private readonly secretKey: string;
  private readonly scoreThreshold: number;

  constructor(secretKey: string, scoreThreshold: number = 0.5) {
    this.secretKey = secretKey;
    this.scoreThreshold = scoreThreshold;
  }

  async verifyToken(token: string): Promise<VerificationResult> {
    try {
      const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const verifyParams = new URLSearchParams({
        secret: this.secretKey,
        response: token,
      });

      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: verifyParams,
      });

      const recaptchaData: RecaptchaResponse = await response.json();

      if (!recaptchaData.success) {
        return {
          success: false,
          score: recaptchaData.score || 0,
          message: 'Verificación de reCAPTCHA fallida',
          errors: recaptchaData['error-codes'],
        };
      }

      if (recaptchaData.score < this.scoreThreshold) {
        return {
          success: false,
          score: recaptchaData.score,
          message: `Score de seguridad insuficiente: ${recaptchaData.score}`,
        };
      }

      return {
        success: true,
        score: recaptchaData.score,
        message: 'Verificación exitosa',
        action: recaptchaData.action,
      };

    } catch (error) {
      console.error('❌ Error al verificar reCAPTCHA:', error);
      throw new Error('Error interno al verificar reCAPTCHA');
    }
  }
}