import { resolve } from "path";
import connection from "../dbMysql.js";

// Función para llamar al procedimiento almacenado
export const insertPurchase = (idProduct, quantity, unitPrice, purchaseDate, idUser, total) => {
    connection.query(
        'CALL sp_insert_purchase(?, ?, ?, ?, ?, ?)',
        [idProduct, quantity, unitPrice, purchaseDate, idUser, total],
        (error, results) => {
            if (error) {
                console.error('Error al insertar compra:', error);
                return;
            }
            console.log('Compra insertada correctamente:', results);
        }
    );
};

export const insertProduct = (nameProduct, stock, description, price, url, idCompany, idCategory) => {
    return new Promise((resolve, reject) => {
        'CALL sp_save_PRODUCT(?,?,?,?,?,?,?)',
            [nameProduct, stock, description, price, url, idCompany, idCategory],
            (error, results) => {
                if (error) {
                    console.error('Error al insertar el Product:', error);
                    reject('Error al insertar el Product:', error)
                }
                console.log('producto insertado correctamente', results);
                resolve(results);
            }
    });
}

export const updateProducts = (
    p_id,
    p_name,
    p_stock,
    p_description,
    p_seller,
    p_ratings,
    p_ratingsCount,
    p_shipping,
    p_quantity,
    p_img,
    p_idCompany,
    p_idCategory,
    p_sku,
    p_width,
    p_height,
    p_depth,
    p_weight,
    p_extraShippingFee,
    p_active,
    p_priceTaxExcl,
    p_priceTaxIncl,
    p_taxRate,
    p_comparedPrice
) => {
    return new Promise((resolve, reject) => {
        'CALL sp_edit_PRODUCT(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [p_id,
                p_name,
                p_stock,
                p_description,
                p_seller,
                p_ratings,
                p_ratingsCount,
                p_shipping,
                p_quantity,
                p_img,
                p_idCompany,
                p_idCategory,
                p_sku,
                p_width,
                p_height,
                p_depth,
                p_weight,
                p_extraShippingFee,
                p_active,
                p_priceTaxExcl,
                p_priceTaxIncl,
                p_taxRate,
                p_comparedPrice],
            (error, results) => {
                if (error) {
                    console.error('Error al editar producto:', error);
                    reject('Error al editar producto:', error)
                }
                console.log('producto editado correctamente', results);
                resolve(results);
            }
    });
}



export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query('select * from Products', (error, results) => {
            if (error) {
                console.error('Error al seleccionar los productos:', error);
                reject('Error al seleccionar los productos:', error);
            } else {
                console.log('productos seleccionados correctamente', results);
                resolve(results);
            }
        });
    });
}

export const getAllProductsId = (idCompany) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from Products where  idCompany=?', [idCompany], (error, results) => {
            if (error) {
                console.error('Error al seleccionar los productos:', error);
                reject('Error al seleccionar los productos:', error);
            } else {
                console.log('productos seleccionados correctamente', results);
                resolve(results);
            }
        });
    });
}

export const addShoppingCart = (userId, productId, quantityToAdd, size, color) => {
    return new Promise((resolve, reject) => {
        connection.query('CALL sp_addToCart(?, ?, ?, ?, ?)', [userId, productId, quantityToAdd, size, color], (error, results) => {
            if (error) {
                console.error('Error al insertar el producto:', error);
                reject('Error al insertar el producto:', error);
            }
            console.log('Producto insertado correctamente', results);
            resolve(results);
        });
    })
}

export const removeFromCart = (cartId) => {
    return new Promise((resolve, reject) => {
        connection.query('CALL RemoveFromCart(?)', [cartId], (error, results) => {
            if (error) {
                console.error('Error al insertar el producto:', error);
                reject('Error al insertar el producto:', error);
            }
            console.log('Producto eliminado correctamente', results);
            resolve(results);
        })
    })
}

export const getAllShoppingCart = (idUser) => {
    return new Promise((resolve, reject) => {
        connection.query('select * from ShoppingCart where idUser = ?', [idUser], (error, results) => {
            if (error) {
                console.error('Error al seleccionar los productos:', error);
                reject('Error al seleccionar los productos:', error);
            } else {
                console.log('productos seleccionados correctamente', results);
                resolve(results);
            }
        });
    });
}

export const decrementQuantityInCart = (cartItemId, quantityToRemove) => {
    return new Promise((resolve, reject) => {
        connection.query('CALL sp_decrementQuantityInCart(?,?)', [cartItemId, quantityToRemove], (error, results) => {
            if (error) {
                console.error('Error al decrementar el producto:', error);
                reject('Error al insertar el producto:', error);
            }
            console.log(results);
            resolve(results);
        })
    })
}


// CREATE PROCEDURE sp_insert_review(
//     IN p_comment VARCHAR(4000),
//     IN p_idUser VARCHAR(200),
//     IN p_stars int
// )

export const sp_insert_reviews = (comment, idUser, starts, idProducts) => {
    return new Promise((resolve, reject) => {
        connection.query('CALL sp_insert_review(?,?,?,?)', [comment, idUser, starts, idProducts], (error, results) => {
            if (error) {
                console.error('Error al insertar la reseña:', error);
                reject('Error al insertar la reseña:', error);
            }
            console.log(results);
            resolve(results);
        })
    })
}

export const getCategory = async (idProduct) => {
    return await new Promise((resolve, reject) => {
        connection.query('select * from Products where id = ?', [idProduct], (error, results) => {
            if (error) {
                console.error('Error al seleccionar los productos:', error);
                reject(error);
            } else {
                console.log('productos seleccionados correctamente', results);
                resolve(results);
            }
        });
    });
}

export const typeCategory = async (idCategory) => {
    return await new Promise((resolve, reject) => {
        connection.query('select * from Category where idCategory = ?', [idCategory], (error, results) => {
            if (error) {
                console.error('Error al seleccionar los productos:', error);
                reject(error);
            } else {
                console.log('productos seleccionados correctamente', results);
                resolve(results);
            }
        });
    });
}

export const getReviewsIdUser = async (idProduct) => {
    return await new Promise((resolve, reject) => {
        connection.query('select * from Reviews where idProduct = ?', [idProduct], (error, results) => {
            if (error) {
                console.error('Error al seleccionar los productos:', error);
                reject(error);
            } else {
                console.log('reviews seleccionados correctamente', results);
                resolve(results);
            }
        });
    });
}

export const deleteReview = async (idReview) => {
    return await new Promise((resolve, reject) => {
        connection.query('CALL sp_delete_review(?)', [idReview], (error, results) => {
            if (error) {
                console.error('Error al eliminar la reseña:', error);
                reject(error);
            } else {
                console.log('review eliminada corretamente', results);
                resolve(results);
            }
        });
    });
}

