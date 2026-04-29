export const withRetry = async (fn: Function, retries = 2): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    if (error.status && error.status >= 400 && error.status < 500) {
      throw error;
    }

    if (retries > 0) {
      console.warn(`Retrying... (${retries} attempts left)`);
      return withRetry(fn, retries - 1);
    }

    throw error;
  }
};
