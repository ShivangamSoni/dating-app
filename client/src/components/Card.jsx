export default function Card({ children }) {
    return (
        <div className="flex justify-center items-center">
            <div className="max-w-md w-full">{children}</div>
        </div>
    );
}

Card.Body = function ({ children }) {
    return <div className="shadow bg-white p-6 rounded-lg">{children}</div>;
};

Card.Footer = function ({ children }) {
    return (
        <footer className="mt-2 flex justify-center gap-3">{children}</footer>
    );
};
