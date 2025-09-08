const BASE_URL = import.meta.env.VITE_BASE_URL;

type FetchArgs = {
  url: string;
  options?: RequestInit;
};

async function CustomFetch({ url, options }: FetchArgs) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      // 기본값 GET
      method: options?.method ?? 'GET',
      ...options,
      // GET에선 Content-Type 굳이 필요 없음. json 바디가 있을 때만 설정하는 게 깔끔.
      headers: {
        ...(options?.headers ?? {}),
        ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      },
    });
    if (!response.ok) {
      throw new Error('api error');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default CustomFetch;
