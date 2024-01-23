import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UserData {
  name: string | null;
  email: string | null;
  roleId: number | null;
  verified: boolean | null;
  active: boolean | null;
}

const ResponseData = (
  status: number,
  message: string | null,
  data: any | null,
  error: any | null
) => {
  if (error != null && error instanceof Error) {
    const response = {
      status: status,
      message: error.message,
      errors: error,
      data: null,
    };

    return response;
  }

  return {
    status,
    message,
    data,
  };
};

const GenerateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: "1h",
  });

  return token;
};

const GenerateRefreshToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: "1d",
  });

  return token;
};

const ExtractToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_TOKEN as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      resData = null;
    } else {
      resData = decode;
    }
  });

  if (resData != null) {
    const result: UserData = <UserData>resData;
    return result;
  }

  return null;
};

const ExtractRefreshToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      resData = null;
    } else {
      resData = decode;
    }
  });

  if (resData != null) {
    const result: UserData = <UserData>resData;
    return result;
  }

  return null;
};

export default {
  ResponseData,
  ExtractRefreshToken,
  ExtractToken,
  GenerateRefreshToken,
  GenerateToken,
};
