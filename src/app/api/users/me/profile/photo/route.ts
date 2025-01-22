import { NextResponse } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { UploadUserProfilePhotoUseCase } from '@/@core/application/useCases/UploadUserProfilePhoto/UploadUserProfilePhotoUseCase';
import { DeleteUserProfilePhotoUseCase } from '@/@core/application/useCases/DeleteUserProfilePhoto/DeleteUserProfilePhotoUseCase';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { auth } from '@/@core/infra/auth';

export async function POST(req: Request) {
  try {
    const uploadUserProfilePhotoUseCase =
      container.get<UploadUserProfilePhotoUseCase>(
        'UploadUserProfilePhotoUseCase'
      );

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const fileInput = formData.get('file');

    if (!(fileInput instanceof File)) {
      return NextResponse.json(
        { message: 'Invalid file input' },
        { status: 400 }
      );
    }

    const file = {
      name: fileInput.name,
      size: fileInput.size,
      type: fileInput.type,
      extension: fileInput.name.split('.').pop() || '',
      content: await fileInput.arrayBuffer(),
    };

    const userId = session.user.id;

    const result = await uploadUserProfilePhotoUseCase.execute({
      userId,
      file,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error('Error uploading profile photo:', error);
    return NextResponse.json(
      { message: 'Failed to upload profile photo' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const deleteProfilePhotoUseCase =
      container.get<DeleteUserProfilePhotoUseCase>(
        'DeleteUserProfilePhotoUseCase'
      );

    const session = await auth();
    if (!session) {
      throw new Error('User not authenticated');
    }

    await deleteProfilePhotoUseCase.execute(session.user.id);

    return NextResponse.json({
      message: 'User profile photo deleted successfully',
      status: 204,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Failed to delete user profile photo' },
      { status: 500 }
    );
  }
}
