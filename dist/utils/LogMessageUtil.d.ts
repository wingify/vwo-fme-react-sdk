import { LogManager } from '@wingify/service-logger';
/**
 * Constructs a message by replacing placeholders in a template with corresponding values from a data object.
 *
 * @param {string} template - The message template containing placeholders in the format `{key}`.
 * @param {Record<string, any>} data - An object containing keys and values used to replace the placeholders in the template.
 * @returns {string} The constructed message with all placeholders replaced by their corresponding values from the data object.
 */
export declare function buildMessage(template?: string, data?: Record<string, any>): string;
/**
 * Logs a hook error message.
 * @param {LogManager} logger - The logger instance.
 * @param {Record<string, any>} data - The data object containing error details.
 * @param {string} template - The message template.
 */
export declare function logHookError(logger: LogManager | undefined, data: Record<string, any>, template: string): void;
