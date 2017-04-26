const isDev = process.env.NODE_ENV !== 'production';
const isBeta = !!process.env.BETA;

export function getEmailSender() {
  return process.env.EMAIL_SENDER || 'team@freecodecamp.com';
}

export function getPort() {
  if (!isDev) {
    return '443';
  }
  return process.env.SYNC_PORT || '3000';
}

export function getProtocol() {
  return isDev ? 'http' : 'https';
}

export function getHost() {
  if (isDev) {
    return process.env.HOST || 'localhost';
  }
  return isBeta ? 'beta.freecodecamp.com' : 'freecodecamp.com';
}

export function getServerFullURL() {
  if (!isDev) {
   return getProtocol()
        + '://'
        + getHost();
  }
  return getProtocol()
       + '://'
       + getHost()
       + ':'
       + getPort();
}
