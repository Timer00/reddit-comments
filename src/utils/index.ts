export async function nextApiRequest<T>(
  path: string,
  method: 'GET' | 'POST' = 'GET',
  data?: object
): Promise<T> {
  try {
    const response = await fetch(`/api/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error calling /api/${path}`);
    }

    return await response.json() as T;

  } catch (err) {
    console.error(err);
    throw err;
  }
}
