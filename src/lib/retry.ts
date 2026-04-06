export interface RetryOptions {
  maxRetries: number; // default: 2
  delayMs: number; // default: 1000
  fallback?: unknown; // value returned when all retries exhausted
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxRetries: 2,
  delayMs: 1000,
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: Partial<RetryOptions>,
): Promise<T> {
  const { maxRetries, delayMs, fallback } = { ...DEFAULT_OPTIONS, ...options };

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          `withRetry: all ${maxRetries + 1} attempts failed.`,
          error,
        );
        return fallback as T;
      }
      console.warn(
        `withRetry: attempt ${attempt + 1} failed, retrying in ${delayMs}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  // Unreachable, but satisfies TypeScript
  return fallback as T;
}
