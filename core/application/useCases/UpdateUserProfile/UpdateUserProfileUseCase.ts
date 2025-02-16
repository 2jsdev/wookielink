import { inject, injectable } from 'inversify';
import { UpdateUserProfileDTO } from '@core/application/useCases/UpdateUserProfile/UpdateUserProfileDTO';
import { UpdateUserProfileResponse } from '@core/application/useCases/UpdateUserProfile/UpdateUserProfileResponse';
import { UpdateUserProfileErrors } from '@core/application/useCases/UpdateUserProfile/UpdateUserProfileErrors';
import { TYPES } from '@core/infrastructure/constants/types';
import { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { left, Result, right } from '@core/shared/core/Result';
import { AppError } from '@core/shared/core/AppError';
import { User } from '@core/domain/entities/User';
import { UniqueEntityID } from '@core/shared/domain/UniqueEntityID';

@injectable()
export class UpdateUserProfileUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(
    request: UpdateUserProfileDTO
  ): Promise<UpdateUserProfileResponse> {
    try {
      const { userId, name, email, username, image, bio } = request;
      const id = new UniqueEntityID(userId);

      const existingUser = await this.userRepository.findUserById(
        id.toString()
      );
      if (!existingUser) {
        return left(
          new UpdateUserProfileErrors.UserNotFoundError(id.toString())
        );
      }

      if (username !== undefined && username.trim() === '') {
        return left(new UpdateUserProfileErrors.InvalidUsername());
      }

      const updatedData = {
        ...existingUser.props,
        name: name ?? existingUser.props.name,
        email: email ?? existingUser.props.email,
        username: username ?? existingUser.props.username,
        image: image ?? existingUser.props.image,
        bio: bio ?? existingUser.props.bio,
        links: existingUser.props.links,
      };

      const updatedUserAggregate = User.create(updatedData, id);
      const updatedUser = await this.userRepository.updateUser(
        updatedUserAggregate.getValue()
      );

      return right(Result.ok(updatedUser));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return left(new AppError.UnexpectedError(err));
    }
  }
}
