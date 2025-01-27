import { prisma } from '@/lib/prisma';

export async function logVisitorInfo(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return;

  const visitorInfo = {
    userId: user.id,
    ipAddress: window.location.hostname,
    userAgent: navigator.userAgent,
    referrer: document.referrer || null,
  };

  await prisma.visitorLog.create({
    data: visitorInfo,
  });
}
