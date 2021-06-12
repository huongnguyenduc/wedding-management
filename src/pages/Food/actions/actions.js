export const addToCart = (food) => {
    return {
        type: 'ADD',
        payload: food
    }; 
}