import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1C2B35] text-[#D4D4D4] flex flex-col dwarven-background">
      <header className="py-8 text-center border-b-2 border-[#B87D4B] bg-[#2F4858] z-10">
        <h1 className="text-4xl font-bold mb-2 text-[#FFB74D]">Khazad-dûm</h1>
        <p className="text-sm uppercase tracking-[0.3em]">Halls of Durin's Folk</p>
      </header>

      <main className="flex-grow max-w-3xl mx-auto p-8 z-10">
        {children}
      </main>

      <footer className="py-6 text-center bg-[#2F4858] border-t-2 border-[#B87D4B] z-10">
        <p className="text-xs tracking-widest font-medium text-[#FFB74D]">
          "Deep they delved us, fair they wrought us, high they builded us"
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;