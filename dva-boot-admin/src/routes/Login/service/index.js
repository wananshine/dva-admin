import $$ from 'cmn-utils';

export async function getCode() {
    //http://10.130.201.27/dev-api/captchaImage
    return $$.get('/captchaImage');
}


export async function login(payload) {
    console.log('payload:',payload);
    return $$.post('/login', payload);
  // return $$.post('/login'+'?username='+payload.username+'&password='+payload.password+'&code='+payload.code+'&uuid='+payload.uuid)
}