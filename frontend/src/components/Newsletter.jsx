import { useState } from "react";
import { subscribe } from "../api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await subscribe(email);
      setStatus(r.message);
      setEmail("");
    } catch {
      setStatus("Please enter a valid email address.");
    }
  };

  return (
    <section className="newsletter" id="newsletter">
      <h2>Private collection releases</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button aria-label="Subscribe">→</button>
      </form>
      {status && <p className="status muted">{status}</p>}
    </section>
  );
}