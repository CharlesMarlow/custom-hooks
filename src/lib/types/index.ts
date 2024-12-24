export type Post = {
  id: number;
  title: string;
  body: string;
};

export interface CounterTracker {
  count: number;
  lastClick: number | null;
}

export type ApiError = {
  message: string;
  status: number;
};
