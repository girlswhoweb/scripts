// Function to track product views using the app proxy
function trackProductView(shopId, productId) {
  // Use the relative URL for your app proxy.
  // With your configuration:
  // Subpath prefix: apps
  // Subpath: trackProductView
  // Any request to /apps/trackProductView on the storefront will be proxied to https://product-optimiser.gadget.app/trackProductView
  const PROXY_URL = "/apps/trackProductView";

  if (!shopId || !productId) {
    console.error("Missing shopId or productId. Unable to track product view.");
    return;
  }

  // Construct the full URL with query parameters.
  // Shopify will automatically append its own parameters (like shop, timestamp, and hmac) when the request is proxied.
  const url = `${PROXY_URL}?shopId=${encodeURIComponent(shopId)}&productId=${encodeURIComponent(productId)}`;

  // Use a GET request. App proxies are designed to work with GET requests.
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to track product view");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Product view tracked successfully:", data);
    })
    .catch((error) => {
      console.error("Error tracking product view:", error);
    });
}

// Track the product view if the product ID is available
window.onload = function () {
  const shopId = window.Shopify?.shop;
  const productId = window.ShopifyAnalytics?.meta?.product?.id;

  if (shopId && productId) {
    trackProductView(shopId, productId);
    console.log(`ProductId ${productId} new view sent to the DB of storeId ${shopId}`);
  } else {
    console.error("Product ID not found. Unable to track product view.");
  }
};
