import React, { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F5F1E8] text-[#2C1810] flex flex-col human-background">
            <header className="py-8 text-center bg-[#4A4238] text-[#F5F1E8] border-b border-[#D4A760] z-10">
                <h1 className="text-4xl font-semibold mb-2">Minas Tirith</h1>
                <p className="text-sm tracking-wider">City of Kings</p>
            </header>

            <main className="flex-grow max-w-3xl mx-auto p-8 z-10">
                {children}
            </main>

            <footer className="py-6 text-center bg-[#4A4238] text-[#F5F1E8] border-t border-[#D4A760] z-10">
                <p className="text-xs tracking-wider">
                    "Ever has it stood, ever shall it stand, the City of the Men of Númenor"
                </p>
            </footer>
        </div>
    );
};

export default MainLayout;