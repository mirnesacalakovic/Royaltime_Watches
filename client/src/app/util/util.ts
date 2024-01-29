export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function currencyFormat(amount: number) {
    return '$' + (amount / 100).toFixed(2);
}

export function truncate(str: string, n: number) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}