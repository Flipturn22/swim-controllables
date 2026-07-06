import { Header } from "@/components/Header";
import { BODY_EVENT_CARDS, CONTROLLABLES } from "@/data/content";

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-medium text-slate-900">Controllables</h1>
        <p className="mt-2 text-slate-600">
          What you can influence outside the pool. Not workout prescriptions — questions and
          context to support buy-in.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-medium text-slate-900">Off-pool levers</h2>
          <div className="mt-6 space-y-6">
            {CONTROLLABLES.map((item) => (
              <article key={item.id} className="rounded-xl border border-[#e7e2d9] bg-white p-6">
                <h3 className="text-lg font-medium text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.summary}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Questions for your coach
                  </p>
                  <ul className="mt-2 space-y-2">
                    {item.coachQuestions.map((q) => (
                      <li key={q} className="text-sm leading-6 text-slate-700">
                        · {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-medium text-slate-900">Body & events</h2>
          <p className="mt-2 text-sm text-slate-600">Orientation, not destiny.</p>
          <div className="mt-6 space-y-4">
            {BODY_EVENT_CARDS.map((card) => (
              <article key={card.title} className="rounded-xl border border-[#e7e2d9] bg-white p-6">
                <h3 className="font-medium text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{card.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
