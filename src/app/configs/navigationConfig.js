import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
  {
    id: "apps",
    title: "Applications",
    type: "group",
    icon: "heroicons-outline:cube",
    translate: "APLICACIONES",
    children: [
      {
        id: "apps.messenger",
        title: "Mensajes",
        type: "item",
        icon: "heroicons-outline:chat-alt",
        url: "/apps/messenger",
        translate: "Mensajes",
      },
      {
        id: "apps.ecommerce",
        title: "Comercio Electronico",
        type: "collapse",
        icon: "heroicons-outline:shopping-cart",
        translate: "Comercio",
        children: [
          {
            id: "e-commerce-products",
            title: "Productos",
            type: "item",
            url: "apps/e-commerce/products",
            end: true,
          },
          {
            id: "e-commerce-product-detail",
            title: "Detalle De Producto",
            type: "item",
            url: "apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print",
          },
          {
            id: "e-commerce-new-product",
            title: "Nuevo Producto",
            type: "item",
            url: "apps/e-commerce/products/new",
          },
          {
            id: "e-commerce-orders",
            title: "Ordenes",
            type: "item",
            url: "apps/e-commerce/orders",
            end: true,
          },
          {
            id: "e-commerce-order-detail",
            title: "Detalle De Orden",
            type: "item",
            url: "apps/e-commerce/orders/1",
          },
        ],
      },
      {
        id: "apps.help-center",
        title: "Centro De Ayuda",
        type: "collapse",
        icon: "heroicons-outline:support",
        url: "/apps/help-center",
        children: [
          {
            id: "apps.help-center.faqs",
            title: "FAQs",
            type: "item",
            url: "/apps/help-center/faqs",
          },
        ],
      },
      {
        id: "apps.profile",
        title: "Perfil",
        type: "item",
        icon: "heroicons-outline:user-circle",
        url: "/apps/profile",
      },
    ],
  },
  {
    id: "divider-1",
    type: "divider",
  },
];
export default navigationConfig;
