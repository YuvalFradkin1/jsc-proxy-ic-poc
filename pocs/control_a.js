const h = {};
h.get = (t, k) => k;
const p = new Proxy({}, h);
p.testKey;
Object.setPrototypeOf(h, null);
p.testKey;
print("CONTROL_A: PASS");
