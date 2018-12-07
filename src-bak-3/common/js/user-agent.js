const userAgent = navigator.userAgent
const platform = navigator.platform

export function getClientType () {
  const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
  const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let clientType = 'PC'
  if (isAndroid) { clientType = 'Android' }
  if (isiOS) { clientType = 'IOS' }
  return clientType
}

/*
export function isWeixn () {
  return userAgent.match(/MicroMessenger/i) === 'micromessenger'
}
*/

export function detectOS () {
  const isWin = (platform === 'Win32') || (platform === 'Windows')
  const isMac = (platform === 'Mac68K') || (platform === 'MacPPC') || (platform === 'Macintosh') || (platform === 'MacIntel')
  const isUnix = (platform === 'X11') && !isWin && !isMac
  const isLinux = (String(platform).indexOf('Linux') > -1)

  const isWin2K = userAgent.indexOf('Windows NT 5.0') > -1 || userAgent.indexOf('Windows 2000') > -1
  const isWinXP = userAgent.indexOf('Windows NT 5.1') > -1 || userAgent.indexOf('Windows XP') > -1
  const isWin2003 = userAgent.indexOf('Windows NT 5.2') > -1 || userAgent.indexOf('Windows 2003') > -1
  const isWinVista = userAgent.indexOf('Windows NT 6.0') > -1 || userAgent.indexOf('Windows Vista') > -1
  const isWin7 = userAgent.indexOf('Windows NT 6.1') > -1 || userAgent.indexOf('Windows 7') > -1

  if (isMac) { return 'Mac' }
  if (isUnix) { return 'Unix' }
  if (isLinux) { return 'Linux' }
  if (isWin) {
    if (isWin2K) { return 'Win2000' }
    if (isWinXP) { return 'WinXP' }
    if (isWin2003) { return 'Win2003' }
    if (isWinVista) { return 'WinVista' }
    if (isWin7) { return 'Win7' }
  }
  return 'other'
}
