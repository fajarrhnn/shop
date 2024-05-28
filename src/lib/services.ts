export async function getToken() {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL  || "http://localhost:3000";
  const res = await fetch(`${url}/api/protect`, {
    method: "GET",
  });
  const data = await res.json();
  const token = await data.token;
  return token;
}