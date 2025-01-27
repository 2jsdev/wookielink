import { NextRequest, NextResponse, userAgent } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { GetPublicProfileByUsernameUseCase } from '@/@core/application/useCases/GetPublicProfileByUsername/GetPublicProfileByUsernameUseCase';
import { RegisterPageViewUseCase } from '@/@core/application/useCases/RegisterPageView/RegisterPageViewUseCase';
import { ValidationError } from '@/@core/domain/errors/ValidationError';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { message: 'Username is required' },
        { status: 400 }
      );
    }

    const getPublicProfileByUsernameUseCase =
      container.get<GetPublicProfileByUsernameUseCase>(
        'GetPublicProfileByUsernameUseCase'
      );

    const profile = await getPublicProfileByUsernameUseCase.execute({
      username,
    });

    if (!profile) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userIP =
      request.headers.get('X-User-IP') || request.ip || '127.0.0.1';
    const userScreenResolution = request.headers.get(
      'X-User-Screen-Resolution'
    );
    const geoDataResponse = await fetch(`https://ipinfo.io/${userIP}/json`);
    const geoData = await geoDataResponse.json();
    console.log(geoData);

    const user = userAgent(request);

    const registerPageViewUseCase = container.get<RegisterPageViewUseCase>(
      'RegisterPageViewUseCase'
    );

    await registerPageViewUseCase.execute({
      userId: profile.id,
      ip: userIP,
      city: geoData.city || 'Unknown',
      region: geoData.region || 'Unknown',
      country: geoData.country || 'Unknown',
      userAgent: user.ua || 'Unknown',
      os: user.os.name || 'Unknown',
      browser: user.browser.name || 'Unknown',
      screen: userScreenResolution || 'Unknown',
    });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Failed to fetch user profile or create page view' },
      { status: 500 }
    );
  }
}
