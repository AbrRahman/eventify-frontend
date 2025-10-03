export type TErrorResponse = {
  success: false;
  message: string;
  errorSource: { path: string; message: string }[];
  stack: string;
  error: {
    code: number;
    keyValue?: Record<string, string>;
    keyPattern?: Record<string, number>;
  };
};
