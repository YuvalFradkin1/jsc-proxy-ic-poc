function createHandler() {
    class H { constructor() { this._x = 1; } }
    return new H;
}
const fakeProto = Object.create(null);
fakeProto._marker = 0xcafebabe;
createHandler(); createHandler();
const h = createHandler();
Object.setPrototypeOf(h, fakeProto);
h.get = (t,k) => k;
const p = new Proxy({}, h);
p.testKey;
Object.setPrototypeOf(h, null);
p.testKey;
print("UAF_PROBE: survived");
