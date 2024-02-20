import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WEBSOCKET_URL, PROMPT } from '../utils/constants';

export default function GameView() {
    const location = useLocation();

    const { name, rating, cover } = location.state;

    const [response, setResponse] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const formatResponse = (text: string) => {
        return text.replace(/\n/g, '<br>');
    };

    const fileName = name + '.csv';

    const handleSubmit = async () => {

        if (isSubmitting) return;
        setIsClicked(true);

        setResponse('');

        setIsSubmitting(true);

        const socket = new WebSocket(WEBSOCKET_URL);

        const payload = { "question": PROMPT, "game": name, "filename": fileName };
        console.log(payload);

        // console.log(JSON.stringify(payload));

        socket.addEventListener('open', () => {
            socket.send(JSON.stringify(payload));
        });

        // WORKING LLM reponse
        socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);

            if (message.event === 'text-generated') {
                const text = message.text;
                console.log('Message from server:', text);

                if (text === '\\end') {
                    console.log('Closing socket...')
                    socket.close();
                    setIsSubmitting(false);
                }

                setResponse((prevResponse) => prevResponse + text);
            }
        });

        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
            setIsSubmitting(false);
        });


        // TEST
        // socket.addEventListener('message', (event) => {
        //     const message = JSON.parse(event.data);

        //     if (message.event === 'dev-test-endpoint') {
        //         const text = message.text;
        //         console.log('Message from server:', text);
        //         if (text === 'ENDEND') {
        //             console.log('Closing socket...')
        //             socket.close();
        //             setIsSubmitting(false);
        //         }
        //         setResponse((prevResponse) => prevResponse + text);
        //     }
        // });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex justify-center items-start mt-4">
                <div className="w-1/5 mr-6">
                    <img
                        className="w-full h-auto rounded-lg"
                        src={cover}
                        alt="Game Cover"

                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold mb-2">{name}</h1>
                    <h2 className="text-lg text-gray-700 mb-2">Rating: {rating}</h2>
                    {!isClicked ? (
                        <button
                            className="mt-3 px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700 transition-all duration-300 hover:cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Get Review from LLM
                        </button>
                    ) : (
                        <div className="mt-3 px-4 py-2 bg-blue-500 rounded-lg text-white animate-pulse">
                            Generating review...
                        </div>
                    )}
                </div>
            </div>

            {/* <div className="flex flex-col items-center mt-auto mb-40">
                <textarea
                    className="w-2/3 h-24 p-2 border rounded focus:outline-none focus:border-blue-500 desc"
                    placeholder="Generated review"
                    value={response}
                    onChange={handlellmresponseChange}
                />
            </div> */}

            {
                response && (
                    <div className="w-2/3 mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
                        <div className="text-center text-green-500 font-bold text-xl py-2 bg-gray-200">Response</div>
                        <div
                            className="text-left text-green-500 p-4"
                            dangerouslySetInnerHTML={{ __html: formatResponse(response) + '<span id="cursor"> ▊</span>' }}
                        ></div>
                    </div>
                )
            }

        </div >
    );
};
