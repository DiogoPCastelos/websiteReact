import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// Link to last year's motion-subscription tool (leave empty to hide the link).
const LAST_YEAR_URL = "https://termo.diogopcastelos.pt";

const EXAMPLES = [
  {
    icon: "📜",
    title: "Moções resumidas",
    text: "Resumo simples de cada moção e proposta publicada, para leres tudo antes de chegar.",
  },
  {
    icon: "⚖️",
    title: "Comparador de candidaturas",
    text: "Listas e moções de estratégia lado a lado: o que propõem, onde concordam, onde não.",
  },
  {
    icon: "📅",
    title: "Programa no teu calendário",
    text: "Adiciona o programa ao Google/Apple Calendar com alertas antes de cada ponto.",
  },
  {
    icon: "🧮",
    title: "Simulador de Hondt",
    text: "Mete os votos de cada lista e vê como ficaria a distribuição dos mandatos.",
  },
  {
    icon: "🚗",
    title: "Boleias e alojamento",
    text: "Encontra membros do teu distrito para partilhar carro, comboio ou quarto.",
  },
  {
    icon: "⏱️",
    title: "Treino de intervenção",
    text: "Cola o teu texto, vê quanto tempo demora a ler e treina com o cronómetro oficial.",
  },
];

const EMPTY = {
  name: "",
  contact: "",
  problem: "",
  idea: "",
  website: "", // honeypot
};

const inputClass =
  "w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 focus:bg-white/15 transition";

const Ideias = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    document.title = "Ideias · Convenção IL";
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const applyExample = (ex) =>
    setForm((f) => ({
      ...f,
      idea: f.idea ? `${f.idea}\n${ex.title}: ${ex.text}` : `${ex.title}: ${ex.text}`,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending" || cooldown > 0) return;

    // Bots fill hidden fields; pretend it worked.
    if (form.website) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const message = [
      "💡 NOVA IDEIA — Convenção Nacional IL",
      "",
      `Problema / o que dá trabalho hoje:\n${form.problem || "—"}`,
      "",
      `Ideia:\n${form.idea}`,
      "",
      `Contacto: ${form.contact || "—"}`,
    ].join("\n");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: "Diogo Castelos",
          from_name: `[Ideias Convenção] ${form.name || "Anónimo"}`,
          from_email: form.contact || "anonimo",
          message,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        () => {
          setStatus("sent");
          setForm(EMPTY);
          setCooldown(30);
        },
        (err) => {
          console.error("Erro ao enviar ideia:", err);
          setStatus("error");
        }
      );
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white relative overflow-hidden font-[Inter]">
      {/* Glow background */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-sky-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[28rem] h-[28rem] rounded-full bg-cyan-400/15 blur-[120px]" />

      <div className="relative max-w-3xl mx-auto px-4 py-10 md:py-16">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-white/60 hover:text-white transition mb-8"
        >
          ← diogopcastelos.pt
        </button>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sky-300 bg-sky-400/10 border border-sky-400/30 rounded-full px-3 py-1 mb-4">
            Convenção Nacional · Iniciativa Liberal
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            O que devia ser{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              automático
            </span>
            ?
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Quero construir ferramentas para os membros usarem na próxima
            Convenção — antes, durante ou depois. Diz-me o que te dá trabalho
            como participante, o que fazes à mão, ou o que gostavas de ter no
            telemóvel — eu tento automatizar.
          </p>
        </motion.header>

        {/* Last year's tool */}
        <section className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-sky-500/15 to-cyan-400/5 border border-sky-400/30 flex gap-4 items-start">
          <div className="text-3xl">✍️</div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-sky-300">
              O ano passado fiz isto
            </div>
            <h3 className="text-lg font-bold mt-1">Subscrição de moções</h3>
            <p className="text-sm text-white/70 mt-1">
              Preenchias os teus dados para subscrever uma moção e recebias o
              PDF pronto — só tinhas de assinar. É este o tipo de coisa que
              procuro: pequenas ferramentas que te poupam trabalho como membro.
            </p>
            {LAST_YEAR_URL && (
              <a
                href={LAST_YEAR_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-sm text-sky-300 hover:text-sky-200 mt-2"
              >
                Ver como funcionava →
              </a>
            )}
          </div>
        </section>

        {/* Inspiration */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-3">
            Sem ideias? Algumas para começar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.title}
                type="button"
                onClick={() => applyExample(ex)}
                className="text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/50 hover:bg-white/10 transition group"
              >
                <div className="text-2xl mb-1">{ex.icon}</div>
                <div className="font-semibold">{ex.title}</div>
                <div className="text-sm text-white/60 mt-1">{ex.text}</div>
                <div className="text-xs text-sky-300 mt-2 opacity-0 group-hover:opacity-100 transition">
                  + usar como ponto de partida
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="mt-10 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(14,165,233,0.15)]">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="text-5xl mb-3">🚀</div>
                <h3 className="text-2xl font-bold">Ideia recebida!</h3>
                <p className="text-white/70 mt-2">
                  Obrigado. Vou ler todas — se deixaste contacto, posso
                  falar contigo.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  disabled={cooldown > 0}
                  className="mt-6 px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {cooldown > 0
                    ? `Enviar outra (${cooldown}s)`
                    : "Enviar outra ideia"}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <h2 className="text-2xl font-bold">Submete a tua ideia</h2>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-white/80">
                    O que te dá trabalho como membro/participante?{" "}
                    <span className="text-white/40">(opcional)</span>
                  </span>
                  <textarea
                    name="problem"
                    rows={3}
                    maxLength={1500}
                    value={form.problem}
                    onChange={update}
                    placeholder="Ex.: tenho de ler dezenas de moções em PDF e não sei por onde começar…"
                    className={`${inputClass} resize-none`}
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-white/80">
                    A tua ideia <span className="text-sky-300">*</span>
                  </span>
                  <textarea
                    name="idea"
                    rows={5}
                    required
                    minLength={10}
                    maxLength={3000}
                    value={form.idea}
                    onChange={update}
                    placeholder="Que ferramenta gostavas de ter? Não precisa de ser técnico."
                    className={`${inputClass} resize-y`}
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/80">
                      Nome <span className="text-white/40">(opcional)</span>
                    </span>
                    <input
                      name="name"
                      maxLength={100}
                      value={form.name}
                      onChange={update}
                      placeholder="Anónimo"
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm text-white/80">
                      Email ou telemóvel{" "}
                      <span className="text-white/40">(opcional)</span>
                    </span>
                    <input
                      name="contact"
                      maxLength={150}
                      value={form.contact}
                      onChange={update}
                      placeholder="Para te poder dar feedback"
                      className={inputClass}
                    />
                  </label>
                </div>

                {/* Honeypot: hidden from humans */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={update}
                  className="hidden"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    ✖ Algo correu mal. Tenta outra vez daqui a pouco.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-sky-500 to-cyan-400 text-[#05070d] hover:brightness-110 transition disabled:opacity-60 disabled:cursor-wait"
                >
                  {status === "sending" ? "A enviar…" : "Enviar ideia"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </section>

        <p className="mt-8 text-center text-xs text-white/40">
          Projeto pessoal, não oficial, de um membro da IL.
        </p>
      </div>
    </div>
  );
};

export default Ideias;
