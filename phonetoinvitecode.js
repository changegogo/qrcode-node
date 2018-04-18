let sourceString = [  
    0,1,2,3,4,5,6,7,8,9,
    'a','b','c','d','e','f',
    'g','h','i','j','k','l',
    'm','n','o','p','q','r',
    's','t','u','v','w','x',
    'y','z'
  ];

 function createInviteCode(telphone){
    let num = Number(telphone);
    console.log(num);
    let inviteCode = '';
    while(num){
        let mod = num % 35;
        num = Math.floor(num / 35);
        inviteCode = sourceString[mod] + inviteCode;
    }
    return inviteCode;
 }

 let code = createInviteCode('100000000000');
 console.log(code);