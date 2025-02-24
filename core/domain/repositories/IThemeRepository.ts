import { Theme } from '@core/domain/entities/Theme';

export interface IThemeRepository {
  getThemes(): Promise<Theme[]>;
  findThemeById(id: string): Promise<Theme | null>;
  findThemeByUserId(userId: string): Promise<Theme | null>;
  createTheme(theme: Theme): Promise<Theme>;
  updateTheme(theme: Theme): Promise<Theme>;
}
