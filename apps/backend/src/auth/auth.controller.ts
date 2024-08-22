import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { contract } from 'contract';
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from '@ts-rest/nest';
import { z } from 'zod';
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from 'src/common/decorators/admins.auth.decorator';
export const authContractController = nestControllerContract(contract.auth);
export type authRequestShape = NestRequestShapes<typeof authContractController>;

@Controller()
export class AuthController
  implements NestControllerInterface<typeof authContractController>
{
  constructor(private readonly authService: AuthService) {}
  @TsRest(authContractController.registerUser)
  async registerUser(
    @TsRestRequest() { body }: authRequestShape['registerUser'],
  ) {
    await this.authService.registerUser(body);
    return {
      status: 200 as const,
      body: {
        isSuccess: true,
        message: 'Registration successfully.',
      },
    };
  }

  @TsRest(authContractController.logIn)
  async logIn(@TsRestRequest() { body }: authRequestShape['logIn']) {
    const result = await this.authService.logIn(body);
    return {
      status: 200 as const,
      body: result,
    };
  }
}
