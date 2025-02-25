export interface ActionResponse<T> {
  ok: boolean;
  message?: string;
  data: T | null;
}
