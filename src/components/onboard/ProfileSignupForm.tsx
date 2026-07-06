"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ScheduleTemplatePicker } from "@/components/onboard/ScheduleTemplatePicker";
import { EVENT_GROUPS } from "@/data/content";
import {
  CLUB_YEARS_OPTIONS,
  DOMINANT_SIDE_OPTIONS,
  MAX_PRIMARY_EVENTS,
  SEX_OPTIONS,
  TECH_SUIT_OPTIONS,
} from "@/data/onboard";
import { formatScheduleSummary } from "@/lib/schedule";
import { loadData, saveProfile } from "@/lib/storage";
import {
  defaultProfileForm,
  formToProfile,
  profileLabel,
  SIGNUP_STEPS,
  suggestedGradYear,
  validateCurrentStep,
  validateProfileForm,
  type ProfileFormState,
  type SignupStep,
} from "@/lib/profile";

export function ProfileSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProfileFormState>(defaultProfileForm);
  const [step, setStep] = useState<SignupStep>("role");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loadData().profile) {
      router.replace("/dashboard");
    }
  }, [router]);

  const stepIndex = SIGNUP_STEPS.indexOf(step);

  function updateForm(patch: Partial<ProfileFormState>) {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      if (patch.age !== undefined) {
        next.gradYear = String(suggestedGradYear(Number(patch.age)));
      }
      return next;
    });
    setError(null);
  }

  function goToStep(next: SignupStep) {
    setStep(next);
    setError(null);
  }

  function advance() {
    const err = validateCurrentStep(step, form);
    if (err) {
      setError(err);
      return;
    }
    const next = SIGNUP_STEPS[stepIndex + 1];
    if (next) goToStep(next);
  }

  function selectRole(role: ProfileFormState["role"]) {
    updateForm({ role });
    setTimeout(() => goToStep("name"), 200);
  }

  function toggleEvent(event: string) {
    setForm((prev) => {
      if (prev.stillFiguringOutEvents) {
        return { ...prev, stillFiguringOutEvents: false, events: [event] };
      }
      const selected = prev.events.includes(event);
      if (selected) {
        return { ...prev, events: prev.events.filter((e) => e !== event) };
      }
      if (prev.events.length >= MAX_PRIMARY_EVENTS) return prev;
      return { ...prev, events: [...prev.events, event] };
    });
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateProfileForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    saveProfile(formToProfile(form));
    router.push("/dashboard");
  }

  return (
    <div className="pb-28 sm:pb-8">
      {error && (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="space-y-8">
        {stepIndex > 0 && (
          <AnsweredRow
            label="I am a…"
            value={form.role === "athlete" ? "Swimmer" : "Parent"}
            onEdit={() => goToStep("role")}
          />
        )}

        {step === "role" && (
          <RollIn>
            <Question title="I am a…">
              <div className="grid grid-cols-2 gap-3">
                <RoleCard
                  selected={form.role === "athlete"}
                  title="Swimmer"
                  onClick={() => selectRole("athlete")}
                />
                <RoleCard
                  selected={form.role === "parent"}
                  title="Parent"
                  onClick={() => selectRole("parent")}
                />
              </div>
            </Question>
          </RollIn>
        )}

        {stepIndex > 1 && (
          <AnsweredRow
            label={profileLabel(form.role, "name")}
            value={form.firstName}
            onEdit={() => goToStep("name")}
          />
        )}

        {step === "name" && (
          <RollIn>
            <Question title={profileLabel(form.role, "name")}>
              <input
                value={form.firstName}
                onChange={(e) => updateForm({ firstName: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), advance())}
                className="input"
                placeholder={form.role === "parent" ? "Alex" : "Your first name"}
                autoComplete="given-name"
                autoFocus
              />
              <ContinueButton onClick={advance} />
            </Question>
          </RollIn>
        )}

        {stepIndex > 2 && (
          <AnsweredRow
            label="Age, grad & sex"
            value={`${form.age} · Class of ${form.gradYear} · ${form.sex === "female" ? "Female" : form.sex === "male" ? "Male" : "—"}`}
            onEdit={() => goToStep("basics")}
          />
        )}

        {step === "basics" && (
          <RollIn>
            <Question title="Age, grad year & sex">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-slate-600">{profileLabel(form.role, "age")}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={form.age}
                    onChange={(e) => updateForm({ age: e.target.value })}
                    className="input mt-2"
                    min={8}
                    max={22}
                    autoFocus
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">{profileLabel(form.role, "grad")}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={form.gradYear}
                    onChange={(e) => updateForm({ gradYear: e.target.value })}
                    className="input mt-2"
                  />
                </label>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-800">Sex</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {SEX_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateForm({ sex: option.value })}
                    className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-medium ${
                      form.sex === option.value
                        ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
                        : "border-[#d9d2c7] bg-white text-slate-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <ContinueButton onClick={advance} />
            </Question>
          </RollIn>
        )}

        {stepIndex > 3 && (
          <AnsweredRow
            label="Team schedule"
            value={formatScheduleSummary(form.practiceSchedule)}
            onEdit={() => goToStep("schedule")}
          />
        )}

        {step === "schedule" && (
          <RollIn>
            <Question title="Your team's typical week">
              <ScheduleTemplatePicker
                schedule={form.practiceSchedule}
                onChange={(practiceSchedule) => updateForm({ practiceSchedule })}
              />
              <ContinueButton onClick={advance} />
            </Question>
          </RollIn>
        )}

        {stepIndex > 4 && (
          <AnsweredRow
            label="Primary events"
            value={
              form.stillFiguringOutEvents
                ? "Still figuring it out"
                : form.events.join(", ")
            }
            onEdit={() => goToStep("events")}
          />
        )}

        {step === "events" && (
          <RollIn>
            <Question title="Primary events">
              <button
                type="button"
                onClick={() =>
                  updateForm({
                    stillFiguringOutEvents: !form.stillFiguringOutEvents,
                    events: !form.stillFiguringOutEvents ? [] : form.events,
                  })
                }
                className={`mb-4 w-full rounded-xl border px-4 py-3 text-left text-sm ${
                  form.stillFiguringOutEvents
                    ? "border-[#0f4c5c] bg-[#e8f4f6]"
                    : "border-[#d9d2c7] bg-white"
                }`}
              >
                <span className="font-medium text-slate-900">Still figuring it out</span>
                <span className="mt-0.5 block text-slate-600">
                  No primary events locked in yet — totally fine.
                </span>
              </button>
              {!form.stillFiguringOutEvents && (
                <>
                  <p className="mb-3 text-xs text-slate-500">
                    Pick up to {MAX_PRIMARY_EVENTS} · {form.events.length} selected
                  </p>
                  <div className="space-y-5">
                    {EVENT_GROUPS.map((group) => (
                      <div key={group.label}>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                          {group.label}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {group.events.map((event) => {
                            const selected = form.events.includes(event);
                            const maxed = !selected && form.events.length >= MAX_PRIMARY_EVENTS;
                            return (
                              <button
                                key={event}
                                type="button"
                                onClick={() => toggleEvent(event)}
                                disabled={maxed}
                                className={`rounded-full border px-3 py-2 text-sm transition active:scale-[0.98] ${
                                  selected
                                    ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
                                    : maxed
                                      ? "cursor-not-allowed border-[#e7e2d9] bg-[#faf8f5] text-slate-400"
                                      : "border-[#d9d2c7] bg-white text-slate-600"
                                }`}
                              >
                                {event}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <ContinueButton onClick={advance} />
            </Question>
          </RollIn>
        )}

        {stepIndex > 5 && (
          <AnsweredRow
            label="Height, weight & wingspan"
            value={`${form.heightFeet}'${form.heightInches}" · ${form.weightLbs} lbs · span ${form.wingspanFeet}'${form.wingspanInches}"`}
            onEdit={() => goToStep("body")}
          />
        )}

        {step === "body" && (
          <RollIn>
            <Question title="Height, weight & wingspan">
              <p className="text-sm text-slate-500">
                Wingspan helps with body and event orientation — what works best varies by swimmer.
              </p>
              <div className="mt-4 space-y-4">
                <HeightFields
                  label={profileLabel(form.role, "height")}
                  feet={form.heightFeet}
                  inches={form.heightInches}
                  onFeet={(v) => updateForm({ heightFeet: v })}
                  onInches={(v) => updateForm({ heightInches: v })}
                />
                <HeightFields
                  label={profileLabel(form.role, "wingspan")}
                  feet={form.wingspanFeet}
                  inches={form.wingspanInches}
                  onFeet={(v) => updateForm({ wingspanFeet: v })}
                  onInches={(v) => updateForm({ wingspanInches: v })}
                />
                <label className="block">
                  <span className="text-sm font-medium text-slate-800">
                    {profileLabel(form.role, "weight")} (lbs)
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={form.weightLbs}
                    onChange={(e) => updateForm({ weightLbs: e.target.value })}
                    className="input mt-2"
                    placeholder="140"
                    required
                  />
                </label>
              </div>
              <ContinueButton onClick={advance} />
            </Question>
          </RollIn>
        )}

        {step === "team" && (
          <RollIn>
            <form id="signup-team-form" onSubmit={handleSubmit}>
              <Question title="Team context & gear">
                <div className="space-y-5">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-800">Years on club team</span>
                    <select
                      value={form.clubYears}
                      onChange={(e) => updateForm({ clubYears: e.target.value })}
                      className="input mt-2"
                    >
                      {CLUB_YEARS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex items-center gap-3 rounded-xl border border-[#d9d2c7] bg-white px-4 py-3">
                    <input
                      type="checkbox"
                      checked={form.swimsHighSchool}
                      onChange={(e) => updateForm({ swimsHighSchool: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-slate-800">
                      Also swims high school (most club swimmers do)
                    </span>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-800">Team / club name (optional)</span>
                    <input
                      value={form.teamName}
                      onChange={(e) => updateForm({ teamName: e.target.value })}
                      className="input mt-2"
                      placeholder="e.g. Central Aquatics"
                    />
                  </label>

                  <label className="flex items-center gap-3 rounded-xl border border-[#d9d2c7] bg-white px-4 py-3">
                    <input
                      type="checkbox"
                      checked={form.wearsDragsuit}
                      onChange={(e) => updateForm({ wearsDragsuit: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-slate-800">Usually wears a drag suit at practice</span>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-800">Tech suit for meets</span>
                    <select
                      value={form.techSuit}
                      onChange={(e) => updateForm({ techSuit: e.target.value })}
                      className="input mt-2"
                    >
                      {TECH_SUIT_OPTIONS.map((suit) => (
                        <option key={suit} value={suit}>
                          {suit}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-800">Dominant side (optional)</span>
                    <select
                      value={form.dominantSide}
                      onChange={(e) =>
                        updateForm({ dominantSide: e.target.value as ProfileFormState["dominantSide"] })
                      }
                      className="input mt-2"
                    >
                      {DOMINANT_SIDE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type="submit" className="btn-primary mt-6 hidden sm:block">
                  Create profile
                </button>
              </Question>
            </form>
          </RollIn>
        )}
      </div>

      {step === "team" && (
        <div className="fixed inset-x-0 bottom-0 border-t border-[#e7e2d9] bg-[#f7f5f1]/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
          <button type="submit" form="signup-team-form" className="btn-primary">
            Create profile
          </button>
        </div>
      )}
    </div>
  );
}

function HeightFields({
  label,
  feet,
  inches,
  onFeet,
  onInches,
}: {
  label: string;
  feet: string;
  inches: string;
  onFeet: (v: string) => void;
  onInches: (v: string) => void;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs text-slate-500">Feet</span>
          <input
            type="number"
            inputMode="numeric"
            value={feet}
            onChange={(e) => onFeet(e.target.value)}
            className="input mt-1"
            placeholder="5"
            min={3}
            max={7}
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-500">Inches</span>
          <input
            type="number"
            inputMode="numeric"
            value={inches}
            onChange={(e) => onInches(e.target.value)}
            className="input mt-1"
            placeholder="8"
            min={0}
            max={11}
          />
        </label>
      </div>
    </div>
  );
}

function RollIn({ children }: { children: React.ReactNode }) {
  return <div className="roll-in">{children}</div>;
}

function Question({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-slate-900 sm:text-2xl">{title}</h2>
      {children}
    </div>
  );
}

function AnsweredRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex w-full items-start justify-between gap-4 border-b border-[#e7e2d9] pb-4 text-left transition hover:opacity-80"
    >
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
      </div>
      <span className="shrink-0 text-xs text-[#0f4c5c]">Change</span>
    </button>
  );
}

function ContinueButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-2 text-sm font-medium text-[#0f4c5c] disabled:cursor-not-allowed disabled:text-slate-400"
    >
      Continue →
    </button>
  );
}

function RoleCard({
  selected,
  title,
  onClick,
}: {
  selected: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-14 rounded-xl border px-4 py-3 text-center text-sm font-medium transition active:scale-[0.98] ${
        selected
          ? "border-[#0f4c5c] bg-[#e8f4f6] text-[#0f4c5c]"
          : "border-[#d9d2c7] bg-white text-slate-700"
      }`}
    >
      {title}
    </button>
  );
}
