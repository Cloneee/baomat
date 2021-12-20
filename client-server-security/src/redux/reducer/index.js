import { combineReducers } from "redux";

import authentication from "./returnObject/authentication";
import products from "./returnArray/products";
import productById from "./returnObject/productById";
import suppliers from "./returnArray/suppliers"

const reducer = combineReducers({
    authentication,
    products,
    productById,
    suppliers,
});

export default reducer;
