import { Language } from 'prism-react-renderer'
import { slugify } from './slugify'
import { isLanguageSupported } from './supportedLanguages'

export const mapGitHubLanguageToPrismLanguage = (rawLanguage: string): Language => {
  const language = slugify(rawLanguage)

  if (isLanguageSupported(language)) return language as Language
  if (language.startsWith('git')) return 'git'
  if (language.startsWith('shell')) return 'bash'
  if (language.startsWith('powershell')) return 'bash'

  return 'bash'
}
