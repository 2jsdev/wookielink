'use server';

import { container } from '@core/infrastructure/ioc/container';
import { RegisterActivityUseCase } from '@core/application/useCases/RegisterActivity/RegisterActivityUseCase';
import { ActionResponse } from '@/interfaces/server-action-response';
import { Activity, ActivityType } from '@/interfaces/activity';

export interface Props {
  type: ActivityType;
  userId: string;
  linkId: string;
  ip: string;
  screen: string;
  userAgent: string;
  os: string;
  browser: string;
}

export async function registerActivity({
  type,
  linkId,
  userId,
  ip,
  screen,
  userAgent,
  os,
  browser,
}: Props): Promise<ActionResponse<Activity>> {
  try {
    const geoDataResponse = await fetch(`https://ipinfo.io/${ip}/json`);
    const geoData = await geoDataResponse.json();

    const dto = {
      type,
      linkId,
      userId,
      ip,
      city: geoData.city || 'Unknown',
      region: geoData.region || 'Unknown',
      country: geoData.country || 'Unknown',
      userAgent,
      os,
      browser,
      screen,
      loc: geoData.loc || null,
      org: geoData.org || null,
      timezone: geoData.timezone || null,
    };

    const useCase = container.resolve(RegisterActivityUseCase);
    const result = await useCase.execute(dto);

    if (result.isLeft()) {
      return {
        ok: false,
        message: result.value.getErrorValue().message,
        data: null,
      };
    }

    const activity = result.value.getValue();

    return {
      ok: true,
      data: activity.toJSON(),
    };
  } catch (error) {
    console.error('Error registering activity:', error);
    return {
      ok: false,
      message: 'Failed to register activity',
      data: null,
    };
  }
}
