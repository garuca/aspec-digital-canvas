export const getBasePath = (): string => {
  if (typeof window === "undefined") return "";
  
  const hostname = window.location.hostname;
  
  if (hostname === "aspec.ia.br" || hostname === "www.aspec.ia.br") {
    return "";
  }
  
  if (hostname === "garuca.github.io") {
    const path = window.location.pathname;
    if (path.startsWith("/aspec-digital-canvas")) {
      return "/aspec-digital-canvas";
    }
  }
  
  return "";
};
