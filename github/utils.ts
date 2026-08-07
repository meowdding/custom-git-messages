export function truncate(block: string, length: number): string | undefined {
    if (!block) return undefined
    if (block.length > length) {
         return `${block.substring(0, length - 3)}...`
    }
    return block
}

export function hideDetailsBlock(text: string): string | undefined {
    if (!text) return undefined
    const detailsRegex = /<details>[\s\S]*?<summary>([\s\S]*?)<\/summary>[\s\S]*?<\/details>/gi
    return text.replace(detailsRegex, '**$1**');
}