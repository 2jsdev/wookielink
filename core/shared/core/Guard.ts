import { Result } from './Result';

export type GuardResponse = string;

export interface IGuardArgument {
  argument: unknown;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  /**
   * Combina múltiples resultados de guardia y retorna el primero que falle.
   * @param guardResults - Arreglo de Result<GuardResponse>
   * @returns Result<GuardResponse>
   */
  public static combine(
    guardResults: Result<GuardResponse>[]
  ): Result<GuardResponse> {
    for (const result of guardResults) {
      if (result.isFailure) return result;
    }
    return Result.ok<GuardResponse>();
  }

  /**
   * Verifica que el valor actual sea mayor que un valor mínimo.
   * @param minValue - Valor mínimo
   * @param actualValue - Valor a verificar
   * @returns Result<GuardResponse>
   */
  public static greaterThan(
    minValue: number,
    actualValue: number
  ): Result<GuardResponse> {
    return actualValue > minValue
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(
          `Number given (${actualValue}) is not greater than (${minValue}).`
        );
  }

  /**
   * Verifica que el texto tenga al menos un número determinado de caracteres.
   * @param numChars - Número mínimo de caracteres requeridos
   * @param text - Texto a verificar
   * @returns Result<GuardResponse>
   */
  public static againstAtLeast(
    numChars: number,
    text: string
  ): Result<GuardResponse> {
    return text.length >= numChars
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(
          `Text must be at least ${numChars} characters long.`
        );
  }

  /**
   * Verifica que el texto tenga como máximo un número determinado de caracteres.
   * @param numChars - Número máximo de caracteres permitidos
   * @param text - Texto a verificar
   * @returns Result<GuardResponse>
   */
  public static againstAtMost(
    numChars: number,
    text: string
  ): Result<GuardResponse> {
    return text.length <= numChars
      ? Result.ok<GuardResponse>()
      : Result.fail<GuardResponse>(
          `Text must be at most ${numChars} characters long.`
        );
  }

  /**
   * Verifica que un argumento no sea null ni undefined.
   * @param argument - Valor a verificar
   * @param argumentName - Nombre del argumento (para el mensaje de error)
   * @returns Result<GuardResponse>
   */
  public static againstNullOrUndefined(
    argument: unknown,
    argumentName: string
  ): Result<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail<GuardResponse>(
        `${argumentName} is null or undefined.`
      );
    }
    return Result.ok<GuardResponse>();
  }

  /**
   * Verifica en bloque que un conjunto de argumentos no sean null ni undefined.
   * @param args - Colección de argumentos a verificar
   * @returns Result<GuardResponse>
   */
  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): Result<GuardResponse> {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (result.isFailure) return result;
    }
    return Result.ok<GuardResponse>();
  }

  /**
   * Verifica que un valor pertenezca a un conjunto de valores válidos.
   * @param value - Valor a verificar
   * @param validValues - Arreglo de valores permitidos
   * @param argumentName - Nombre del argumento (para el mensaje de error)
   * @returns Result<GuardResponse>
   */
  public static isOneOf(
    value: unknown,
    validValues: unknown[],
    argumentName: string
  ): Result<GuardResponse> {
    if (validValues.includes(value)) {
      return Result.ok<GuardResponse>();
    }
    return Result.fail<GuardResponse>(
      `${argumentName} must be one of [${validValues.join(', ')}]. Got "${value}".`
    );
  }

  /**
   * Verifica que un número se encuentre dentro de un rango (inclusive).
   * @param num - Número a verificar
   * @param min - Valor mínimo del rango
   * @param max - Valor máximo del rango
   * @param argumentName - Nombre del argumento (para el mensaje de error)
   * @returns Result<GuardResponse>
   */
  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): Result<GuardResponse> {
    if (num < min || num > max) {
      return Result.fail<GuardResponse>(
        `${argumentName} is not within the range ${min} to ${max}.`
      );
    }
    return Result.ok<GuardResponse>();
  }

  /**
   * Verifica que todos los números de un arreglo se encuentren dentro de un rango (inclusive).
   * Retorna el primer error que encuentre.
   * @param numbers - Arreglo de números a verificar
   * @param min - Valor mínimo del rango
   * @param max - Valor máximo del rango
   * @param argumentName - Nombre del argumento (para el mensaje de error)
   * @returns Result<GuardResponse>
   */
  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string
  ): Result<GuardResponse> {
    for (const num of numbers) {
      const result = this.inRange(num, min, max, argumentName);
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok<GuardResponse>();
  }
}
