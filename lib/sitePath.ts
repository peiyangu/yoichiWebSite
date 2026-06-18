const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path) {
    return path;
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }

  if (!BASE_PATH) {
    return path;
  }

  if (path.startsWith(BASE_PATH)) {
    return path;
  }

  return path.startsWith("/") ? `${BASE_PATH}${path}` : `${BASE_PATH}/${path}`;
}

export function toWebpPath(path: string): string {
  return path.replace(/\.(jpe?g|png)$/i, ".webp");
}