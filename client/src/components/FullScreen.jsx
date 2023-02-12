export default function FullScreen({ children }) {
    return (
        <div className="grid grid-cols-1 grid-rows-[auto,1fr] min-h-screen bg-gray-100">
            {children}
        </div>
    );
}

FullScreen.Header = function ({ children }) {
    return <header className="bg-slate-800">{children}</header>;
};
