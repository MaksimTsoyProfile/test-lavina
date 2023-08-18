const CryptoJS = require("crypto-js");

type GetSignOptions = {
  method: string;
  url: string;
  body: string;
  secret: string;
};

export const getSign = ({
  method,
  url,
  body,
  secret,
}: GetSignOptions):string => {
  const signString = `${method}${url}${body}${secret}`;
  return CryptoJS.MD5(signString).toString();
};

export const makeBodyString = (body:any):string => {
  return body ? `${JSON.stringify(body).replace(/"([^"]+)":/g, '$1:')}` : '';
}