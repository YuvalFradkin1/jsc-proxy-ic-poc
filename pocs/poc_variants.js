function createHandler() {
    class H { constructor() { this._x = 1; } }
    return new H;
}
print("=== VARIANT TESTS ===");

// V1: fakeProto instead of null
try {
    createHandler(); createHandler();
    const h = createHandler();
    h.get = (t,k) => k;
    const p = new Proxy({}, h);
    p.testKey;
    Object.setPrototypeOf(h, {_marker:0xcafe});
    p.testKey;
    print("V1: survived (fakeProto)");
} catch(e) { print("V1: threw: " + e); }

// V2: has trap instead of get
try {
    createHandler(); createHandler();
    const h = createHandler();
    h.has = (t,k) => true;
    const p = new Proxy({}, h);
    "testKey" in p;
    Object.setPrototypeOf(h, null);
    "testKey" in p;
    print("V2: survived (has trap)");
} catch(e) { print("V2: threw: " + e); }

// V3: 10000x IC warm before mutation
try {
    createHandler(); createHandler();
    const h = createHandler();
    h.get = (t,k) => k;
    const p = new Proxy({}, h);
    for(let i=0;i<10000;i++) p.x;
    Object.setPrototypeOf(h, null);
    p.x;
    print("V3: survived (JIT warm)");
} catch(e) { print("V3: threw: " + e); }

print("=== DONE ===");
