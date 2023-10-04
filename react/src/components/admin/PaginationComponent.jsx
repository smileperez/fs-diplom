import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationComponent({ meta, onPageClick }) {
    function onClick(event, link) {
        event.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 md:px-6">
            <div className="flex flex-1 justify-between md:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Отображено{" "}
                        <span className="font-medium">{meta.to}</span> из{" "}
                        <span className="font-medium">{meta.total}</span>{" "}
                        результатов
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {meta.links &&
                            meta.links.map((link, idx) => (
                                <a
                                    href="#"
                                    onClick={(event) => onClick(event, link)}
                                    aria-current="page"
                                    className={
                                        `
                                    "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 ` +
                                        (idx === 0 ? "rounded-l-md " : "") +
                                        (idx === meta.links.length - 1
                                            ? "rounded-r-md "
                                            : "") +
                                        (link.active
                                            ? "bg-[#89639e] text-white transition duration-500 "
                                            : "hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0")
                                    }
                                    dangerouslySetInnerHTML={(idx === 0 ? {__html: '<',} : (idx === meta.links.length - 1 ? {__html: '>',} : {__html: link.label,}))}
                                >
                                </a>
                            ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
