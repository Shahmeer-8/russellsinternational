const API_ORIGIN = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000').replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
const API_BASE = `${API_ORIGIN}/api/v1`;
const MEDIA_URL_KEYS = new Set(['image_url', 'og_image_url', 'pdf_url', 'cv_url']);

function normalizeMediaUrl(value: string) {
  if (!value) {
    return value;
  }

  if (value.startsWith('/storage/')) {
    return `${API_ORIGIN}${value}`;
  }

  if (value.startsWith('storage/')) {
    return `${API_ORIGIN}/${value}`;
  }

  try {
    const url = new URL(value);
    if (['localhost', '127.0.0.1'].includes(url.hostname)) {
      return `${API_ORIGIN}${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return value;
  }

  return value;
}

function normalizeApiMedia<T>(payload: T): T {
  if (Array.isArray(payload)) {
    return payload.map((item) => normalizeApiMedia(item)) as T;
  }

  if (!payload || typeof payload !== 'object') {
    return payload;
  }

  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [
      key,
      MEDIA_URL_KEYS.has(key) && typeof value === 'string'
        ? normalizeMediaUrl(value)
        : normalizeApiMedia(value),
    ]),
  ) as T;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);
  const isFormData = options?.body instanceof FormData;

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'API error');
  }

  const data = await res.json() as T;
  return normalizeApiMedia(data);
}

export const api = {
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),

  postForm: <T>(path: string, formData: FormData) =>
    request<T>(path, {
      method: 'POST',
      body: formData,
    }),
};
