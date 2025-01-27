import { NextRequest, NextResponse, userAgent } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { RegisterLinkClickUseCase } from '@/@core/application/useCases/RegisterLinkClick/RegisterLinkClickUseCase';
import { ValidationError } from '@/@core/domain/errors/ValidationError';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: 'Link ID is required' },
        { status: 400 }
      );
    }

    const userIP =
      request.headers.get('X-User-IP') || request.ip || '127.0.0.1';
    const geoDataResponse = await fetch(`https://ipinfo.io/${userIP}/json`);
    const geoData = await geoDataResponse.json();

    const user = userAgent(request);

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID (owner) is required in the request body' },
        { status: 400 }
      );
    }

    const registerLinkClickUseCase = container.get<RegisterLinkClickUseCase>(
      'RegisterLinkClickUseCase'
    );

    await registerLinkClickUseCase.execute({
      linkId: id,
      userId,
      ip: userIP,
      city: geoData.city || 'Unknown',
      region: geoData.region || 'Unknown',
      country: geoData.country || 'Unknown',
      userAgent: user.ua || 'Unknown',
      os: user.os.name || 'Unknown',
      browser: user.browser.name || 'Unknown',
      screen: 'Unknown',
    });

    return NextResponse.json(
      { message: 'Link click registered' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Failed to register link click' },
      { status: 500 }
    );
  }
}
