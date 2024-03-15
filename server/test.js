const arr = [2, 4, 3, 6, 7];
const arr2 = [3, 6 ,8 , 4];

arr.forEach((item) => {
    if (!arr2.includes(item)) {
        console.log(item);
    }
});