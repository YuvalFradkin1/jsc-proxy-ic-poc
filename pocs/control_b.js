function createHandler() {
    class H { constructor() { this._x = 1; } }
    return new H;
}
createHandler(); createHandler();
const h = createHandler();
h.get = (t, k) => k;
const p = new Proxy({}, h);
p.testKey; p.testKey;
print("CONTROL_B: PASS");
