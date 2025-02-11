/ Function to track product views
function trackProductView(shopId, productId) {
  // Replace with your Gadget app's backend endpoint
  const GADGET_BACKEND_URL = "https://product-optimiser.gadget.app/api/trackProductView";

  if (!shopId || !productId) {
    console.error("Missing shopId or productId. Unable to track product view.");
    return;
  }
  
  // Send the product ID to your Gadget backend
  fetch(GADGET_BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ shopId, productId }),
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
