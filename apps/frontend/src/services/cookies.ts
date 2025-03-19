interface CookieOptions {
  expires?: number | Date;
  path?: string;
}

class CookieManager {
  private static instance: CookieManager;

  private constructor() {}

  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  public set(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof document !== "undefined") {
      const defaultOptions = {
        path: "/",
        expires: 1,
      };

      const opts = { ...defaultOptions, ...options };
      let expires = opts.expires;

      if (typeof expires === "number") {
        const date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
        expires = date;
      }

      const cookie = `${name}=${encodeURIComponent(value)}`;
      const expiresPart = expires
        ? `;expires=${(expires as Date).toUTCString()}`
        : "";
      const pathPart = opts.path ? `;path=${opts.path}` : "";

      document.cookie = cookie + expiresPart + pathPart;
    }
  }

  public get(name: string): string | undefined {
    if (typeof document !== "undefined") {
      const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];

      return value ? decodeURIComponent(value) : undefined;
    }
    return undefined;
  }

  public remove(
    name: string | string[],
    options: Pick<CookieOptions, "path"> = {},
  ): void {
    if (typeof document !== "undefined") {
      if (Array.isArray(name)) {
        name.forEach((n) => this.remove(n, options));
      } else this.set(name, "", { ...options, expires: new Date(0) });
    }
  }

  public getAll(): Record<string, string> {
    if (typeof document !== "undefined") {
      return document.cookie.split("; ").reduce(
        (acc, curr) => {
          if (curr) {
            const [name, value] = curr.split("=");
            acc[name] = decodeURIComponent(value);
          }
          return acc;
        },
        {} as Record<string, string>,
      );
    }
    return {};
  }
}

export default CookieManager.getInstance();
