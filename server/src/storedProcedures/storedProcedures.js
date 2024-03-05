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

export const decrementQuantityInCart = (cartItemId, quantityToRemove ) => {
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

