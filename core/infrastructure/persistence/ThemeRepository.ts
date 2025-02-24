import { injectable } from 'inversify';
import { Theme } from '@core/domain/entities/Theme';
import { IThemeRepository } from '@core/domain/repositories/IThemeRepository';
import { prisma } from '@core/shared/infrastructure/persistence/prisma';
import { ThemeMapper } from '@core/infrastructure/mappers/ThemeMapper';
import { BackgroundMapper } from '../mappers/BackgroundMapper';
import { ButtonStyleMapper } from '../mappers/ButtonStyleMapper';
import { FontStyleMapper } from '../mappers/FontStyleMapper';

@injectable()
export class ThemeRepository implements IThemeRepository {
  async getThemes(): Promise<Theme[]> {
    try {
      const themes = await prisma.theme.findMany({
        include: {
          background: true,
          buttonStyle: true,
          fontStyle: true,
        },
      });
      return themes.map((theme) => ThemeMapper.toDomain(theme));
    } catch (error) {
      throw error;
    }
  }
  async findThemeById(id: string): Promise<Theme | null> {
    try {
      const theme = await prisma.theme.findUnique({
        where: { id },
        include: {
          background: true,
          buttonStyle: true,
          fontStyle: true,
        },
      });
      return theme ? ThemeMapper.toDomain(theme) : null;
    } catch (error) {
      throw error;
    }
  }
  async findThemeByUserId(userId: string): Promise<Theme | null> {
    try {
      const userWithTheme = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          theme: {
            include: { background: true, buttonStyle: true, fontStyle: true },
          },
        },
      });
      return userWithTheme?.theme
        ? ThemeMapper.toDomain(userWithTheme.theme)
        : null;
    } catch (error) {
      throw error;
    }
  }
  async createTheme(theme: Theme): Promise<Theme> {
    try {
      const persistenceTheme = ThemeMapper.toPersistence(theme);
      const createdTheme = await prisma.$transaction(async (tx) => {
        const createdBackground = await tx.background.create({
          data: BackgroundMapper.toPersistence(theme.background),
        });

        const createdButtonStyle = await tx.buttonStyle.create({
          data: ButtonStyleMapper.toPersistence(theme.buttonStyle),
        });

        const createdFontStyle = await tx.fontStyle.create({
          data: FontStyleMapper.toPersistence(theme.fontStyle),
        });

        persistenceTheme.backgroundId = createdBackground.id;
        persistenceTheme.buttonStyleId = createdButtonStyle.id;
        persistenceTheme.fontStyleId = createdFontStyle.id;

        return await tx.theme.create({
          data: persistenceTheme,
          include: {
            background: true,
            buttonStyle: true,
            fontStyle: true,
          },
        });
      });

      return ThemeMapper.toDomain(createdTheme);
    } catch (error) {
      throw error;
    }
  }
  async updateTheme(theme: Theme): Promise<Theme> {
    try {
      const persistenceTheme = ThemeMapper.toPersistence(theme);

      const updatedTheme = await prisma.$transaction(async (tx) => {
        await tx.background.update({
          where: { id: theme.background.id.toString() },
          data: BackgroundMapper.toPersistence(theme.background),
        });

        await tx.buttonStyle.update({
          where: { id: theme.buttonStyle.id.toString() },
          data: ButtonStyleMapper.toPersistence(theme.buttonStyle),
        });

        await tx.fontStyle.update({
          where: { id: theme.fontStyle.id.toString() },
          data: FontStyleMapper.toPersistence(theme.fontStyle),
        });

        return await tx.theme.update({
          where: { id: theme.id.toString() },
          data: persistenceTheme,
          include: {
            background: true,
            buttonStyle: true,
            fontStyle: true,
          },
        });
      });

      return ThemeMapper.toDomain(updatedTheme);
    } catch (error) {
      throw error;
    }
  }
}
