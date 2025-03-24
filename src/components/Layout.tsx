import { ReactNode } from "react";
import FontWrapper from "./FontWrapper";
import Head from "next/head";
import Header from "./Header";

interface LayoutProps {
    title?: string;
    children: ReactNode;
}

export default function Layout({ title = "Dictionary Web App", children }: LayoutProps) {
    return (
        <FontWrapper>
            <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-10">
                <Head>
                    <title>{title}</title>
                    <meta name="description" content="Find definitions for any word" />
                </Head>
                <Header />
                <main className="w-full max-w-3xl flex-1">{children}</main>
            </div>
        </FontWrapper>
    );
}
