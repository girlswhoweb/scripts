// Function to track product views
function trackProductView(productId) {
  // Replace with your Gadget app's backend endpoint
  const GADGET_BACKEND_URL = "https://product-optimiser.gadget.app/api/trackProductView";

  // Send the product ID to your Gadget backend
  fetch(GADGET_BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
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

// Get the product ID from the Shopify global object
const productId = window.Shopify?.product?.id;

// Track the product view if the product ID is available
if (productId) {
  trackProductView(productId);
} else {
  console.error("Product ID not found. Unable to track product view.");
}
