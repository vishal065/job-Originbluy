/* eslint-disable @typescript-eslint/no-explicit-any */

class ApiResponse<T = any> {
  public statusCode: number;
  public data: T | null;
  public message: string;
  public success: boolean;

  constructor(statusCode: number = 200, message = "success", data: T | null) {
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.statusCode = statusCode;
  }
}

export { ApiResponse };
