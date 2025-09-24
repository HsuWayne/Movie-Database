const languageMap: Record<string, string> = {
  en: '英文',
  zh: '中文',
  ja: '日文',
  ko: '韓文',
  fr: '法文',
  es: '西班牙文',
  de: '德文',
  it: '義大利文',
  pt: '葡萄牙文',
  ru: '俄文',
  hi: '印地文',
  id: '印尼文',
  th: '泰文',
  vi: '越南文',
  tr: '土耳其文',
  ar: '阿拉伯文'
}

export function getLanguageName(code: string): string {
  return languageMap[code] || code || '未知語言'
}

const genreMap: Record<number, string> = {
  28: '動作',
  12: '冒險',
  16: '動畫',
  35: '喜劇',
  80: '犯罪',
  99: '紀錄片',
  18: '劇情',
  10751: '家庭',
  14: '奇幻',
  36: '歷史',
  27: '恐怖',
  10402: '音樂',
  9648: '懸疑',
  10749: '愛情',
  878: '科幻',
  10770: '電視電影',
  53: '驚悚',
  10752: '戰爭',
  37: '西部片'
}

export function getGenreNames(ids: number[]): string[] {
  return Array.isArray(ids)
    ? ids.map((id) => genreMap[id] || id.toString())
    : []
}
