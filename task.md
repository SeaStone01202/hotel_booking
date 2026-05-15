Implement login functionality:

1. Create DTO: src/modules/authentication/dto/login-request.dto.ts with email and password fields.
2. Implement LoginUseCase: inject UserRepository, validate email/password, return user (without passwordHash).
3. Add login method to AuthenticationService that delegates to LoginUseCase.
4. Add POST /login endpoint in AuthenticationController.
5. Register LoginUseCase in AuthenticationModule providers.

Checklist:

- [ ] Create login-request.dto.ts
- [ ] Implement login.use-case.ts
- [ ] Update authentication.service.ts
- [ ] Update authentication.controller.ts
- [ ] Update authentication.module.ts
