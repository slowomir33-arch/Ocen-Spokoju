import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      contactReason: formData.get('contactReason') as string,
      city: formData.get('city') as string,
      date: formData.get('date') as string,
      message: formData.get('message') as string,
    };

    // Prepare email content
    const emailSubject = data.contactReason === 'reservation' 
      ? `🌊 Nowa rezerwacja: ${data.name}` 
      : `💬 Nowa wiadomość od: ${data.name}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">Ocean Spokoju - Nowa wiadomość z formularza</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Imię i nazwisko:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Temat:</strong> ${data.contactReason === 'reservation' ? 'Rezerwacja udziału w wydarzeniu' : 'W innej sprawie'}</p>
          ${data.city ? `<p><strong>Miejscowość:</strong> ${data.city}</p>` : ''}
          ${data.date ? `<p><strong>Data:</strong> ${data.date}</p>` : ''}
        </div>

        ${data.message ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Treść wiadomości:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        ` : ''}

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        
        <p style="color: #6b7280; font-size: 14px;">
          Wiadomość wysłana przez formularz kontaktowy na stronie oceanspokoju.studio
        </p>
      </div>
    `;

    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'kontakt@oceanspokoju.studio',
      to: process.env.EMAIL_TO || 'kontakt@oceanspokoju.studio',
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Wystąpił błąd podczas wysyłania wiadomości.' 
      }, { status: 200 }); // Return 200 to avoid CORS/fetch errors
    }

    console.log('Email sent successfully:', emailData);

    return NextResponse.json({ 
      success: true, 
      message: 'Wiadomość wysłana pomyślnie! Odpowiemy najszybciej jak to możliwe.' 
    }, { status: 200 });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Wystąpił błąd podczas wysyłania wiadomości.' 
    }, { status: 500 });
  }
}
