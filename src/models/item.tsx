class Product {

    id: string;
    price: number;
    quantity: number;
    totalPrice: number;
    name: string;

    constructor(price: number, quantity: number, totalPrice: number, name: string) {

        this.id = new Date().toISOString();
        this.price = price;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.name = name;
    }
}

export default Product;