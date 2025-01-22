import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { toast } from '@/hooks/use-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
  return error && typeof error.status === 'number';
}

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (isFetchBaseQueryError(action.payload)) {
        const errorMessage =
          (action.payload.data as { message?: string })?.message ||
          'An unexpected error occurred';

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred',
          variant: 'destructive',
        });
      }
    }
    return next(action);
  };

export default rtkQueryErrorLogger;
