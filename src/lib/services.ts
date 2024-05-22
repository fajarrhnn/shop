export async function getToken() {
    const res = await fetch('/api/protect');
    const data = await res.json();
    const token = data.token.value;
    return token;
}