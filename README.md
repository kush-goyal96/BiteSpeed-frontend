# BiteSpeed WhatsApp Flow Editor

A modern, interactive flow-based editor for designing WhatsApp message flows. Built with React, Vite, [@xyflow/react](https://xyflow.dev/), and styled using Tailwind CSS.

## Features

- **Drag-and-drop node creation**: Easily add new message nodes to your flow.
- **Editable node messages**: Click a node to edit its message in the settings panel.
- **Connect nodes visually**: Draw connections between nodes to define message sequences.
- **Responsive, clean UI**: Styled with Tailwind CSS for a modern look.
- **Delete nodes**: Select a node and delete it using the settings panel or the Delete/Backspace key.
- **Validation**: Prevents saving flows with invalid structure (e.g., too few nodes, multiple root nodes).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd BiteSpeed
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

To build the app for production:

```sh
npm run build
# or
yarn build
```

To preview the production build:

```sh
npm run preview
# or
yarn preview
```

## Project Structure

- `src/`
  - `App.jsx` – Main application logic and flow rendering
  - `components/` – Custom node, panel, and settings components
  - `index.css` – Tailwind CSS imports
- `public/` – Static assets

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [@xyflow/react](https://xyflow.dev/) (for flow rendering)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

## License

[MIT](LICENSE)

---

_This project was bootstrapped with [Vite](https://vitejs.dev/) and inspired by modern flow-based editors._
