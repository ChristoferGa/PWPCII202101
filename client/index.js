import './stylesheets/style.css'
import './stylesheets/mystyle.css'
console.log('Webpack Working!!!');
//Default parameters solo disponible en ES6
let show = (m = 'Hola') => {
    alert(m);
}

show();

function resolverAfter2Seconds(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    })
}

async function asyncCall() {
    console.log('Call an async function');
    const result = await resolverAfter2Seconds();
    console.log(result);
}

asyncCall();