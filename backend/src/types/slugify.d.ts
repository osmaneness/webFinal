declare module 'slugify' {
  interface SlugifyOptions {
    lower?: boolean;
    strict?: boolean;
    locale?: string;
  }

  function slugify(text: string, options?: SlugifyOptions): string;
  export = slugify;
} 