import {createRoot} from "react-dom/client";
import {useState} from "react";
import './app.scss'

const App = () => (
    <div className="app">IT WORKED!!!!</div>
)

export default async function decorate(block: HTMLDivElement) {
    createRoot(block).render(<App {...data} />)
}
