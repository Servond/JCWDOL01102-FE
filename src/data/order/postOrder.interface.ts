export interface IPostOrderResponse {
  order: {
    invoice_number: string;
  };
  virtual_account_info: {
    virtual_account_number: string;
    how_to_pay_page: string;
    how_to_pay_api: string;
    created_date: string;
    expired_date: string;
    created_date_utc: string;
    expired_date_utc: string;
  };
}
