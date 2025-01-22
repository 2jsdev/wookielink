import { NextResponse } from 'next/server';
import { container } from '@/@core/infra/container-registry';
import { UploadFilesUseCase } from '@/@core/application/useCases/uploadFiles/UploadFilesUseCase';
import { ValidationError } from '@/@core/domain/errors/ValidationError';
import { UploadFilesRequestDTO } from '@/@core/application/useCases/uploadFiles/UploadFilesRequestDTO';
import { auth } from '@/@core/infra/auth';

export async function POST(req: Request) {
  try {
    const uploadFilesUseCase =
      container.get<UploadFilesUseCase>('UploadFilesUseCase');

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const files: UploadFilesRequestDTO['files'] = [];

    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (value instanceof File) {
        files.push({
          name: value.name,
          size: value.size,
          type: value.type,
          extension: value.name.split('.').pop() || '',
          content: await value.arrayBuffer(),
        });
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { message: 'No files were uploaded' },
        { status: 400 }
      );
    }

    const result = await uploadFilesUseCase.execute({ files });

    return NextResponse.json(
      { uploadedFiles: result?.uploadedFiles },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error('Error uploading files:', error);
    return NextResponse.json(
      { message: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
