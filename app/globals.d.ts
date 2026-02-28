// This tells TypeScript that the window object 
// will have a FlutterHttpRequest property at runtime.
declare global {
  interface Window {
    FlutterHttpRequest?: {
      postMessage: (message: string) => void;
    };
  }
}

// Exporting an empty object forces TS to treat this as a module
export {};