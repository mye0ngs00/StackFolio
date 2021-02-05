import { BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { UserRepository } from 'src/users/repository/user.repository';
import { AuthService } from './auth.service';
import { RegisterRepository } from './repository/register.repository';
import { VerificationRepository } from './repository/verification.repository';

const mockRegisterRepository = {
  createRegister: jest.fn(),
  findOne: jest.fn(),
};

const mockVerificationRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  verifyCodeAndGetUserProfile: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
  createUser: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockMailService = {
  sendingMail: jest.fn(),
};

describe('AuthService', () => {
  let module: TestingModule;
  let authService: AuthService;
  let jwtService: JwtService;
  let mailService: MailService;
  let userRepo: typeof mockUserRepository;
  let registerRepo: typeof mockRegisterRepository;
  let verificationRepo: typeof mockVerificationRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [],
      providers: [
        AuthService,
        {
          provide: getCustomRepositoryToken(RegisterRepository),
          useValue: mockRegisterRepository,
        },
        {
          provide: getCustomRepositoryToken(VerificationRepository),
          useValue: mockVerificationRepository,
        },
        {
          provide: getCustomRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    mailService = module.get<MailService>(MailService);
    userRepo = module.get<typeof mockUserRepository>(
      getCustomRepositoryToken(UserRepository),
    );
    registerRepo = module.get<typeof mockRegisterRepository>(
      getCustomRepositoryToken(RegisterRepository),
    );
    verificationRepo = module.get<typeof mockVerificationRepository>(
      getCustomRepositoryToken(VerificationRepository),
    );
  });

  test('providers are defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(mailService).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(registerRepo).toBeDefined();
    expect(verificationRepo).toBeDefined();
  });

  describe('register', () => {
    const createUserDto = {
      register_code: 'code',
      email: 'test@example.com',
      username: 'john',
    };

    test('fails when an invalid register code is provided', async () => {
      userRepo.createUser.mockResolvedValue(new BadRequestException());

      try {
        await authService.register(createUserDto);
      } catch (err) {
        expect(userRepo.createUser).toHaveBeenCalledTimes(1);
        expect(userRepo.createUser).toHaveBeenNthCalledWith(1, createUserDto);
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    test('fails when a username conflict occurs', async () => {
      userRepo.createUser.mockResolvedValue(new ConflictException());

      try {
        await authService.register(createUserDto);
      } catch (err) {
        expect(userRepo.createUser).toHaveBeenCalledTimes(2);
        expect(userRepo.createUser).toHaveBeenNthCalledWith(2, createUserDto);
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    test('creates a new user account', async () => {
      userRepo.createUser.mockResolvedValue({ id: 'user-id' });

      const result = await authService.register(createUserDto);
      expect(userRepo.createUser).toHaveBeenCalledTimes(3);
      expect(userRepo.createUser).toHaveBeenNthCalledWith(3, createUserDto);
      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('sendRegisterMail', () => {
    const email = 'text@example.com';

    test('fails when a user is already registered', async () => {
      userRepo.findOne.mockResolvedValue(true);

      try {
        await authService.sendRegisterMail(email);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('이미 회원가입된 email입니다.');
      }
    });

    test('does not create a new register if there was is an existing record', async () => {
      userRepo.findOne.mockResolvedValue(false);
      registerRepo.findOne.mockResolvedValue({ code: 'code', email });

      await authService.sendRegisterMail(email);
      expect(registerRepo.createRegister).not.toHaveBeenCalled();
      expect(mailService.sendingMail).toHaveBeenCalledTimes(1);
    });

    test('creates a new register if there was no existing record', async () => {
      userRepo.findOne.mockResolvedValue(false);
      registerRepo.findOne.mockResolvedValue(false);
      registerRepo.createRegister.mockResolvedValue({ code: 'code', email });

      await authService.sendRegisterMail(email);
      expect(registerRepo.createRegister).toHaveBeenCalledTimes(1);
      expect(registerRepo.createRegister).toHaveBeenCalledWith({ email });
      expect(mailService.sendingMail).toHaveBeenCalledTimes(2);
    });
  });

  describe('sendLoginMail', () => {
    const email = 'text@example.com';

    test('fails when a user is not registered', async () => {
      userRepo.findOne.mockResolvedValue(false);

      try {
        await authService.sendLoginMail(email);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('User does not exist');
      }
    });

    test('does not create a new verification if there was an existing record', async () => {
      userRepo.findOne.mockResolvedValue({ id: 'user-id' });
      verificationRepo.findOne.mockResolvedValue({ code: 'code' });

      await authService.sendLoginMail(email);
      expect(verificationRepo.create).not.toHaveBeenCalled();
      expect(verificationRepo.save).not.toHaveBeenCalled();
      expect(mailService.sendingMail).toHaveBeenCalledTimes(3);
    });

    test('creates a new verification if there was no existing record', async () => {
      userRepo.findOne.mockResolvedValue({ id: 'user-id' });
      verificationRepo.findOne.mockResolvedValue(false);
      verificationRepo.create.mockResolvedValue({
        code: 'code',
      });

      await authService.sendLoginMail(email);
      expect(verificationRepo.create).toHaveBeenCalledTimes(1);
      expect(verificationRepo.save).toHaveBeenCalledTimes(1);
      expect(mailService.sendingMail).toHaveBeenCalledTimes(4);
    });
  });

  describe('loginWithCode', () => {
    const code = 'code';

    test('fails when an invalid verification code is provided', async () => {
      verificationRepo.verifyCodeAndGetUserProfile.mockResolvedValue(
        new BadRequestException(),
      );

      try {
        await authService.loginWithCode(code);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe('Invalid verification code');
      }
    });

    test('returns a user profile and a access token when a valid verification code is provided', async () => {
      verificationRepo.verifyCodeAndGetUserProfile.mockResolvedValue({
        user_id: 'user-id',
      });

      const result = await authService.loginWithCode(code);
      expect(result).toHaveProperty('profile');
      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('socialLogin', () => {
    const req = {
      user: {
        provider: 'google',
        social_id: 'social-id',
        email: 'test@example.com',
      },
    };
    const res = {
      redirect: jest.fn(),
    };

    test('redirects a user who is not registered', async () => {
      userRepo.findOne.mockResolvedValue(false);
      registerRepo.createRegister.mockResolvedValue({
        code: 'code',
        email: 'email',
      });

      await authService.socialLogin(req, res);
      expect(registerRepo.createRegister).toHaveBeenLastCalledWith(req.user);
      expect(res.redirect).toHaveBeenCalledTimes(1);
    });

    test('returns an access token for a pre-existing user', async () => {
      userRepo.findOne.mockResolvedValue({ id: 'user-id' });

      const result = await authService.socialLogin(req, res);
      expect(result).toHaveProperty('accessToken');
    });
  });
});
