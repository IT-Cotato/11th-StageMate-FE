export type ApiResponse<T> = {
  status: string;
  timestamp: string;
  data: T;
};

export type ApiEmpty = Record<string, never>;
