let appUrlEnv: string;
// appUrlEnv = 'dev';
if (typeof appUrlEnv === 'undefined') {
  appUrlEnv = new RegExp('wwwdev').test(window.location.href) ? 'dev' : new RegExp('wwwint').test(window.location.href) ? 'int' : '';
}
export const appEnv = appUrlEnv;
export const pdbeUrl = 'https://www' + appUrlEnv + '.ebi.ac.uk/pdbe/';
export const thorDevUrl = 'https://www.ebi.ac.uk/europepmc/hubthor/';
export const thorUrl = 'https://www.ebi.ac.uk/europepmc/thor/';
