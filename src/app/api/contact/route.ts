import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      contactReason: formData.get('contactReason'),
      city: formData.get('city'),
      date: formData.get('date'),
      message: formData.get('message'),
    };

    // TODO: Tutaj później dodamy integrację z Resend
    // Na razie tylko logujemy
    console.log('Form submission:', data);

    // Symulujemy sukces
    return NextResponse.json({ 
      success: true, 
      message: 'Wiadomość wysłana pomyślnie!' 
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Wystąpił błąd podczas wysyłania wiadomości.' 
    }, { status: 500 });
  }
}
