function createHandler() {
    class H { constructor() { this._x = 1; } }
    return new H;
}
createHandler(); createHandler();
const h = createHandler();
h.get = (t, k) => k;
Object.setPrototypeOf(h, null);
const p = new Proxy({}, h);
p.testKey;
print("CONTROL_C: PASS");
