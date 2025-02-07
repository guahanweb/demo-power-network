import React, { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#1A1A1A] text-[#CCCCCC] relative overflow-hidden flex flex-col mordor-background">
            <header className="py-8 text-center border-b border-[#FF4500]/20 bg-[#2D2D2D] z-10">
                <h1 className="text-4xl font-bold mb-2 text-[#CCCCCC]">Orodruin</h1>
                <p className="text-sm tracking-[0.3em] text-[#CD5C5C]">Mount Doom of Mordor</p>
            </header>

            <main className="max-w-3xl mx-auto p-8 flex-grow z-10">
                {children}
            </main>

            <footer className="py-6 text-center bg-[#2D2D2D] border-t border-[#FF4500]/20 z-10">
                <p className="text-xs tracking-widest font-medium text-[#CD5C5C]">
                    "One Ring to rule them all, One Ring to find them"
                </p>
            </footer>
        </div>
    );
};

export default MainLayout;
