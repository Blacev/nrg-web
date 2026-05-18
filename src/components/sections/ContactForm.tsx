'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { createContactSchema, type ContactFormData } from '@/lib/contact-schema';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ContactoContent } from '@/lib/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls = (hasError: boolean) =>
  cn(
    'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-foreground',
    'placeholder:text-muted-foreground/50 outline-none transition-colors duration-150',
    'focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
      : 'border-border focus:border-accent focus:ring-accent/20',
  );

type FieldWrapperProps = {
  id: string;
  label: string;
  required: boolean;
  error?: string;
  children: React.ReactNode;
};

function FieldWrapper({ id, label, required, error, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-accent" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  form: ContactoContent['form'];
  contactEmail: string;
};

export function ContactForm({ form: f, contactEmail }: Props) {
  const [status, setStatus] = useState<Status>('idle');

  const schema = createContactSchema({
    required:   f.validation.required,
    email:      f.validation.email,
    minMessage: f.validation.minMessage,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 rounded-xl border border-accent/20 bg-accent/5 px-8 py-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-accent/15">
          <CheckCircle className="size-8 text-accent" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-primary">
            {f.successTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {f.successMessage}
          </p>
        </div>
        <button
          onClick={() => { reset(); setStatus('idle'); }}
          className={buttonVariants({ variant: 'secondary-navy', size: 'default' })}
        >
          {f.resetLabel}
        </button>
      </div>
    );
  }

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

      {/* ── Error banner ──────────────────────────────────────────────────── */}
      {status === 'error' && (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-red-700">{f.errorTitle}</p>
            <p className="text-sm text-red-600">
              {f.errorMessage.replace('{email}', contactEmail)}
            </p>
          </div>
        </div>
      )}

      {/* ── Field grid ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        {/* Row 1 */}
        <FieldWrapper id="fullName" label={f.fields.fullName.label} required={f.fields.fullName.required} error={errors.fullName?.message}>
          <input
            id="fullName" type="text" autoComplete="name"
            placeholder={f.fields.fullName.placeholder}
            className={inputCls(!!errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            disabled={isLoading}
            {...register('fullName')}
          />
        </FieldWrapper>

        <FieldWrapper id="company" label={f.fields.company.label} required={f.fields.company.required} error={errors.company?.message}>
          <input
            id="company" type="text" autoComplete="organization"
            placeholder={f.fields.company.placeholder}
            className={inputCls(!!errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
            disabled={isLoading}
            {...register('company')}
          />
        </FieldWrapper>

        {/* Row 2 */}
        <FieldWrapper id="position" label={f.fields.position.label} required={f.fields.position.required} error={errors.position?.message}>
          <input
            id="position" type="text" autoComplete="organization-title"
            placeholder={f.fields.position.placeholder}
            className={inputCls(!!errors.position)}
            disabled={isLoading}
            {...register('position')}
          />
        </FieldWrapper>

        <FieldWrapper id="email" label={f.fields.email.label} required={f.fields.email.required} error={errors.email?.message}>
          <input
            id="email" type="email" autoComplete="email"
            placeholder={f.fields.email.placeholder}
            className={inputCls(!!errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isLoading}
            {...register('email')}
          />
        </FieldWrapper>

        {/* Row 3 */}
        <FieldWrapper id="phone" label={f.fields.phone.label} required={f.fields.phone.required} error={errors.phone?.message}>
          <input
            id="phone" type="tel" autoComplete="tel"
            placeholder={f.fields.phone.placeholder}
            className={inputCls(!!errors.phone)}
            disabled={isLoading}
            {...register('phone')}
          />
        </FieldWrapper>

        <FieldWrapper id="country" label={f.fields.country.label} required={f.fields.country.required} error={errors.country?.message}>
          <input
            id="country" type="text" autoComplete="country-name"
            placeholder={f.fields.country.placeholder}
            className={inputCls(!!errors.country)}
            aria-describedby={errors.country ? 'country-error' : undefined}
            disabled={isLoading}
            {...register('country')}
          />
        </FieldWrapper>

        {/* Row 4 — selects */}
        <FieldWrapper id="serviceType" label={f.fields.serviceType.label} required={f.fields.serviceType.required} error={errors.serviceType?.message}>
          <div className="relative">
            <select
              id="serviceType"
              className={cn(inputCls(!!errors.serviceType), 'appearance-none pr-10')}
              aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
              disabled={isLoading}
              defaultValue=""
              {...register('serviceType')}
            >
              <option value="" disabled>{f.fields.serviceType.placeholder}</option>
              {f.fields.serviceType.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </div>
        </FieldWrapper>

        <FieldWrapper id="plantType" label={f.fields.plantType.label} required={f.fields.plantType.required} error={errors.plantType?.message}>
          <div className="relative">
            <select
              id="plantType"
              className={cn(inputCls(!!errors.plantType), 'appearance-none pr-10')}
              aria-describedby={errors.plantType ? 'plantType-error' : undefined}
              disabled={isLoading}
              defaultValue=""
              {...register('plantType')}
            >
              <option value="" disabled>{f.fields.plantType.placeholder}</option>
              {f.fields.plantType.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </div>
        </FieldWrapper>

        {/* Row 5 — textarea full width */}
        <div className="sm:col-span-2">
          <FieldWrapper id="message" label={f.fields.message.label} required={f.fields.message.required} error={errors.message?.message}>
            <textarea
              id="message"
              rows={6}
              placeholder={f.fields.message.placeholder}
              className={cn(inputCls(!!errors.message), 'min-h-[160px] resize-y')}
              aria-describedby={errors.message ? 'message-error' : undefined}
              disabled={isLoading}
              {...register('message')}
            />
          </FieldWrapper>
        </div>

      </div>

      {/* ── Submit ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            buttonVariants({ variant: 'primary', size: 'lg' }),
            'w-full sm:w-auto',
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {f.submittingLabel}
            </>
          ) : (
            f.submitLabel
          )}
        </button>
        <p className="text-xs text-muted-foreground">
          <span className="text-accent">*</span>{' '}
          {f.validation.required}
        </p>
      </div>

    </form>
  );
}
