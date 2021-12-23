import { combineReducers } from "redux";

import authentication from "./returnObject/authentication";
import products from "./returnArray/products";
import studentById from "./returnObject/studentById";
import profile from "./returnObject/profile";
import students from "./returnArray/students"
import departments from "./returnArray/departments"

const reducer = combineReducers({
    authentication,
    products,
    studentById,
    profile,
    students,
    departments,


});

export default reducer;
