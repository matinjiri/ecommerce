import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
  (_: undefined, req: ExecutionContext) => {
    return req.switchToHttp().getRequest().user.id;
  }
);
