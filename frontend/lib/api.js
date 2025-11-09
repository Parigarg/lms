export async function api(path, options = {}) {
  const baseURL = "http://localhost:5000/api"; // make sure this matches your backend
  const headers = { "Content-Type": "application/json" };

  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  const res = await fetch(`${baseURL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || res.statusText);
  }

  return res.json();
}
