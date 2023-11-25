var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/components/Navbar.tsx
import { Link } from "@remix-run/react";

// app/lib/useCart.ts
import { create } from "zustand";
var useCartState = create((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  showCart: !1,
  toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),
  addToCart: (product) => {
    let cart = get().cart;
    if (cart.find(
      (item) => item.slug.current === product.slug.current
    )) {
      let updateCart = cart.map(
        (item) => item.slug.current === product.slug.current ? { ...item, quantity: item.quantity + 1 } : item
      );
      set((state) => ({
        cart: updateCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price
      }));
    } else {
      let updatedCart = [...cart, { ...product, quantity: 1 }];
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price
      }));
    }
  },
  removeFromCart: (product) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => item.slug.current !== product.slug.current
      ),
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - product.price
    }));
  }
}));

// app/components/Navbar.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var Navbar = () => {
  let toggleCart = useCartState((state) => state.toggleShowCart), totalItems = useCartState((state) => state.totalItems);
  return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2("header", { className: "relative z-10", children: /* @__PURE__ */ jsx2("div", { className: "bg-white", children: /* @__PURE__ */ jsx2("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsx2("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx2("div", { className: "flex items-center", children: /* @__PURE__ */ jsx2(Link, { to: "/", children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-semibold", children: [
      "Tech",
      /* @__PURE__ */ jsx2("span", { className: "text-indigo-600", children: "Connect" })
    ] }) }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: toggleCart,
        className: "group -m-2 p-2 flex items-center",
        children: [
          /* @__PURE__ */ jsx2(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              className: "flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500",
              children: /* @__PURE__ */ jsx2(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx2("span", { className: "ml-2 text-sm font-medium text-white bg-red-500 px-3 py-1 rounded-full", children: totalItems })
        ]
      }
    )
  ] }) }) }) }) }) });
}, Navbar_default = Navbar;

// app/components/ShoppingCartModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Form, Link as Link2 } from "@remix-run/react";
import { Fragment as Fragment2 } from "react";

// app/lib/sanityImageUrl.tsx
import ImageUrlBuilder from "@sanity/image-url";

// app/lib/sanity.ts
import { createClient } from "@sanity/client";
var projectId = "0jy2w44t", dataset = "production", apiVersion = "2022-03-07", client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !0
});

// app/lib/sanityImageUrl.tsx
var builder = ImageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// app/components/ShoppingCartModal.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ShoppingCartModal = () => {
  let data = useCartState((state) => state.cart), cartState = useCartState((state) => state.showCart), toggleShowCart = useCartState((state) => state.toggleShowCart), removeItem = useCartState((state) => state.removeFromCart), total = useCartState((state) => state.totalPrice);
  return /* @__PURE__ */ jsx3(Transition.Root, { show: cartState, as: Fragment2, children: /* @__PURE__ */ jsxs2(Dialog, { className: "relative z-10", as: "div", onClose: toggleShowCart, children: [
    /* @__PURE__ */ jsx3(
      Transition.Child,
      {
        as: Fragment2,
        enter: "ease-in-out duration-500",
        enterFrom: "opacity-0",
        enterTo: "opacitiy-100",
        leave: "ease-in-out duration-500",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0 ",
        children: /* @__PURE__ */ jsx3("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
      }
    ),
    /* @__PURE__ */ jsx3("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ jsx3("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsx3("div", { className: "pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10", children: /* @__PURE__ */ jsx3(
      Transition.Child,
      {
        as: Fragment2,
        enter: "transform transition ease-in-out duration-500 sm:duration-700",
        enterFrom: "translate-x-full",
        enterTo: "translate-x-0",
        leave: "transform transition ease-in-out duration-500 sm:duration-700",
        leaveFrom: "translate-x-0",
        leaveTo: "translate-x-full",
        children: /* @__PURE__ */ jsx3(Dialog.Panel, { className: "pointer-events-auto w-screen max-w-md", children: /* @__PURE__ */ jsxs2("div", { className: "flex h-full flex-col overflow-y-scroll bg-white shadow-xl", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex-1 overlfow-y-auto px-4 py-6 sm:px-6", children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsx3(Dialog.Title, { className: "text-lg font-medium text-gray-900", children: "Shopping Cart" }),
              /* @__PURE__ */ jsx3("div", { className: "ml-3 flex h-7 items-center", children: /* @__PURE__ */ jsx3(
                "button",
                {
                  type: "button",
                  className: "-m-2 p-2 text-gray-400 hover:text-gray-500",
                  onClick: toggleShowCart,
                  children: /* @__PURE__ */ jsx3(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "currentColor",
                      className: "w-6 h-6",
                      children: /* @__PURE__ */ jsx3(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                }
              ) })
            ] }),
            data.length < 1 ? /* @__PURE__ */ jsxs2("div", { className: "flex w-full h-full flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsx3("h1", { className: "text-5xl text-center", children: "Please add items to your bag!" }),
              /* @__PURE__ */ jsx3(
                "button",
                {
                  onClick: toggleShowCart,
                  className: "bg-indigo-600 px-4 py-2 rounded-lg text-white mt-6 text-xl",
                  children: "Add Items"
                }
              )
            ] }) : /* @__PURE__ */ jsx3("div", { className: "mt-8", children: /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsx3("ul", { className: "-my-6 divide-y divide-gray-200", children: data.map((product, idx) => /* @__PURE__ */ jsxs2("li", { className: "flex py-6", children: [
              /* @__PURE__ */ jsx3("div", { className: "h-24 w-24 object-cover object-center", children: /* @__PURE__ */ jsx3(
                "img",
                {
                  src: urlFor(product.image[0]).url(),
                  alt: "Product img",
                  className: "h-full w-full object-cover object-center"
                }
              ) }),
              /* @__PURE__ */ jsxs2("div", { className: "ml-4 flex flex-1 flex-col", children: [
                /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-base font-medium text-gray-800", children: [
                  /* @__PURE__ */ jsx3("h3", { children: /* @__PURE__ */ jsx3(
                    Link2,
                    {
                      to: `/product/${product.slug.current}`,
                      children: product.name
                    }
                  ) }),
                  /* @__PURE__ */ jsxs2("p", { className: "ml-4", children: [
                    "$ ",
                    product.price
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs2("div", { className: "flex flex-1 items-end justify-between text-sm", children: [
                  /* @__PURE__ */ jsxs2("p", { className: "text-gray-500", children: [
                    "Quantity: ",
                    product.quantity
                  ] }),
                  /* @__PURE__ */ jsx3("div", { className: "flex", children: /* @__PURE__ */ jsx3(
                    "button",
                    {
                      type: "button",
                      className: "font-medium text-indigo-600 hover:text-indigo-500",
                      onClick: () => removeItem(product),
                      children: "Remove"
                    }
                  ) })
                ] })
              ] })
            ] }, idx)) }) }) })
          ] }),
          data.length < 1 ? null : /* @__PURE__ */ jsxs2("div", { className: "border-t border-gray-200 px-4 py-6 sm:px-6", children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex justify-between text-base font-medium text-gray-900", children: [
              /* @__PURE__ */ jsx3("p", { children: "Subtotal" }),
              /* @__PURE__ */ jsxs2("p", { children: [
                "$ ",
                total
              ] })
            ] }),
            /* @__PURE__ */ jsx3("p", { className: "mt-0.5 text-sm text-gray-500", children: "Shipping and tax will be calcualted at checkout" }),
            /* @__PURE__ */ jsx3("div", { className: "mt-6", children: /* @__PURE__ */ jsxs2(Form, { method: "POST", action: "/buy", children: [
              /* @__PURE__ */ jsx3(
                "input",
                {
                  type: "hidden",
                  name: "cartData",
                  value: JSON.stringify(data)
                }
              ),
              /* @__PURE__ */ jsx3(
                "button",
                {
                  type: "submit",
                  className: "flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medum text-white",
                  children: "Checkout"
                }
              )
            ] }) })
          ] })
        ] }) })
      }
    ) }) }) })
  ] }) });
}, ShoppingCartModal_default = ShoppingCartModal;

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-BOXWFVDK.css";

// app/root.tsx
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default }
];
function App() {
  return /* @__PURE__ */ jsxs3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs3("head", { children: [
      /* @__PURE__ */ jsx4("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx4("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx4(Meta, {}),
      /* @__PURE__ */ jsx4(Links, {})
    ] }),
    /* @__PURE__ */ jsx4("body", { children: /* @__PURE__ */ jsxs3(Layout, { children: [
      /* @__PURE__ */ jsx4(Outlet, {}),
      /* @__PURE__ */ jsx4(ScrollRestoration, {}),
      /* @__PURE__ */ jsx4(Scripts, {}),
      /* @__PURE__ */ jsx4(LiveReload, {})
    ] }) })
  ] });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs3(Fragment3, { children: [
    /* @__PURE__ */ jsx4(Navbar_default, {}),
    /* @__PURE__ */ jsx4("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children }),
    /* @__PURE__ */ jsx4(ShoppingCartModal_default, {})
  ] });
}

// app/routes/product.$slug.tsx
var product_slug_exports = {};
__export(product_slug_exports, {
  default: () => product_slug_default,
  loader: () => loader
});
import { Tab } from "@headlessui/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
async function loader({ params }) {
  let query = `*[_type == "product" && slug.current == '${params.slug}'][0]`, data = await client.fetch(query);
  return json({ data });
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
var ProductSlug = () => {
  let { data } = useLoaderData(), addToCart = useCartState((state) => state.addToCart);
  return /* @__PURE__ */ jsx5("main", { className: "mt-5", children: /* @__PURE__ */ jsxs4("div", { className: "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start", children: [
    /* @__PURE__ */ jsxs4(Tab.Group, { as: "div", className: "flex flex-col-reverse", children: [
      /* @__PURE__ */ jsx5("div", { className: "hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none", children: /* @__PURE__ */ jsx5(Tab.List, { className: "grid grid-cols-4 gap-6", children: data.image.map((image) => /* @__PURE__ */ jsx5(
        Tab,
        {
          className: "relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50",
          children: ({ selected }) => /* @__PURE__ */ jsxs4(Fragment4, { children: [
            /* @__PURE__ */ jsx5("span", { className: "absolute inset-0 rounded-md overflow-hidden", children: /* @__PURE__ */ jsx5(
              "img",
              {
                src: urlFor(image).url(),
                alt: "Product Image",
                className: "w-full h-full object-center object-cover"
              }
            ) }),
            /* @__PURE__ */ jsx5(
              "span",
              {
                className: classNames(
                  selected ? "ring-indigo-500" : "ring-transparent",
                  "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                )
              }
            )
          ] })
        },
        image._key
      )) }) }),
      /* @__PURE__ */ jsx5(Tab.Panels, { className: "w-full aspect-w-1 aspect-h-1", children: data.image.map((image) => /* @__PURE__ */ jsx5(Tab.Panel, { children: /* @__PURE__ */ jsx5(
        "img",
        {
          src: urlFor(image).url(),
          alt: "Product Image",
          className: "w-full h-full object-center object-cover sm:rounded-lg"
        }
      ) }, image._key)) })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0", children: [
      /* @__PURE__ */ jsx5("h1", { className: "text-3xl font-extrabold tracking-tight text-gray-900", children: data.name }),
      /* @__PURE__ */ jsx5("div", { className: "mt-3", children: /* @__PURE__ */ jsxs4("p", { className: "text-3xl text-gray-900", children: [
        "$ ",
        data.price
      ] }) }),
      /* @__PURE__ */ jsx5("div", { className: "mt-6", children: /* @__PURE__ */ jsx5(
        "div",
        {
          className: "text-base text-gray-700",
          dangerouslySetInnerHTML: { __html: data.description }
        }
      ) }),
      /* @__PURE__ */ jsx5("div", { className: "mt-6", children: /* @__PURE__ */ jsx5("div", { className: "mt-10 flex sm:flex-col-1", children: /* @__PURE__ */ jsx5(
        "button",
        {
          onClick: () => addToCart(data),
          className: "w-full flex-1 bg-indigo-600 border border-transparent rounded-md py-3 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-500",
          children: "Add To Bag"
        }
      ) }) })
    ] })
  ] }) });
}, product_slug_default = ProductSlug;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  loader: () => loader2
});
import { Link as Link3, useLoaderData as useLoaderData2 } from "@remix-run/react";
import { json as json2 } from "@remix-run/node";
import { Fragment as Fragment5, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
async function loader2({}) {
  let query = `*[_type == 'product']{
    price,
    name,
    slug,
    "imageUrl": image[0].asset->url
  }`, products = await client.fetch(query);
  return json2({ products });
}
var IndexPage = () => {
  let { products } = useLoaderData2();
  return /* @__PURE__ */ jsxs5(Fragment5, { children: [
    /* @__PURE__ */ jsxs5("section", { className: "flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24", children: [
        /* @__PURE__ */ jsx6("p", { className: "mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl", children: "Welcome to my shop!" }),
        /* @__PURE__ */ jsx6("h1", { className: "text-black mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl", children: "Focus on tech that matters" }),
        /* @__PURE__ */ jsx6("p", { className: "mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg", children: "Welcome to TechConnect, your ultimate destination for all things tech! Step into a world of innovation and discovery as we bring you the latest and greatest gadgets, electronics, and accessories." }),
        /* @__PURE__ */ jsx6("div", { children: /* @__PURE__ */ jsx6(
          Link3,
          {
            to: "#products",
            className: "rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 md:text-base",
            children: "Shop Now"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx6("div", { className: "h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12", children: /* @__PURE__ */ jsx6(
        "img",
        {
          src: "https://images.pexels.com/photos/16065312/pexels-photo-16065312/free-photo-of-smartphone-with-apple-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "Prouct Image",
          className: "h-full w-full object-cover object-center"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx6("section", { id: "products", children: /* @__PURE__ */ jsx6("div", { className: "py-24 sm:py-32 lg:pt-32", children: /* @__PURE__ */ jsx6("div", { className: "mt-6 grid grid-col-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8", children: products.map((product) => /* @__PURE__ */ jsxs5(
      Link3,
      {
        className: "group relative",
        to: `/product/${product.slug.current}`,
        children: [
          /* @__PURE__ */ jsx6("div", { className: "w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80", children: /* @__PURE__ */ jsx6(
            "img",
            {
              src: product.imageUrl,
              alt: "Image of Product",
              className: "w-full h-full object-center object-contain"
            }
          ) }),
          /* @__PURE__ */ jsx6("h3", { className: "mt-4 text-sm text-gray-700", children: product.name }),
          /* @__PURE__ */ jsxs5("p", { className: "mt-1 text-sm font-medium text-gray-900", children: [
            "$ ",
            product.price
          ] })
        ]
      }
    )) }) }) })
  ] });
}, index_default = IndexPage;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-MCTLDEUE.js", imports: ["/build/_shared/chunk-WJLCCAI6.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-2GOR4BOC.js", imports: ["/build/_shared/chunk-5DCMOVLX.js", "/build/_shared/chunk-OGENUTGD.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-LEBPSWVN.js", imports: ["/build/_shared/chunk-PGOH7JLP.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/product.$slug": { id: "routes/product.$slug", parentId: "root", path: "product/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/product.$slug-IH3SGDEK.js", imports: ["/build/_shared/chunk-PGOH7JLP.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 } }, version: "6a5bd658", hmr: void 0, url: "/build/manifest-6A5BD658.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/product.$slug": {
    id: "routes/product.$slug",
    parentId: "root",
    path: "product/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: product_slug_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
