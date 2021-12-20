import { STORE_PRODUCTS, STORE_PRODUCT_BY_ID, STORE_SUPPLIERS } from "../../constants/constants";

const initial = [];

const reducer = (state = initial, action) => {
    const { type, data } = action;
    switch (type) {
        case STORE_SUPPLIERS:

        return data;
       
        default:
            return state;
    }
};

export default reducer