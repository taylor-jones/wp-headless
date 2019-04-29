  const removeProtocol = url => url.replace(/^(https?:\/\/)?(www.)?/, '');


  const a = 'https://www.foo.com/hello';
  const b = 'http://www.foo.com/hello';
  const c = 'http://foo.com/hello';

console.log(removeProtocol(a));
console.log(removeProtocol(b));
console.log(removeProtocol(c));

