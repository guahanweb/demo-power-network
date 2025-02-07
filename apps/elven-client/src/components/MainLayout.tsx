import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col elven-background">
        <header className="py-8 text-center border-b border-gray-200 bg-gradient-to-b from-white to-gray-50 z-10">
            <h1 className="text-4xl font-serif tracking-wide mb-2">Rivendell</h1>
            <p className="text-sm tracking-widest text-gray-600">The Last Homely House East of the Sea</p>
        </header>

        <main className="flex-grow px-6 py-12 max-w-3xl mx-auto z-10">
            {children}
        </main>

        <footer className="py-6 px-4 border-t border-gray-200 bg-gradient-to-t from-white to-gray-50 z-10">
            <div className="max-w-3xl mx-auto text-center text-gray-600">
            <p className="text-xs tracking-wider font-light">
                "The Road goes ever on and on..."
            </p>
            </div>
        </footer>
    </div>
  );
};

export default MainLayout;
