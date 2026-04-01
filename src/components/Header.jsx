import React from 'react'

const Header = () => {
    return (
        <div>
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1624365169873-d42588f4e866?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwxfHxnb2xkJTIwYW5kJTIwc2lsdmVyJTIwY29pbnMlMjBtaW5pbWFsaXN0fGVufDB8fHx8MTc3NDk5OTY3MHww&ixlib=rb-4.1.0&q=85"
                            alt="Logo"
                            className="w-12 h-12 rounded-full object-cover"
                            data-testid="logo-image"
                        />
                        <h1 className="text-2xl sm:text-3xl font-outfit font-medium tracking-tight text-zinc-950" data-testid="app-title">
                            Gold:Silver Ratio Tracker Vite
                        </h1>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header