import { useState } from "react";

export default function App() {
    const [form, setForm] = useState({
        to: "",
        subject: "",
        content: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/task/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error("Request failed:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="to"
                        placeholder="To"
                        value={form.to}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <textarea
                        name="content"
                        placeholder="Content"
                        rows="5"
                        value={form.content}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Send</button>
            </form>
        </div>
    );
}
