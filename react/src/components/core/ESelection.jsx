export default function ESelection({ color, children }) {
    let classes = [
        "inline-block",
        "w-auto",
        "px-2",
        "py-1",
        "rounded",
        "text-xs",
        "border",
        "border-gray-500",
        "font-medium",
        "text-white"
    ];

  
    if (color) {
        classes = [...classes, `bg-[#${color}]`];
    } else {
        classes = [...classes, "bg-[#63536C]"];
    }


    // switch (color) {
    //     case "gold":
    //         classes = [...classes, "bg-[#b89e14]", "text-black", "font-semibold"];
    //         break;
    //     default:
    //         classes = [...classes, "bg-[#63536C]", "text-white", "font-normal"];
    // }

    return <span className={classes.join(" ")}>{children}</span>;
}
