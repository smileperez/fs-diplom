import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import axiosClient from "../../axios";
import MatrixComponent from "../../components/admin/MatrixComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import EButton from "../../components/core/EButton";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Config() {
    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    const [adjustedMatrix, setAdjustedMatrix] = useState();

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Состояние для загрузки всех типов мест из БД
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(false);

    //
    const [coord, setCoord] = useState({ row: -1, seat: -1 });

    // Полученный из БД массив сидушек для конкретного зала.
    const [matrixSeats, setMatrixSeats] = useState();

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/halls")
            .then(({ data }) => {
                setHalls(data.data);
                getTypes();
            });
    }, []);

    // Функция получения списка типов мест из БД
    const getTypes = () => {
        axiosClient
            .get("/types")
            .then(({ data }) => {
                setTypes(data.data);
                setLoading(false);
            });
    };

    // Функция получения матрицы сидушек из БД для конкретного зала
    const getSeats = (hall_id) => {
        axiosClient
            .get(`/seats/${hall_id}`)
            .then(({ data }) => {
                setMatrixSeats(data);
                setLoading(false);
            });
    };

    // Функция автообновления матрицы сидушек из БД,
    // в момент когда пользователь тынкул на конкретный зал в выпадающем списке.
    useEffect(() => {
        if (hall) {
            getSeats(hall.id);
        }
    }, [hall]);

    // callback функция, для получения выбранного зала из под компонента <SelectMenusComponent>
    const selectedHall = (hall) => {
        setHall(hall);
    };

    // callback функция, для получения координат места из под компонента <MatrixComponent>
    const selectedCoords = (coord) => {
        setCoord(coord);
    };

    const sendAdjustedMatrix = (adjustedMatrix) => {
        setAdjustedMatrix(adjustedMatrix);
    };

    // Функция для выведения координваты в консоль для отладки
    useEffect(() => {
        if (coord) {
            console.log(coord);
            // console.log(state[0]);
            // console.log(matrixSeats);
        }

        if (adjustedMatrix) {
            console.log(adjustedMatrix);
            // console.log(state[0]);
            // console.log(matrixSeats);
        }
    }, [coord, adjustedMatrix]);

    // Функция удаления всех сидушек при изменении зала
    const deleteSeats = (hall_id) => {
        axiosClient
            .delete(`/seats/${hall_id}`)
            .then((response) => {
            });
    }

    // Функция создания матрицы сидушек и отправки ее в БД
    const postSeats = (matrixPayload) => {


        axiosClient
            .post("/seats", matrixPayload)
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    }

    // Отправка скорректированной по типу мест матрицы в БД
    const onClickSubmit = (event) => {

        console.log('ТЫК');
        event.preventDefault();

        // const payload = { ...updatedHall };

        deleteSeats(hall.id);
        postSeats(adjustedMatrix);

        // axiosClient
        //     .put(`/halls/${hall.id}`, payload)
        //     .then((response) => {
        //         // Получаем из ответа ID измененного зала
        //         halls_id = response.data.data.id;
        //         // Удавляем все сидушки с ID залом $halls_id
        //         deleteSeats(halls_id);
        //         // Генерим новую матрицу сидушек и отправляем в БД
        //         postSeats(Number(updatedHall.rows), Number(updatedHall.seats), types_id, halls_id);
        //         // Закрываем slider-popup
        //         setChange(false);
        //         // Заново перезагружаем из БД все залы
        //         getHalls();
        //     })
        //     .catch((err) => {
        //         if (err && err.response) {
        //             // Записываем error в состояние
        //             setError(err.response.data.message);
        //         }
        //         console.log(err, err.response);
        //     });
    };

    return (
        <PageComponent title="Настройка залов">
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <>
                    <div>
                        <h2 className="font-semibold">
                            Выберите доступный зал для конфигурации:
                        </h2>
                        <SelectMenusComponent
                            selectedHall={selectedHall}
                            items={halls}
                        />
                    </div>

                    <div className="flex flex-col mt-3 pt-1 border-t border-gray-200">
                        <h2 className="font-semibold">Доступные типы мест:</h2>
                        {types.length === 0 && (
                            <h2 className="text-sm font-normal text-gray-400">
                                Нет доступных типов мест
                            </h2>
                        )}
                        {types.length > 0 && (
                            <>
                                <div className="flex flex-wrap mt-1">
                                    {types?.map((type, idx) => (
                                        <div
                                            className="mt-1 mr-2 last:mr-0"
                                            key={idx}
                                        >
                                            <div style={{ backgroundColor: `#${type.color}` }} className={`w-auto px-2 ml-2 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>{type.type}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3 pt-1 border-t border-gray-200">
                                    <h2 className="font-semibold">
                                        Конфигурация мест:
                                    </h2>
                                    <h2 className="text-sm font-normal text-gray-400">
                                        Чтобы изменить тип кресла, нажмите по нему
                                        левой кнопкой мыши
                                    </h2>
                                    <div className="border-2 border-[#63536C] rounded p-3 mt-2">
                                        {!hall && (
                                            <span className="text-sm font-normal text-gray-400">
                                                Для отображения конфигурации
                                                выберите зал
                                            </span>
                                        )}
                                        {hall && (
                                            <div className="flex flex-col justify-center items-center">
                                                <span className="tracking-[1.25em]">
                                                    ЭКРАН
                                                </span>
                                                <div className="mt-2">
                                                    <MatrixComponent
                                                        matrixSeats={matrixSeats}
                                                        rows={hall.rows}
                                                        seats={hall.seats}
                                                        types={types}
                                                        selectedCoords={selectedCoords}
                                                        sendAdjustedMatrix={sendAdjustedMatrix}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                                            <EButton
                                                color="regular"
                                                onClick={onClickSubmit}
                                            >
                                                <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                                                Сохранить
                                            </EButton>
                                            <EButton color="gray" onClick="#">
                                                <XCircleIcon className="h-6 w-6 mr-2" />
                                                Отменить
                                            </EButton>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </PageComponent>
    );
}
