const buttons = document.querySelectorAll(".buy_btn");
const increaseButtons = document.querySelectorAll('.increase button');
const decreaseButtons = document.querySelectorAll('.decrease button');
const counters = document.querySelectorAll('.counter');
const value = document.querySelector('.value');
const allBuy = document.querySelector('.all button');
const items = [];

class Product {
    constructor(id, quantity){
        this.id = id,
        this.quantity = quantity
    }
}


// button.addEventListener("click", () => {
//     fetch('http://localhost:4242/create-checkout-session', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             items: [
//                { id: 1, quantity: 1 },
//                { id: 2, quantity: 1 }
//             ]
//         })
//     }).then(async res => {
//         if (res.ok) {
//             return res.json();
//         }
//         else{
//             const json = await res.json();
//             return await Promise.reject(json);
//         }
//     }).then(( {url} ) => {
//         window.location = url
//     }).catch(e => {
//         console.log(e.error);
//     })
// });



buttons.forEach((button) => {
    button.addEventListener('click', () => {
        fetch('http://localhost:4242/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer sk_test_51Oqsm3SFJBkNPmS1CIHqv78AyZTLkvIKGoDvYcVvBmzZLot4W4brf8L9M2H3HAKTyVwo5Rv0AWZPQ0tL3rhN1GXA00xSoY9HBe'
            },
            body: JSON.stringify({
                item: { id: button.id, quantity: parseInt(button.parentNode.parentNode.querySelector('.counter').innerHTML) }
            })
        }).then(async res => {
            if (res.ok) {
                return res.json();
            }
            else {
                const json = await res.json();
                return await Promise.reject(json);
            }
        }).then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.log(e.error);
        })
    })
});

increaseButtons.forEach((inc) => {
    inc.addEventListener('click', () => {
        const node = inc.parentNode.parentNode.querySelector('.counter');
        const id = node.id;
        let ctr = parseInt(node.innerHTML);
        const parentNode = node.parentNode.parentNode.querySelector('.card__preci');
        const value = parentNode.innerHTML;
        const price = parseInt(value.replace('₹', ''));
        ctr++;
        if (ctr >= 10) {
            ctr = 10;
            return;
        }
        updateDisplay(ctr, id, price);
    })
});

decreaseButtons.forEach((dec) => {
    dec.addEventListener('click', () => {
        const node = dec.parentNode.parentNode.querySelector('.counter');
        const id = node.id;
        let ctr = parseInt(node.innerHTML);
        const parentNode = node.parentNode.parentNode.querySelector('.card__preci');
        const value = parentNode.innerHTML;
        const price = -parseInt(value.replace('₹', ''));
        ctr--;
        if (ctr <= -1) {
            ctr = 0;
            return;
        }
        updateDisplay(ctr, id, price);
    })
});

function updateDisplay(ctr, id, price) {
    document.getElementById(id).innerHTML = `${ctr}`;
    const value = parseInt(document.querySelector('.value').innerHTML);
    const total = value + price;
    document.querySelector('.value').innerHTML = `${total}`;
}

allBuy.addEventListener('click', () => {
    counters.forEach((counter) => {
        let id;
        if (parseInt(counter.innerHTML) > 0) {
            switch (counter.id) {
                case "one":
                    id = 1;
                    break;
                case "two":
                    id = 2;
                    break;
                case "three":
                    id = 3;
                    break;
                case "four":
                    id = 4;
                    break;
            
                default:
                    break;
            }
            const product = new Product(id, parseInt(counter.innerHTML));
            items.push(product);
        }
    });
    fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer sk_test_51Oqsm3SFJBkNPmS1CIHqv78AyZTLkvIKGoDvYcVvBmzZLot4W4brf8L9M2H3HAKTyVwo5Rv0AWZPQ0tL3rhN1GXA00xSoY9HBe'
        },
        body: JSON.stringify({ items })
    }).then(async res => {
        if (res.ok) {
            return res.json();
        }
        else {
            const json = await res.json();
            return await Promise.reject(json);
        }
    }).then(({ url }) => {
        window.location = url
    }).catch(e => {
        console.log(e.error);
    })
});