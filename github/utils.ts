export function truncate(block: string, length: number): string | undefined {
    if (!block) return undefined
    if (block.length > length) {
         return `${block.substring(0, length - 3)}...`
    }
    return block
}