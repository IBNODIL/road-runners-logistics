"use client";
import { useState } from "react";
import { useForm, type FieldErrors, type UseFormRegister, type Resolver } from "react-hook-form";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import Button from "./Button";

const required = (m: string) => z.string().trim().min(1, m);
const base = {
  name: required("Please enter your full name").min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  company: required("Please enter your company").max(120, "Company name is too long"),
  email: required("Please enter your email").email("Enter a valid email address"),
  phone: required("Please enter your phone number").regex(/^\+?[0-9\s().-]{7,20}$/, "Enter a valid phone number"),
};
const services = ["Road Freight", "Air Freight", "Ocean Freight", "Warehouse Services", "Customs Clearance", "Supply Chain"];

export const contactSchema = z.object({ ...base, message: z.string().trim().max(1500, "Message is too long").optional() });
export const quoteSchema = z
  .object({
    ...base,
    origin: required("Please enter the origin"),
    destination: required("Please enter the destination"),
    service: z.enum(services as [string, ...string[]], { message: "Please select a service" }),
    timeline: required("Please enter your preferred timeline"),
    pickup: required("Please select a pickup date"),
    delivery: required("Please select a delivery date"),
    details: z.string().trim().max(1500, "Details are too long").optional(),
  })
  .refine((d) => !d.pickup || !d.delivery || d.delivery >= d.pickup, { path: ["delivery"], message: "Delivery date can't be before pickup" });
export const compactQuoteSchema = z.object({
  ...base,
  service: z.enum(services as [string, ...string[]], { message: "Please select a service" }),
  timeline: required("Please enter your preferred timeline"),
  details: z.string().trim().max(1500, "Details are too long").optional(),
});

/** Minimal zod → react-hook-form resolver (no extra dependency). */
function zodResolver<T extends z.ZodTypeAny>(schema: T): Resolver<any> {
  return async (values) => {
    const r = schema.safeParse(values);
    if (r.success) return { values: r.data, errors: {} };
    const errors: Record<string, { type: string; message: string }> = {};
    for (const i of r.error.issues) {
      const k = String(i.path[0] ?? "root");
      if (!errors[k]) errors[k] = { type: i.code, message: i.message };
    }
    return { values: {}, errors: errors as FieldErrors };
  };
}

type FieldProps = { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode };
function Field({ id, label, required: req, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label">{label}{req && <span className="text-brand"> *</span>}</label>
      {children}
      <div className="min-h-[18px]">
        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="text-[13px] leading-[18px] text-red-600">
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const input = "w-full rounded-lg border bg-white px-4 py-[13px] text-[16px] outline-none transition-colors placeholder:text-ink/40 focus:border-ink";
const cls = (bad: boolean) => `${input} ${bad ? "border-red-500" : "border-ink/15"}`;

function Success({ onReset, title }: { onReset: () => void; title: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[360px] flex-col items-start justify-center gap-5">
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }} className="flex h-14 w-14 items-center justify-center rounded-full bg-brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.span>
      <h6 className="h5">{title}</h6>
      <p>Thank you — our team will review your message and get back to you shortly.</p>
      <button onClick={onReset} className="label border-b border-ink pb-[2px]">Send another</button>
    </motion.div>
  );
}

function useSubmit() {
  const [sent, setSent] = useState(false);
  const submit = async (data: unknown) => {
    // Simulated request: no backend in this clone.
    await new Promise((r) => setTimeout(r, 900));
    console.info("Form submitted", data);
    setSent(true);
  };
  return { sent, setSent, submit };
}

type R = UseFormRegister<any>;
function TextField({ id, label, ph, register, errors, type = "text", req = true }: { id: string; label: string; ph?: string; register: R; errors: FieldErrors<any>; type?: string; req?: boolean }) {
  const e = errors[id]?.message as string | undefined;
  return (
    <Field id={id} label={label} required={req} error={e}>
      <input id={id} type={type} placeholder={ph} aria-invalid={!!e} {...register(id)} className={cls(!!e)} />
    </Field>
  );
}
function SelectField({ register, errors }: { register: R; errors: FieldErrors<any> }) {
  const e = errors.service?.message as string | undefined;
  return (
    <Field id="service" label="Service needed" required error={e}>
      <select id="service" defaultValue="" aria-invalid={!!e} {...register("service")} className={`${cls(!!e)} appearance-none`}>
        <option value="" disabled>Select a service</option>
        {services.map((s) => <option key={s}>{s}</option>)}
      </select>
    </Field>
  );
}
function Area({ id, label, ph, register, errors }: { id: string; label: string; ph: string; register: R; errors: FieldErrors<any> }) {
  const e = errors[id]?.message as string | undefined;
  return (
    <Field id={id} label={label} error={e}>
      <textarea id={id} rows={4} placeholder={ph} aria-invalid={!!e} {...register(id)} className={`${cls(!!e)} resize-none`} />
    </Field>
  );
}
function Submit({ busy, children }: { busy: boolean; children: string }) {
  return <Button type="submit" variant="dark" disabled={busy}>{busy ? "Sending…" : children}</Button>;
}

export function ContactForm() {
  const { sent, setSent, submit } = useSubmit();
  const f = useForm({ resolver: zodResolver(contactSchema), mode: "onTouched" });
  if (sent) return <Success title="Message sent" onReset={() => { f.reset(); setSent(false); }} />;
  const { register, formState: { errors, isSubmitting, isValid } } = f;
  return (
    <form noValidate onSubmit={f.handleSubmit(submit)} className="line-form grid grid-cols-2 gap-x-8 max-[600px]:grid-cols-1">
      <TextField id="name" label="Full name" ph="Jordan Blake" register={register} errors={errors} />
      <TextField id="company" label="Company" ph="Acme Manufacturing" register={register} errors={errors} />
      <TextField id="email" label="Email" ph="jordan@company.com" type="email" register={register} errors={errors} />
      <TextField id="phone" label="Phone" ph="+1 (000) 000-0000" type="tel" register={register} errors={errors} />
      <div className="col-span-2 max-[600px]:col-span-1"><Area id="message" label="Message" ph="Tell us about your requirements..." register={register} errors={errors} /></div>
      {/* inactive (grey) until every required field is valid, then active (dark) */}
      <button type="submit" disabled={!isValid || isSubmitting} className={`label col-span-2 mt-4 w-full rounded-lg px-5 py-[18px] text-white transition-colors duration-300 max-[600px]:col-span-1 ${isValid ? "cursor-pointer bg-ink hover:bg-brand" : "cursor-not-allowed bg-[#808086]"}`}>
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export function QuoteForm() {
  const { sent, setSent, submit } = useSubmit();
  const f = useForm({ resolver: zodResolver(quoteSchema), mode: "onTouched" });
  if (sent) return <Success title="Quote request received" onReset={() => { f.reset(); setSent(false); }} />;
  const { register, formState: { errors, isSubmitting } } = f;
  return (
    <form noValidate onSubmit={f.handleSubmit(submit)} className="grid grid-cols-2 gap-x-6 max-[600px]:grid-cols-1">
      <TextField id="name" label="Full name" ph="Jordan Blake" register={register} errors={errors} />
      <TextField id="company" label="Company" ph="Acme Manufacturing" register={register} errors={errors} />
      <TextField id="email" label="Email" ph="jordan@company.com" type="email" register={register} errors={errors} />
      <TextField id="phone" label="Phone" ph="+1 (000) 000-0000" type="tel" register={register} errors={errors} />
      <TextField id="origin" label="Origin" ph="City, country" register={register} errors={errors} />
      <TextField id="destination" label="Destination" ph="City, country" register={register} errors={errors} />
      <SelectField register={register} errors={errors} />
      <TextField id="timeline" label="Preferred timeline" ph="e.g. Within 2 weeks" register={register} errors={errors} />
      <TextField id="pickup" label="Pickup date" type="date" register={register} errors={errors} />
      <TextField id="delivery" label="Delivery date" type="date" register={register} errors={errors} />
      <div className="col-span-2 max-[600px]:col-span-1"><Area id="details" label="Additional requirements" ph="Tell us about your requirements..." register={register} errors={errors} /></div>
      <div className="col-span-2 mt-2 max-[600px]:col-span-1"><Submit busy={isSubmitting}>Request a Quote</Submit></div>
    </form>
  );
}

/** Short quote form used at the bottom of service pages and pricing. */
export function CompactQuoteForm() {
  const { sent, setSent, submit } = useSubmit();
  const f = useForm({ resolver: zodResolver(compactQuoteSchema), mode: "onTouched" });
  if (sent) return <Success title="Quote request received" onReset={() => { f.reset(); setSent(false); }} />;
  const { register, formState: { errors, isSubmitting } } = f;
  return (
    <form noValidate onSubmit={f.handleSubmit(submit)} className="grid grid-cols-2 gap-x-6 max-[600px]:grid-cols-1">
      <TextField id="name" label="Full name" ph="Jordan Blake" register={register} errors={errors} />
      <TextField id="company" label="Company" ph="Acme Manufacturing" register={register} errors={errors} />
      <TextField id="email" label="Email" ph="jordan@company.com" type="email" register={register} errors={errors} />
      <TextField id="phone" label="Phone" ph="+1 (000) 000-0000" type="tel" register={register} errors={errors} />
      <SelectField register={register} errors={errors} />
      <TextField id="timeline" label="Preferred timeline" ph="e.g. Within 2 weeks" register={register} errors={errors} />
      <div className="col-span-2 max-[600px]:col-span-1"><Area id="details" label="Cargo details" ph="Cargo type..." register={register} errors={errors} /></div>
      <div className="col-span-2 mt-2 max-[600px]:col-span-1"><Submit busy={isSubmitting}>Request a Quote</Submit></div>
    </form>
  );
}
