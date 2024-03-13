import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { useGetECommerceOrderQuery } from "../../ECommerceApi";

/**
 * The products tab.
 */
function ProductsTab() {
  const routeParams = useParams();
  const { orderId } = routeParams;
  const { data: order } = useGetECommerceOrderQuery(orderId, {
    skip: !orderId,
  });
  return (
    <div className="table-responsive">
      <table className="simple">
        <thead>
          <tr>
            <th>
              <Typography className="font-semibold">ID</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Imagen</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Nombre</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Precio</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Cantidad</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products?.map((product) => (
            <tr key={product.id}>
              <td className="w-64">{product.id}</td>
              <td className="w-80">
                <img
                  className="product-image"
                  src={product.image}
                  alt="product"
                />
              </td>
              <td>
                <Typography
                  component={Link}
                  to={`/apps/e-commerce/products/${product.id}`}
                  className="truncate"
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  {product.name}
                </Typography>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">${product.price}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{product.quantity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTab;
