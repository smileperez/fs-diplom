import { Link } from "react-router-dom";

export default function TButton({
    color = "indigo",
    to = "",
    circle = false,
    href = "",
    link = false,
    target = "_blank",
    onClick = () => {},
    children,
}) {
    let classes = [
        "flex",
        "items-center",
        "whitespace-nowrap",
        "text-sm",
        "border",
        "border-2",
        "border-transparent",
        "transition",
        "duration-500",
    ];

    if (link) {
        classes = [...classes, "transition-colors"];

        switch (color) {
            case "indigo":
                classes = [
                    ...classes,
                    "text-indigo-500",
                    "focus:border-indigo-500",
                ];
                break;
            case "red":
                classes = [...classes, "text-red-500", "focus:border-red-500"];
        }
    } else {
        classes = [
            ...classes
        ];

        switch (color) {
            case "indigo":
                classes = [
                    ...classes,
                    "bg-indigo-600",
                    "hover:bg-indigo-700",
                    "focus:ring-indigo-500",
                ];
                break;
            case "red":
                classes = [
                    ...classes,
                    "bg-red-600",
                    "hover:bg-red-700",
                    "focus:ring-red-500",
                ];
                break;
            case "default":
                classes = [
                    ...classes,
                    "bg-[#63536C]",
                    "text-gray-300",
                    "hover:bg-gray-700",
                    "hover:text-white",
                    "active:bg-[#89639e]",
                    "active:duration-0",
                ];
                break;
        }
    }

    if (circle) {
        classes = [
            ...classes,
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-sm",
        ];
    } else {
        classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
    }

    return (
        <>
            {href && (
                <a href={href} className={classes.join(" ")} target={target}>
                    {children}
                </a>
            )}
            {to && (
                <Link to={to} className={classes.join(" ")}>
                    {children}
                </Link>
            )}
            {!to && !href && (
                <button onClick={onClick} className={classes.join(" ")}>
                    {children}
                </button>
            )}
        </>
    );
}
