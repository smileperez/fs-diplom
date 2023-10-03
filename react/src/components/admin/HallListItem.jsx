import React from "react";
import {
    AdjustmentsHorizontalIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import SlidePopupComponent from "./popups/SlidePopupComponent";
import { useState } from "react";
import EButton from "../core/EButton";
import ESelection from "../core/ESelection";

export default function HallListItem({ hall }) {
    // Состояние для открытия/закрытия SlidePopupComponent
    const [del, setDel] = useState(false);
    const [change, setChange] = useState(false);

    // Функция удаления зала
    const onClickDelete = (event) => {
        event.preventDefault();
        console.log("Происходит удаление зала");

        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

    return (
        <>
            <section className="mt-4 flex">
                <div className="p-2 bg-[#F1EBE6]/95 rounded w-[40px] flex items-center justify-center">
                    <h2 className="text-xl font-bold">{hall.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex flex">
                        <div className="w-auto">
                            <h2 className="text-sm font-light">
                                Название зала:{" "}
                                <ESelection>{hall.name}</ESelection>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Конфигурация зала:{" "}
                                <ESelection>
                                    {hall.rows} x {hall.seats}
                                </ESelection>
                            </h2>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-sm font-light font-thin">
                                Общее кол-во мест:{" "}
                                <ESelection>
                                    {hall.rows * hall.seats}
                                </ESelection>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Количество VIP мест:{" "}
                                <ESelection color="gold">
                                    {hall.seats}
                                </ESelection>
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <EButton circle onClick={() => setChange(true)}>
                            <AdjustmentsHorizontalIcon className="w-6 h-7" />
                        </EButton>
                        <EButton
                            circle
                            color="danger"
                            onClick={() => setDel(true)}
                        >
                            <TrashIcon className="w-6 h-7" />
                        </EButton>
                    </div>
                </div>
            </section>

            <SlidePopupComponent
                open={del}
                setOpen={setDel}
                title="Удаление фильма"
            >
                <form onSubmit="#" action="#" method="POST">
                    <div className="block text-sm font-medium leading-6 text-gray-900">
                        Вы действительно хотите удалить этот зал?
                    </div>

                    <div className="flex">
                        <button
                            onClick={onClickDelete}
                            type="button"
                            className="flex w-full justify-center rounded bg-red-500 px-3 py-1.5 mt-6 text-black font-semibold leading-6 shadow-sm transition duration-500 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                        >
                            Удалить
                        </button>
                        <button
                            onClick={() => setDel(false)}
                            type="button"
                            className="flex w-full justify-center rounded bg-[#63536C] px-3 py-1.5 mt-6 ml-10 text-gray-300 font-semibold leading-6 shadow-sm transition duration-500 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                        >
                            Отменить
                        </button>
                    </div>
                </form>
            </SlidePopupComponent>
        </>
    );
}
