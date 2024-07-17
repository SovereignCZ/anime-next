import "#/styles/styles.scss"

export const metadata = {
    title: {
        template: '%s | Anime Oasis',
        default: 'Anime Oasis', // a default is required when creating a template
    },
    description: 'Testovací aplikace pro anime a mangu',
    metadataBase: new URL(process.env.NEXT_PUBLIC_FE),
};

export default function RootLayout({children}) {
    return (
        <html lang="cs">
        <head>
            <meta charSet="UTF-8"/>
            <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
            <base href="https://192.168.50.167/anime" target="_blank"/>
            <link href="/image/favicon.ico" rel="icon"/>
            <link href="/image/ios/192.png" rel="apple-touch-icon"/>
            <link crossOrigin="use-credentials" href="/manifest.json" rel="manifest"/>
            <meta content="#1E1E40" name="theme-color"/>
            <link as="style" href="/fonts/fontawesome/css/fontawesome.min.css" rel="stylesheet"/>
            <link as="style" href="/fonts/fontawesome/css/regular.min.css" rel="stylesheet"/>
            <link as="style" href="/fonts/fontawesome/css/solid.min.css" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com" rel="preconnect"/>
            <link crossOrigin={""} href="https://fonts.gstatic.com" rel="preconnect"/>
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap" rel="stylesheet"/>
        </head>
        <body>{children}</body>
        </html>
    );
}
