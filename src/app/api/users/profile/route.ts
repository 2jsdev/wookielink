import { NextResponse } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { UpdateUserProfileUseCase } from '@/@core/application/useCases/UpdateUserProfile/UpdateUserProfileUseCase';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { ViewUserProfileUseCase } from '@/@core/application/useCases/ViewUserProfile/ViewUserProfileUseCase';
import { auth } from '@/@core/infra/auth';

export async function GET(req: Request) {
  try {
    const viewUserProfileUseCase = container.get<ViewUserProfileUseCase>(
      'ViewUserProfileUseCase'
    );

    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const user = await viewUserProfileUseCase.execute({
      userId: session.user.id,
    });

    return NextResponse.json(user.toPlainObject(), { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Failed to retrieve user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const updateUserProfileUseCase = container.get<UpdateUserProfileUseCase>(
      'UpdateUserProfileUseCase'
    );

    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const data = await req.json();

    const updatedUser = await updateUserProfileUseCase.execute({
      userId: session.user.id,
      name: data.name,
      email: data.email,
      username: data.username,
      image: data.image,
    });

    return NextResponse.json(updatedUser.toPlainObject(), { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
