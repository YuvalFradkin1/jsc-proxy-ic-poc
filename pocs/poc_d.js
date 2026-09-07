function createHandler() {
    class H { constructor() { this._sentinel = 0xdeadbeef; } }
    return new H;
}
createHandler();
createHandler();
const handler = createHandler();
Object.setPrototypeOf(handler, Object.prototype);
handler.get = (t, k) => `intercepted:${k}`;
const proxy = new Proxy({}, handler);
proxy.testKey;
Object.setPrototypeOf(handler, null);
proxy.testKey;
print("POC_D: survived — JSC is PATCHED");
