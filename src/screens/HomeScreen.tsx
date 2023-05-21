import { BtnMyLocation, ComboStyle, MapView, ReactLogo, SearchBar } from "../components"

export const HomeScreen = () => {
    return (
        <div>
            <MapView />
            <div
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: 999,
                    display: "flex",
                    gap: "10px",
                }}
            >
                <BtnMyLocation />
                <ComboStyle />
            </div>
            <ReactLogo />
            <SearchBar />
        </div>
    )
}
