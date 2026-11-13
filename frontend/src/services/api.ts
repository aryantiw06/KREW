export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status?: number, public readonly payload?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');
const DEFAULT_TIMEOUT_MS = 15000;

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  timeoutMs?: number;
}

export async function requestApi<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, signal, headers, body, ...requestOptions } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new DOMException('Request timed out', 'TimeoutError')), timeoutMs);
  const abortFromCaller = () => controller.abort(signal?.reason);
  signal?.addEventListener('abort', abortFromCaller, { once: true });
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...requestOptions,
      signal: controller.signal,
      headers: { Accept: 'application/json', ...(body === undefined ? {} : { 'Content-Type': 'application/json' }), ...headers },
      ...(body === undefined ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) })
    });
    const contentType = response.headers.get('content-type') || '';
    const raw = await response.text();
    let payload: unknown;
    if (raw) {
      if (contentType.includes('application/json')) {
        try { payload = JSON.parse(raw); } catch { payload = { message: 'Server returned malformed JSON' }; }
      } else {
        payload = { message: raw.slice(0, 500) || 'Server returned a non-JSON response' };
      }
    }
    if (!response.ok) {
      const message = typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
        ? payload.message : `Request failed (${response.status})`;
      throw new ApiError(message, response.status, payload);
    }
    if (!contentType.includes('application/json') || !payload || typeof payload !== 'object') {
      throw new ApiError('Server returned an invalid response format', response.status, payload);
    }
    return payload as ApiResponse<T>;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (controller.signal.aborted) {
      if (signal?.aborted) throw new ApiError('Request cancelled');
      throw new ApiError('Request timed out');
    }
    throw new ApiError('Unable to reach the KREW API. Check that the backend is running.');
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abortFromCaller);
  }
}

export const api = {
  get: <T>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) => requestApi<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) => requestApi<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) => requestApi<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'body'>) => requestApi<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) => requestApi<T>(path, { ...options, method: 'DELETE' })
};
