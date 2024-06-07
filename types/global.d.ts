/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode } from 'vue';
import Vue from 'vue';

declare module '*.vue' {
  export default Vue;
}

declare module '*.svg' {
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

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface ElementAttributesProperty {
      // eslint-disable-next-line @typescript-eslint/ban-types
      $props: {};
    }
  }

  namespace NodeJS {
    interface Process {
      browser: boolean;
      client: boolean;
      mode: 'spa' | 'universal';
      modern: boolean;
      server: boolean;
      static: boolean;
    }
  }
}
