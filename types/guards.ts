export function assertString(value: unknown, errorMessage = "Expected a string"): asserts value is string {
    if (typeof value !== "string") {
      throw new Error(errorMessage);
    }
  }
  
  export function castString(value: unknown): string {
    assertString(value);
    return value as string;
  }
  