export class ServerFetcher {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.headers = { "Content-Type": "application/json", ...headers };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit,
    cacheOptions: { cache?: RequestCache; revalidate?: number } = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: { ...this.headers, ...options.headers },
      cache: cacheOptions.cache ?? "force-cache",
      next: cacheOptions.revalidate
        ? { revalidate: cacheOptions.revalidate }
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    cacheOptions?: { cache?: RequestCache; revalidate?: number }
  ): Promise<T> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request<T>(
      `${endpoint}${queryString}`,
      { method: "GET" },
      cacheOptions
    );
  }

  async graphql<T>(
    query: string,
    variables?: Record<string, unknown>,
    cacheOptions?: { cache?: RequestCache; revalidate?: number }
  ): Promise<T> {
    return this.request<T>(
      "/graphql",
      { method: "POST", body: JSON.stringify({ query, variables }) },
      cacheOptions
    );
  }
}

// Create a single fetcher instance
export const serverFetcher = new ServerFetcher(
  "https://jsonplaceholder.typicode.com"
);
