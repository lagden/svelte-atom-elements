export function uuid() {
	if ('crypto' in globalThis && globalThis.crypto?.randomUUID) {
		return globalThis.crypto.randomUUID()
	}
	return Number(Math.random()).toString(26).slice(2)
}
