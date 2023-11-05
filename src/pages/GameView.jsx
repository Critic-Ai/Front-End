import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function GameView() {
    const location = useLocation();

    const { name, rating, cover } = location.state;

    const [response, setResponse] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatResponse = (text) => {
        return text.replace(/\n/g, '<br>');
    };

    const fileName = name + '.csv';

    const handleSubmit = async () => {

        if (isSubmitting) return;

        setResponse('');

        setIsSubmitting(true);

        const socket = new WebSocket('ws://127.0.0.1:2023/');

        const payload = { "question": "how is the game?", "game": name, "filename": fileName };
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
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-start mt-4">
                <div className="w-1/5 mr-20">
                    <img
                        className="w-full h-auto im"
                        src={cover}
                        alt="dummy image"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="mb-2 title">{name}</h1>
                    <h2 className="mb-2 rating">Rating: {rating}</h2>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <button
                    className="mt-4 p-2 w-1/4 bg-blue-500 rounded-lg text-white hover:bg-blue-700 transition-all duration-300"
                    onClick={handleSubmit}
                >
                    Get Review from LLM
                </button>
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
                    <div
                        id="response-container"
                        className="p-4 w-2/3 flex flex-col mx-auto m-5 bg-black rounded-lg shadow-md"
                    >
                        <div className="p-3 text-center text-green-500 font-bold text-xl bg-slate-">Response</div>
                        <div
                            className="text-left text-green-500"
                            dangerouslySetInnerHTML={{ __html: formatResponse(response) + '<span id="cursor"> ▊</span>' }}
                        ></div>
                    </div>
                )
            }

        </div >
    );
};
