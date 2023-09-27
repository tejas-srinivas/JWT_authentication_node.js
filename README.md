# JWT_authentication_node.js
JWT Authentication Using Node.js

## What is JSON Web Token?

    JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and
    self-contained way for securely transmitting information between parties as a JSON 
    object. This information can be verified and trusted because it is digitally 
    signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/
    private key pair using RSA or ECDSA.

## JWT Authentication
```javascript
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
```

## Joi-Password-Complexity
```javascript
const passwordComplexity = require("joi-password-complexity");
passwordComplexity().validate("apassw123!");
```
The resulting error message:
'Password should be at least 1 upper-case character'

## bcrypt 
To make Hash-Password
```javascript
    SALT = 10
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(request.body.password,salt)
```
To Compare Hash-Password
```javascript
const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
```

## Dependencies Installation
1. Express Module
`npm install express`
2. Mongoose Module
`npm install mongoose`
3. Nodemon Module (Optional)
`npm install nodemon`
4. JWT Module
`npm install jsonwebtoken`
5. Joi Module
`npm install joi`
6. Joi-Password-Complexity Module
`npm install joi-password-complexity`

