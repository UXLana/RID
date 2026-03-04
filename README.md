# Label Prototype

A 2-screen prototype for a packaging label print workflow, built with Next.js and the MTR Design System.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

-   **Packages Page**: View inventory packages and select one to print a label.
-   **Label Wizard**: A 4-step wizard to configure label details (Package/Product, Template, Quantity, Settings) with a live preview.
-   **Print Jobs Page**: Monitor active and completed print jobs.

## Project Structure

-   `app/`: Next.js App Router pages and layouts.
-   `local-components/`: Local components specific to this prototype (Sidebar, LabelWizard).
-   `node_modules/mtr-design-system`: Linked design system.

## Notes

-   The design system is linked from `../../Code`.
-   Tailwind CSS is configured to scan the design system for classes.
-   `tsconfig.json` maps `@/components` and `@/styles` to the design system to resolve internal imports.
