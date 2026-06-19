export function calculateReadingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, '')   // 去掉代码块
    .replace(/[#*`>\-\[\]()!]/g, '')  // 去掉 Markdown 符号

  const chineseChars = (text.match(/[一-龥]/g) || []).length
  const englishWords = text
    .replace(/[一-龥]/g, '')
    .split(/\s+/)
    .filter(Boolean).length

  // 中文约 300 字/分钟，英文约 200 词/分钟
  const minutes = chineseChars / 300 + englishWords / 200
  return Math.max(1, Math.ceil(minutes))
}
