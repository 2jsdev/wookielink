import { auth } from '@/@core/infra/auth';
import { NextResponse } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { GetUserLifetimeMetricsUseCase } from '@/@core/application/useCases/GetUserLifetimeMetrics/GetUserLifetimeMetricsUseCase';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const getUserLifetimeMetricsUseCase =
      container.get<GetUserLifetimeMetricsUseCase>(
        'GetUserLifetimeMetricsUseCase'
      );

    const metrics = await getUserLifetimeMetricsUseCase.execute(userId);

    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch lifetime metrics' },
      { status: 500 }
    );
  }
}
