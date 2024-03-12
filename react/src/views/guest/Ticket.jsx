import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import QRCode from "react-qr-code";

export default function Ticket() {

    // UUID из URL страницы (из роутера)
    const { uuid } = useParams();

    // Состояние для загрузки из БД информации по билету
    const [ticket, setTicket] = useState([]);

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState();

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState();

    // Состояние для загрузки из БД сидушек
    const [seats, setSeats] = useState([]);

    // Состояние
    const [payload, setPayload] = useState();

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(false);

    // Функция получения билета
    const getTicket = () => {
        setLoading(true);
        axiosClient
            .get(`/getticket/${uuid}`)
            .then(({ data }) => {
                setTicket(data);
                getSession(data[0].sessions_id);

                for (let i = 0; i < data.length; i++) {
                    getSeat(data[i].seats_id);
                }
            });
    };

    // Функция получения конкретного зала
    const getSession = (session_id) => {
        axiosClient
            .get(`/getsession/${session_id}`)
            .then(({ data }) => {
                setSession(data[0]);
                getMovie(data[0].movies_id)
            });
    };

    // Функция получения всех сессий по конкретному залу
    const getMovie = (movie_id) => {
        axiosClient
            .get(`/getmovie/${movie_id}`)
            .then(({ data }) => {
                setMovie(data[0]);
                setLoading(false);
            });
    };

    // Функция получения данных о купленных сидушках
    const getSeat = (seat_id) => {
        axiosClient
            .get(`/getseat/${seat_id}`)
            .then(({ data }) => {
                setSeats(item => [...item, data[0]]);
            });
    }

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getTicket();
    }, []);


    return (
        <>
            {loading && (
                <>
                    <header className="py-6 px-4 bg-[#F1EBE6] opacity-95 rounded">
                        <span className="block uppercase text-2xl text-[#C76F00] font-bold">Электронный билет</span>
                    </header>

                    <div className="p-4 mt-4 py-36 bg-[#F1EBE6] opacity-95 rounded">
                        <svg aria-hidden="true" className="mx-auto block w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                </>
            )}

            {!loading && (
                <>
                    <header className="py-6 px-4 bg-[#F1EBE6] opacity-95 rounded">
                        <span className="block uppercase text-2xl text-[#C76F00] font-bold">Электронный билет</span>
                    </header>

                    <div className="p-4 mt-4 bg-[#F1EBE6] opacity-95 rounded-t">
                        <h2 className="flex mt-1">
                            <span className="block mr-1 text-base">На фильм:</span>
                            <span className="font-medium">{movie?.title}</span>
                        </h2>

                        <p className="flex mt-1">
                            <span className="block mr-1">Дата:</span>
                            <span className="font-medium">{ticket[0]?.date}</span>
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">Начало сеанса:</span>
                            <span className="font-medium">{session?.sessionStart.slice(0, -3)}</span>
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">В зале:</span>
                            <span className="font-medium">№{session?.halls_id}</span>
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">Места:</span>
                            <span className="font-medium">{`${seats?.map(item => (` ${item.row}-${item.seat}`))}`}</span>
                        </p>
                    </div>

                    <div className="py-2 flex flex-col bg-[#F1EBE6] rounded-b px-4 opacity-95">
                        <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
                            <QRCode
                                size={2048}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={uuid}
                                viewBox={`0 0 512 512`}
                            />
                        </div>

                        <div className="flex flex-col items-start">
                            <p className="mt-4">
                                Покажите QR-код нашему контроллеру для подтверждения бронирования.
                            </p>
                            <p>
                                Приятного просмотра!
                            </p>
                        </div>
                    </div>

                </>
            )}

        </>
    )
}
