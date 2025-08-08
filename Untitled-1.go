
// 1.userHandler create post requertment
{   
    "firstName":"Anisur",
    "lastName":"Rahman",
    "phone":"1701717367",
    "password": "xxxx",
    "tosAgreement":true
}

// 2.tokenHandler create post requertment
{
    "phone":"1701717367",
    "password":"xxxx"
}

// 3.userHandler view get requertment
http://localhost:3000/user?phone=1701717367
// headerObject
token=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842

// 4.tokenHandler view get requertment
http://localhost:3000/token?id=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842


// 5.userHandler update put requertment
{
    "firstName":"Anisur",
    "phone":"1701717367"
}
// headerObject
token=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842

// 6.tokenHandler update put requertment
{
    "id":"8fd37ceaca6e9132f532d9f42ca88e2e37bcc842",
    "expires":1754381277810
}


// 7.userHandler delete requertment
http://localhost:3000/user?phone=1701717367
// headerObject
token=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842

// 8.tokenHandler delete requertment
http://localhost:3000/token?id=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842


// 9.checkHandler create post requertment
{
    "protocol":"http",
    "url":"google.com",
    "method":"post",
    "successCodes":[200,201],
    "timeoutSeconds":2
}
// headerObject
token=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842

// 10.checkHandler view get requertment
http://localhost:3000/checks?id=d4cac9735b59cf354bb58c65535549fb2e8f3900
// headerObject
token=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842

// 11.checkHandler update put requertment
{
    "id":"d4cac9735b59cf354bb58c65535549fb2e8f3900",
    "extend":true,
    "expires":1754381277810
}
// headerObject
token=8fd37ceaca6e9132f532d9f42ca88e2e37bcc842









{   
    "firstName":"Anisur",
    "lastName":"Rahman",
    "phone":"1701717367",
    "password": "xxxx",
    "tosAgreement":true,
    "protocol":"http",
    "url":"google.com",
    "method":"post",
    "successCodes":[200,201],
    "timeoutSeconds":2,
    "id":"d4cac9735b59cf354bb58c65535549fb2e8f3900",
    "extend":true,
    "expires":1754381277810
}