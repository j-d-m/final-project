import React, { useRef } from "react";
import EmailJS from "@emailjs/browser";

export default function Contact() {
    // const notify = () => toast.success("Great! Thanks for the message!");
    // console.log(notify);
    const formRef = useRef();
    // console.log(formRef);

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(formRef.current.value);
        EmailJS.sendForm(
            process.env.REACT_APP_EMAILJS_TOKEN,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            formRef.current,
            process.env.REACT_APP_EMAILJS_USER_ID
        )
            .then((result) => {
                // console.log(result.text);
            })
            .catch((err) => console.log(err));
        formRef.current.reset();
    };
    // console.log(formRef.current);
    return (
        <section id="contact" className="relative">
            <div className="container px-5 py-10 mx-auto flex md:w-1/2 sm:flex-nowrap flex-wrap">
                <div className="  px-5 py-10 mx-auto md:w-full sm:flex-nowrap flex-wrap bg-gray-900 rounded-lg sm:mr-10 p-10 items-center justify-center relative">
                    {/*from starts*/}
                    <form
                        ref={formRef}
                        onSubmit={sendEmail}
                        name="contact"
                        className="lg:w-full md:w-full flex flex-col md:ml-auto w-full md:py-8 mt-8 md:to-0"
                        id="contact_form"
                    >
                        <h1 className="text-white sm:text-4x1 text 3x1 mb-1 font-medium title-font">
                            Hire Me
                        </h1>
                        <p className="leading-relaxed mb-5">
                            I am available for freelance work.
                        </p>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-400">
                                Your Name:
                            </label>
                            <input
                                type="text"
                                name="from_name"
                                id="name"
                                className="w-full bg-gray-800 rounded border-gray-700 focus:border-indigo-500 focus:ring-2 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                maxLength={50}
                                required
                            />
                        </div>
                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-400">
                                your email
                            </label>
                            <input
                                type="email"
                                name="from_email"
                                id="email"
                                className="w-full bg-gray-800 rounded border-gray-700 focus:border-indigo-500 focus:ring-2 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                maxLength={50}
                                required
                            />
                        </div>
                        <div className="relative mb-4">                        <label className="leading-7 text-sm text-gray-400">
                            Your phone number
                        </label>
                            <input
                                type="phone"
                                name="from_number"
                                id="email"
                                className="w-full bg-gray-800 rounded border-gray-700 focus:border-indigo-500 focus:ring-2 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="relative mb-4">
                            <label className="leading-7 text-sm text-gray-400">Say Hi!</label>
                            <textarea
                                name="user_message"
                                id="message"
                                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus: ring-2 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                placeholder="Drop me a line"
                                maxLength={1000}
                                required
                            ></textarea>
                        </div>
                        <button
                            className="btn btn-outline focus:border-indigo-500 border focus:ring-5"
                            // onClick={notify}
                            type="submit"
                            value="send"
                        >
                            Send
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
}