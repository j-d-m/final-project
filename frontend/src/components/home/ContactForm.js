import React, { useState } from "react";
import { useNavigate } from 'react-router';
import emailjs from '@emailjs/browser';

export default function Contact({ job }) {
    // const notify = () => toast.success("Great! Thanks for the message!");
    // console.log(notify);

    const [emailSent, setEmailSent] = useState(false);

    let navigate = useNavigate();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            "service_9tlcpdi",
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            e.target,
            process.env.REACT_APP_EMAILJS_USER_ID
        )
            .then((result) => {
                console.log(result.text);
            })
            .catch((err) => console.log(err));
        e.target.reset();
        setEmailSent(true);
    };
    // console.log(formRef.current);
    return (
        <>
            {emailSent ? (
                <div className="alert text-center" role="alert">
                    Your message was sent!
                </div>
            ) : (

                <div className="container contact-form-freelancer">
                    <h4>Contact the Company</h4>
                    <form
                        onSubmit={sendEmail}
                    >
                        <div class="form-row align-items-center">
                            <div class="form-group col-auto">
                                <label for="name">Company Name</label>
                                <input
                                    type="text"
                                    name="to_name"
                                    class="form-control"
                                    value={job.created_by.company_Name}
                                    readOnly
                                />
                            </div>
                            <div class="form-group col-auto">
                                <label for="email">Company Email</label>
                                <input
                                    type="email"
                                    name="to_email"
                                    class="form-control"
                                    value={job.created_by.email}
                                    readOnly
                                />
                            </div>

                        </div>
                        <div class="form-row align-items-center">
                            <div class="form-group col-auto">
                                <label for="name">Your Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    class="form-control"
                                    placeholder="Name"
                                    maxlength="50"
                                    required
                                />
                            </div>
                            <div class="form-group col-auto">
                                <label for="email">Your Email</label>
                                <input
                                    type="email"
                                    name="from_email"
                                    class="form-control"
                                    placeholder="Email"
                                    maxlength="50"
                                />
                            </div>

                        </div>

                        <div class="form-row">
                            <div class="form-group col-auto">
                                <label for="phone">Your Phone</label>
                                <input
                                    type="tel"
                                    name="from_phone"
                                    class="form-control"
                                    placeholder="Phone"
                                    maxlength="20"
                                />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="message">Message</label>
                                <textarea
                                    type="textarea"
                                    name="from_message"
                                    class="form-control"
                                    placeholder="Message"
                                    required
                                    rows={5}
                                    maxLength={500}
                                />
                            </div>
                        </div>
                        <div className="text-end m-2">
                            <button
                                type="submit"
                                class="btn btn-outline-secondary col-3 "
                                value="Send"


                            >Send</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}