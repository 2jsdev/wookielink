import { createCanvas, loadImage } from 'canvas';

export async function generateImagePreviewBuffer(
  username: string,
  userImageUrl: string | null,
  bgColor: string
): Promise<Buffer | null> {
  try {
    const width = 800;
    const height = 418;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const textColor = isLightColor(bgColor) ? '#000000' : '#FFFFFF';

    const avatarSize = 128;
    const centerX = width / 2;

    const totalContentHeight = avatarSize + 36 + 24 + 40;
    const startY = (height - totalContentHeight) / 2;

    if (userImageUrl) {
      try {
        const img = await loadImage(userImageUrl);

        ctx.beginPath();
        ctx.arc(
          centerX,
          startY + avatarSize / 2,
          avatarSize / 2 + 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(
          centerX,
          startY + avatarSize / 2,
          avatarSize / 2,
          0,
          Math.PI * 2
        );
        ctx.clip();
        ctx.drawImage(
          img,
          centerX - avatarSize / 2,
          startY,
          avatarSize,
          avatarSize
        );
        ctx.restore();
      } catch (e) {
        console.warn('Could not load user image:', e);
      }
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(username, centerX, startY + avatarSize + 50);

    ctx.font = '24px sans-serif';
    ctx.fillText(`✱ /${username}`, centerX, startY + avatarSize + 90);

    return canvas.toBuffer('image/png');
  } catch (err) {
    console.error('Image generation failed:', err);
    return null;
  }
}

function isLightColor(hex: string): boolean {
  const color = hex.replace('#', '');
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 155;
}
