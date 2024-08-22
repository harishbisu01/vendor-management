import { initContract } from "@ts-rest/core";
import { LoginDto, RegisterDto } from "./type";
import { CommonSuccessSchema, UsertToken } from "../../contract/common";
const c = initContract();
export const authContract = c.router(
  {
    registerUser: {
      method: "POST",
      path: "/registerUser",
      responses: {
        200: CommonSuccessSchema,
      },
      body: RegisterDto,
    },
    logIn: {
      method: "POST",
      path: "/logIn",
      responses: {
        200: UsertToken,
      },
      body: LoginDto,
    },
  },
  {
    pathPrefix: "/auth",
  }
);
