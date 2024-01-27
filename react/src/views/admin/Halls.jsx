import PageComponent from "../../components/admin/PageComponent";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import HallListItem from "../../components/admin/HallListItem";
import EButton from "../../components/core/EButton";
import { useEffect, useState } from "react";
import { PlusCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axiosClient from "../../axios.js";
import PaginationComponent from "../../components/admin/PaginationComponent";

export default function Halls() {
    // Состояние общего переченя залов для загрузки из БД
    const [halls, setHalls] = useState([]);

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояние открытия/закрытия слайдера (компонент SlidePopupComponent)
    const [open, setOpen] = useState(false);

    // Состояние нового зала для добавления в таблицу БД "Halls"
    const [hall, setHall] = useState({
        name: "",
        rows: "",
        seats: "",
    });

    // Состояние мест нового зала, для загрузки в таблицу БД "Seats"
    // const [halls_id, setHalls_id] = useState(0);
    let halls_id = 0;

    const [types_id, setTypes_id] = useState(1);


    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getHalls = (url) => {
        url = url || "/halls";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setHalls(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };
    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getHalls();
    }, []);

    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getHalls(link.url);
    };

    // console.log(makeMatrix(hall.rows, hall.seat))

    const getMatrix = (rows, seats) => {
        // Единица добавлена, чтобы в дальнейшем удалить индекс [0], чтобы привести массив сидушек к виду [1, 2, 3...]
        const seatsPlus = seats + 1;
        const line = [];
        for (let row = 1; row < rows + 1; row++) {
            const column = Array.from({ length: seatsPlus }, (__, seat) => {
                return { row, seat, halls_id, types_id };
            });
            // Приводим массив мест к виду к виду [1, 2, 3...].
            // Делаем начало индексов массива мест начиная с 1.
            column.shift();
            // Добавляем полученную "линию" мест в "ряды".
            line.push(column);
        }
        return line;
    };

    // Отправка request в БД с новым залом
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(halls_id);


        axiosClient
            .post("/halls", hall)
            .then((response) => {
                // Закрываем slider-popup
                setOpen(false);
                // Перезагружаем страницу
                getHalls();
                setHall({
                    name: "",
                    rows: "",
                    seats: "",
                });
                // Получаем ID нового зала.
                // FIXME: Используется переменная let для синхронности получения данных.
                // FIXME: При использоваии useState, состояние не успевает отработать и передать в следующую функцию актуальные данные.
                halls_id = response.data.data.id;

                postSeats();

            })
            .catch((error) => {
                if (error.response) {
                    setError({ __html: error.response.data.errors });
                }
                console.error(error);
            });
    };

    const postSeats = () => {
        const matrixPayload = getMatrix(Number(hall.rows), Number(hall.seats), types_id, halls_id);

        for (let i = 0; i < Number(hall.rows); i++) {
            axiosClient
                .post("/seats", matrixPayload[i])
                .catch((error) => {
                    if (error.response) {
                        setError({ __html: error.response.data.errors });
                    }
                    console.error(error);
                });
        }
    }

    return (
        <PageComponent
            title="Управление залами"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6" />
                    <div className="hidden md:ml-2 md:block">Добавить зал</div>
                </EButton>
            }
        >
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <div>
                    {halls.slice(0).reverse().map((hall) => (
                        <HallListItem
                            hall={hall}
                            getHalls={getHalls}
                            key={hall.id}
                        />
                    ))}
                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

            {/* Slide-Popup для добавления нового зала */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового зала"
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название зала */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название зала{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={hall.name}
                                onChange={(event) =>
                                    setHall({
                                        ...hall,
                                        name: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название зала */}

                    {/* Количество рядов X Количество мест в ряду */}
                    <div className="flex items-end">
                        {/* Количество рядов */}
                        <div className="mt-2">
                            <label
                                htmlFor="rows"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Количество рядов
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    id="rows"
                                    name="rows"
                                    value={hall.rows}
                                    onChange={(event) =>
                                        setHall({
                                            ...hall,
                                            rows: event.target.value,
                                        })
                                    }
                                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Количество рядов */}
                        <XMarkIcon className="w-6 h-6 mb-1.5 mx-6"></XMarkIcon>
                        {/* Количество мест в ряду */}
                        <div className="mt-2">
                            <label
                                htmlFor="seats"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Количество мест
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    id="seats"
                                    name="seats"
                                    value={hall.seats}
                                    onChange={(event) =>
                                        setHall({
                                            ...hall,
                                            seats: event.target.value,
                                        })
                                    }
                                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Количество мест в ряду */}
                    </div>
                    {/* Количество рядов X Количество мест в ряду */}

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit>
                            <PlusCircleIcon className="h-6 w-6 mr-2" />
                            Добавить
                        </EButton>

                        <EButton color="gray" onClick={() => setOpen(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    );
}
