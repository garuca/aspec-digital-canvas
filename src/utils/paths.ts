const getBasePath = () => {
  if (typeof window === "undefined") return "/aspec-digital-canvas";
  const path = window.location.pathname;
  if (path.startsWith("/aspec-digital-canvas")) {
    return "/aspec-digital-canvas";
  }
  return "";
};

export const asset = (path: string) => `${getBasePath()}${path}`;
