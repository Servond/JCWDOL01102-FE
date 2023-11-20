export interface IAppInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

export interface IApiResponse<T> {
  statusCode?: number;
  message?: string;
  data?: Partial<T>;
}

export interface IApiResponseStatic {
  statusCode?: number;
  message?: string;
}
