import { combineReducers } from "redux";

import authentication from "./returnObject/authentication";
import products from "./returnArray/products";
import productById from "./returnObject/productById";
import studentById from "./returnObject/studentById";
import suppliers from "./returnArray/suppliers"
import students from "./returnArray/students"
import departments from "./returnArray/departments"

const reducer = combineReducers({
    authentication,
    products,
    productById,
    studentById,
    suppliers,
    students,
    departments,


});

export default reducer;
