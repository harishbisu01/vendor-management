/* eslint-disable @typescript-eslint/naming-convention */
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from 'src/user/entities/user.entity';

import { RolesGuard, ROLES_KEY } from '../guards/roles.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    // ApiBearerAuth('JWT'),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AdminAuth(roles: UserRole[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    // ApiBearerAuth('JWT'),
    SetMetadata(ROLES_KEY, roles),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
