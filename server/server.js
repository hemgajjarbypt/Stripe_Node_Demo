import stripe from "stripe";
import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.static('images'))

app.use(express.json());
app.use(cors({
    origin: '*'
}))

const newStripe = stripe(process.env.STRIPE_SECRET_API_KEY);

// const storeItems = new Map([
//     [1, { name: "Node.js Course", price: 5000}],
//     [2, { name: "React Course", price: 5000}]
// ]);

// app.post('/create-checkout-session', async (req, res) => {
//     try {
//         const session = await newStripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
            // line_items: req.body.items.map((item) => {
            //     const storeItem = storeItems.get(item.id)
            //     return {
            //         price_data: {
            //             currency: 'inr',
            //             product_data: {
            //                 name: storeItem.name
            //             },
            //             unit_amount: storeItem.price
            //         },
            //         quantity: item.quantity
            //     }
            // }),
//             success_url: `${process.env.CLIENT_URL}/client/success.html`,
//             cancel_url:  `${process.env.CLIENT_URL}/client/cancel.html`
//         })
//         res.json({ url: session.url });
//     } catch (e) {
//         res.status(500).json({error: e.message});
//     }
// });

const storeItems = new Map([
    [1, { name: "Nike Shoes", price: 150000}],
    [2, { name: "Bata Shoes", price: 200000}],
    [3, { name: "Adidas Shoes", price: 300000}],
    [4, { name: "Puma Shoes", price: 100000}]
]);

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await newStripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            // line_items: [{
            //     price_data: {
            //         currency: 'inr',
            //         product_data: {
            //             name: storeItems.get(parseInt(req.body.item.id)).name,
            //             images: ['https://i.postimg.cc/8PkwdTYd/image.png', 'https://i.postimg.cc/4dBHXR1Z/image.png', 'https://i.postimg.cc/DfRL0nTy/image.png']
            //         },
            //         unit_amount: storeItems.get(parseInt(req.body.item.id)).price
            //     },
            //     quantity: req.body.item.quantity
            // }],
            line_items: req.body.items.map((item) => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: storeItem.name,
                            images: ['https://i.postimg.cc/8PkwdTYd/image.png', 'https://i.postimg.cc/4dBHXR1Z/image.png', 'https://i.postimg.cc/DfRL0nTy/image.png']
                        },
                        unit_amount: storeItem.price
                    },
                    quantity: item.quantity
                }
            }),  
            success_url: `http://localhost:5500/client/success.html`,
            cancel_url:  `http://localhost:5500/client/cancel.html`
        })
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})

app.listen(4242, () => {
    console.log("App Listen on port 4242");
});