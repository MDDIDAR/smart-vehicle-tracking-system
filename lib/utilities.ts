export function camelCase(
    source: string | undefined,
    separator: string
): string {
    if (!source) return "";

    return source
        .split(separator)
        .map((token) => token.charAt(0).toLowerCase() + token.slice(1).toLowerCase())
        .join("");
}