declare global {
  interface Window {
    env: any;
  }
}
export const environment = {
  production: true,
  url: window.env.url || 'http://localhost:8080',
  wsUrl: window.env.wsUrl || 'http://localhost:8080/ws',
  baseRef: window.env.baseRef || '/',
};
