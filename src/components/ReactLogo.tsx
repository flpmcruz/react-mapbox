import reactLogo from '/logo.svg'

export const ReactLogo = () => {
    return (
        <img src={reactLogo} alt=""
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 999,
                width: "100px",
                height: "100px",
                opacity: "0.5",
            }}
        />
    )
}
