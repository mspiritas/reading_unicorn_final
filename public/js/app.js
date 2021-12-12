if ("serviceWorker" in navigator) {
    // defer service worker installation until page completes loading
    window.addEventListener("load", () => {
      //Registers service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          //Success message
          console.log(`Service Worker Registration (Scope: ${reg.scope})`);
        })
        .catch((error) => {
          //Error message
          console.log(`Service Worker Error (${error})`);
        });
    });
  } else {
    //If app isn't served over HTTPS or if service worker not supported by browser
    console.log("Service Worker not available");
  }