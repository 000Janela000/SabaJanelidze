import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'
import { Github, Mail, Linkedin } from 'lucide-react'

interface FormData {
  name: string
  email: string
  description: string
  projectType: string
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    description: '',
    projectType: '',
  })
  const [formState, setFormState] = useState<FormState>({ status: 'idle' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.description || !formData.projectType) {
      setFormState({
        status: 'error',
        message: 'Please fill in all fields',
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormState({
        status: 'error',
        message: 'Please enter a valid email address',
      })
      return
    }

    setFormState({ status: 'loading' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setFormState({
        status: 'success',
        message: 'Message sent successfully!',
      })
      setFormData({ name: '', email: '', description: '', projectType: '' })
    } catch (error) {
      setFormState({
        status: 'error',
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.',
      })
    }
  }

  if (formState.status === 'success') {
    return (
      <div className="space-y-8">
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-8">
          <h3 className="text-2xl font-bold text-accent">
            {t(translations.contact.confirmation.title)}
          </h3>
          <p className="mt-3 text-lg text-text-muted">
            {t(translations.contact.confirmation.message)}
          </p>
        </div>

        {/* Contact Options */}
        <div>
          <p className="mb-4 text-sm font-semibold text-text-dim uppercase tracking-[0.15em]">
            {t(translations.contact.confirmation.emailLabel)}
          </p>
          <a
            href="mailto:ssjanelidze@gmail.com"
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
          >
            <Mail size={18} />
            ssjanelidze@gmail.com
          </a>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-text-dim uppercase tracking-[0.15em]">
            {t(translations.contact.confirmation.socialLabel)}
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/000Janela000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sabajanelidze"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-text-dim uppercase tracking-[0.15em]">
          {t(translations.contact.form.name)}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t(translations.contact.form.namePlaceholder)}
          className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-text placeholder-text-dim/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-text-dim uppercase tracking-[0.15em]">
          {t(translations.contact.form.email)}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t(translations.contact.form.emailPlaceholder)}
          className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-text placeholder-text-dim/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20"
        />
      </div>

      {/* Project Type Field */}
      <div className="space-y-2">
        <label htmlFor="projectType" className="block text-sm font-semibold text-text-dim uppercase tracking-[0.15em]">
          {t(translations.contact.form.projectType)}
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%23a1a1aa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
          }}
          className="w-full appearance-none rounded-lg border border-border bg-bg-elevated py-3 pl-4 pr-10 text-text transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20"
        >
          <option value="">— Select one —</option>
          <option value="mobile">{t(translations.contact.form.mobileApp)}</option>
          <option value="web">{t(translations.contact.form.webPlatform)}</option>
          <option value="ai">{t(translations.contact.form.aiProduct)}</option>
          <option value="design">{t(translations.contact.form.designSystem)}</option>
          <option value="other">{t(translations.contact.form.other)}</option>
        </select>
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-semibold text-text-dim uppercase tracking-[0.15em]">
          {t(translations.contact.form.description)}
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={t(translations.contact.form.descriptionPlaceholder)}
          rows={5}
          className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-3 text-text placeholder-text-dim/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20"
        />
        <p className="text-xs text-text-dim/70">
          {t(translations.contact.form.descriptionHint)}
        </p>
      </div>

      {/* Error Message */}
      {formState.status === 'error' && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">
            {formState.message}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState.status === 'loading'}
        className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-bg transition-all hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
      >
        {formState.status === 'loading'
          ? t(translations.contact.form.sending)
          : t(translations.contact.form.submit)}
      </button>
    </form>
  )
}
