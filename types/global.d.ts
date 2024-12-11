import Vue from 'vue';

declare module '*.vue' {
  export default Vue;
}

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.webp';

// declare module '#app' {
//   interface NuxtApp {
//     $provide: MyType;
//   }
// }
