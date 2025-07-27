import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { getCookie } from "vinxi/http";
import { isServer } from "solid-js/web";
import { ColorModeProvider, cookieStorageManagerSSR } from "@kobalte/core";
import { ColorModeScript } from "@kobalte/core/src/index.jsx";
import { ModeToggle } from "./components/ui/mode-toggle";

function getServerCookies() {
    "use server"

    const colorMode = getCookie("kb-color-mode")
    return colorMode ? `kb-color-mode="${colorMode}` : ``
}

export default function App() {
    const storageManager = cookieStorageManagerSSR(
        isServer ? getServerCookies() : document.cookie
    )

    return (
        <Router
            root={props => (
                <>
                    <ColorModeScript storageType={storageManager.type} />
                    <ColorModeProvider storageManager={storageManager}>
                        <ModeToggle />
                        <Suspense>{props.children}</Suspense>
                    </ColorModeProvider>
                </>
            )}
        >
            <FileRoutes />
        </Router>
    );
}
