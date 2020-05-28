import $$ from 'cmn-utils';

export async function getCode() {
    return $$.get('/captchaImage');
}


export async function login(payload) {
    return $$.post('/login', payload);
}