export interface IAppInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value?: string | undefined;
}

export interface IAppModalProps {
  onClose: VoidFunction;
  isOpen: boolean;
  value?: string | undefined;
}

export interface IApiResponse<T> {
  statusCode?: number;
  message?: string;
  data?: T;
}

export interface IApiResponseStatic {
  statusCode?: number;
  message?: string;
}
