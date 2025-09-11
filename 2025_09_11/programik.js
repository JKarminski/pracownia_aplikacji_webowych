console.log("Witaj uzytkowniku!");

const readline = require('node:readline');

const konta = [
    ["Koper", "9WSOiweE"],
    ["Czolasty", "tn5i7TMb"],
    ["Clancy", "H4TeqaLq"],
    ["McDonalds", "ZcrlznJ2"],
    ["Lotnisko", "ReDWxekq"],
    ["PasStartowy", "9WSOiweE"],
    ["Okularnik", "oICAuc3z"],
    ["Gejmer", "IyZt4vpO"],
    ["Matematyk", "3KHPT4jO"],
    ["Projektor", "HYTIZUAY"],
    ["Telebim", "5CGRj9Bp"],
];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let login;
rl.question(`Podaj swoj login: `, answer => {
    login = answer;
    console.log(`Uzytkownik: ${login}!`);
    rl.close();
});
let haslo;
rl.question(`Podaj swoje haslo: `, pswrd => {
    haslo = pswrd;
    rl.close();
});

function fibbo() {
    let fib = 1;
    let liczba = 1;
    fib2 = 1;
    fib3 = 0;
    while (fib <= 1000000000) {
        fib3 = fib;
        fib = fib + fib2;
        fib2 = fib3;
        console.log(fib)
    }

}

function logowanie(login, haslo, konta) {
    let czek = false;
    for (index in konta) {
        if (konta[index, 0] == login) {
            if (konta[index, 1] == haslo) {
                czek = true;
            }
        }
    }
    if (czek) {
        return true;
    } else {
        return false;
    }
}

if (logowanie(login, haslo, konta)) {
    console.log("W nagrode ze sie zalogowales generuje Ci fibonacciego");
    fibbo();
}