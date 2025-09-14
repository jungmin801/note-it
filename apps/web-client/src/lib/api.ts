const BASE_URL = import.meta.env.VITE_BASE_URL;

type FetchArgs = {
  url: string;
  // RequestInit에서 body만 제거하고, 우리가 any로 다시 정의
  options?: Omit<RequestInit, 'body'> & { body?: any };
};

const isFormData = (v: unknown): v is FormData => typeof FormData !== 'undefined' && v instanceof FormData;

async function CustomFetch({ url, options }: FetchArgs) {
  try {
    const method = (options?.method ?? 'GET').toUpperCase();
    const { body: rawBody, ...rest } = options ?? {};

    // GET/HEAD는 body 금지
    const allowBody = !['GET', 'HEAD'].includes(method);

    // body 직렬화
    const prepared =
      allowBody && rawBody !== undefined
        ? isFormData(rawBody)
          ? {
              body: rawBody as BodyInit,
              headers: { ...(rest.headers ?? {}) }, // FormData면 Content-Type 자동
            }
          : {
              body: typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody),
              headers: {
                'Content-Type': 'application/json',
                ...(rest.headers ?? {}),
              },
            }
        : { body: undefined, headers: rest.headers };

    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      ...rest, // body 제외한 나머지 옵션
      headers: prepared.headers,
      body: prepared.body,
    });

    if (!response.ok) {
      throw new Error('api error');
    }

    // 204 대응
    if (response.status === 204) return null;
    const ct = response.headers.get('content-type') || '';
    return ct.includes('application/json') ? response.json() : response.text();
  } catch (error) {
    console.error(error);
  }
}

export default CustomFetch;
