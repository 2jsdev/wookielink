import { NextResponse } from 'next/server';
import { prisma } from '@/@core/infra/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get('tab');

  if (!tab || (tab !== 'country' && tab !== 'city')) {
    return NextResponse.json(
      { error: "Invalid tab value. Must be 'country' or 'city'." },
      { status: 400 }
    );
  }

  try {
    let data;

    if (tab === 'country') {
      const pageViews = await prisma.pageView.groupBy({
        by: ['country'],
        _count: { id: true },
      });

      const clicks = await prisma.linkInteraction.groupBy({
        by: ['country'],
        _count: { id: true },
      });

      data = pageViews.map((view) => {
        const countryClicks =
          clicks.find((click) => click.country === view.country)?._count?.id ||
          0;

        const clickRate = view._count.id
          ? ((countryClicks / view._count.id) * 100).toFixed(2) + '%'
          : '0%';

        return {
          country: view.country || 'Unknown',
          pageViews: view._count.id,
          clicks: countryClicks,
          clickRate,
        };
      });
    } else if (tab === 'city') {
      const pageViews = await prisma.pageView.groupBy({
        by: ['city'],
        _count: { id: true },
      });

      const clicks = await prisma.linkInteraction.groupBy({
        by: ['city'],
        _count: { id: true },
      });

      data = pageViews.map((view) => {
        const cityClicks =
          clicks.find((click) => click.city === view.city)?._count?.id || 0;

        const clickRate = view._count.id
          ? ((cityClicks / view._count.id) * 100).toFixed(2) + '%'
          : '0%';

        return {
          city: view.city || 'Unknown',
          pageViews: view._count.id,
          clicks: cityClicks,
          clickRate,
        };
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
