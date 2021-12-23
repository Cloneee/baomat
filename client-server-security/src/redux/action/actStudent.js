import axios from "axios";
import { API_PRODUCT, API_STUDENT, API_SUPPLIER } from "../constants/api";
import {
    createAction,
    STORE_PRODUCT_BY_ID,
    STORE_STUDENTS,
    STORE_STUDENT_BY_ID,
    STORE_SUPPLIERS,
    STORE_SUPPLIER_BY_ID,
} from "../constants/constants";

export const getStudents = () => {
    return (dispatch) => {
        return axios
            .get(API_STUDENT,{withCredentials:true})
            .then((resp) => {
                console.log(resp.data)
                dispatch(createAction(STORE_STUDENTS, resp.data));
            })
            .catch((err) => console.error(err));
    };
};

export const getstudentById = (StudentId) => {
    return (dispatch) => {
        return axios
            .get(API_STUDENT + `/${StudentId}`)
            .then((resp) => {
                
                dispatch(createAction(STORE_STUDENT_BY_ID, resp.data));
            })
            .catch((err) => console.error(err));
    };
};

export const addProducts = (product) => {
    return (dispatch) => {
        return axios
            .post(API_PRODUCT,product)
            .then((resp) => {
                console.log(resp.data)
                // dispatch(createAction(STORE_PRODUCTS, resp.data));
            })
            .catch((err) => console.error(err));
    };
};
export const updateProducts = (product) => {
    return (dispatch) => {
        return axios
            .put(API_PRODUCT+`/${product.id}`,product)
            .then((resp) => {
                updateProductForCache(product)
                console.log(resp.data)

            })
            .catch((err) => console.error(err));
    };
};
export const updateProductForCache = (product) => {
    return (dispatch) => {
        return axios
            .put(API_PRODUCT+`/put/${product.id}`,product)
            .then((resp) => {
                console.log(resp.data)

            })
            .catch((err) => console.error(err));
    };
};
export const deleteProducts = (product) => {
    return (dispatch) => {
        return axios
            .delete(API_PRODUCT+ `/${product.id}`)
            .then((resp) => {
               
            })
            .catch((err) => console.error(err));
    };
};
export const getSuppliers = () => {
    return (dispatch) => {
        return axios
            .get(API_SUPPLIER)
            .then((resp) => {
                dispatch(createAction(STORE_SUPPLIERS, resp.data));
            })
            .catch((err) => console.error(err));
    };
};
export const addSuppliers = (supplier) => {
    return (dispatch) => {
        return axios
            .post(API_SUPPLIER,supplier)
            .then((resp) => {

            })
            .catch((err) => console.error(err));
    };
};
export const updateSuppliers = (supplier) => {
    return (dispatch) => {
        return axios
            .put(API_SUPPLIER+ `/${supplier.id}`,supplier)
            .then((resp) => {
            })
            .catch((err) => console.error(err));
    };
};


export const getSupplierById = (supplierId) => {
    return (dispatch) => {
        return axios
            .get(API_SUPPLIER + `/${supplierId}`)
            .then((resp) => {
                dispatch(createAction(STORE_SUPPLIER_BY_ID, resp.data));
            })
            .catch((err) => console.error(err));
    };
};

export const deleteSupplierById = (supplierId) => {
    return (dispatch) => {
        return axios
            .delete(API_SUPPLIER + `/${supplierId}`)
            .then((resp) => {
            })
            .catch((err) => console.error(err));
    };
};
