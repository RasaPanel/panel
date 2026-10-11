// Live repository URLs are kept until the organization is renamed.
export const BRAND: Record<string, string> = {
  name: 'Hirkan',
  nameFa: 'هیرکان',
  repository: 'https://github.com/RasaPanel/panel',
  organization: 'https://github.com/RasaPanel',
  nodeRepository: '',
  documentation: '',
  support: 'https://t.me/dev_vexel',
  donation: '',
  adsRepository: '',
}
export const REPO_URL = BRAND.repository || '#'
export const ORGANIZATION_URL = BRAND.organization || '#'
export const DONATION_URL = BRAND.donation || '#'
export const DISCUSSION_GROUP = BRAND.support || '#'
export const DOCUMENTATION = BRAND.documentation || '#'
export const RELEASE_API = BRAND.repository ? BRAND.repository.replace('https://github.com/', 'https://api.github.com/repos/') + '/releases/latest' : ''
export const NODE_RELEASE_API = BRAND.nodeRepository ? BRAND.nodeRepository.replace('https://github.com/', 'https://api.github.com/repos/') + '/releases/latest' : ''
export const ADS_API = BRAND.adsRepository ? BRAND.adsRepository.replace('https://github.com/', 'https://api.github.com/repos/') + '/contents/' : ''
