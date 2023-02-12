import Input from "./Input";

export default function Form({ title, error, children, onSubmit }) {
    return (
        <>
            <h1 className="text-3xl font-bold mb-8 uppercase text-center">
                {title}
            </h1>
            <form
                onSubmit={onSubmit}
                className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
            >
                <Form.Error align="center">{error}</Form.Error>
                {children}
            </form>
        </>
    );
}

Form.Field = function ({ label, inputProps, error }) {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <Input id={label} {...inputProps} />
            <Form.Error>{error}</Form.Error>
        </>
    );
};

Form.Error = function ({ children, align = "start" }) {
    return (
        <span
            className={`col-span-full text-sm text-red-600 ${
                align === "start"
                    ? "justify-self-start"
                    : align === "end"
                    ? "justify-self-end"
                    : "justify-self-center"
            }`}
        >
            {children}
        </span>
    );
};

Form.CustomField = function ({ children }) {
    return <div className="col-span-full w-full">{children}</div>;
};
