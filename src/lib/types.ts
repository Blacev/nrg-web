// Tipos TypeScript estrictos para el contenido del sitio NRG
// Para agregar campos, edita estos tipos y actualiza los JSON correspondientes

// ─── Equipo ─────────────────────────────────────────────────────────────────

export type TeamMember = {
  id: string;
  name: string | null;
  role: string;
  shortBio: string;
  strengths: string[];
  experienceYears: string | null;
  regions: string[];
  photo: string | null;
  linkedin: string | null;
};

export type EquipoContent = {
  nav: { breadcrumbHome: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  philosophy: { eyebrow: string; title: string; paragraphs: string[] };
  members: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: TeamMember[];
  };
  credentials: {
    title: string;
    subtitle: string;
    items: Array<{ value: string; unit: string; label: string }>;
  };
  approach: {
    eyebrow: string;
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  cta: {
    title: string;
    subtitle: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
};

// ─── Servicios ──────────────────────────────────────────────────────────────

export type ServicioItemSection = {
  title: string;
  items: string[];
};

export type ServicioItem = {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  includes: ServicioItemSection;
  applications: ServicioItemSection;
  benefits: ServicioItemSection;
  closing: string;
  image: string;
};

export type ServiciosContent = {
  page: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaLabel: string;
    ctaHref: string;
    detailCtaPrimary: string;
    detailCtaSecondary: string;
    detailCtaViewAll: string;
    otherServicesEyebrow: string;
    otherServicesTitle: string;
    otherServicesViewLabel: string;
    breadcrumbHome: string;
    breadcrumbServices: string;
  };
  services: ServicioItem[];
};

// ─── Sectores ────────────────────────────────────────────────────────────────

export type TurbineType = {
  name: string;
  description: string;
};

export type Sector = {
  id: string;
  tag: string;
  icon: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  turbineTypes: TurbineType[];
  applications: string[];
  image: string | null;
  accentColor: string;
};

export type SectoresContent = {
  nav: { breadcrumbHome: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  intro: { title: string; paragraphs: string[] };
  sectors: Sector[];
  crossover: {
    eyebrow: string;
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  cta: {
    title: string;
    subtitle: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  labels: {
    turbineTypesLabel: string;
    applicationsLabel: string;
  };
};

// ─── Home ────────────────────────────────────────────────────────────────────

export type HomeMetric = {
  value: string;
  unit: string;
  label: string;
};

export type HomeIconItem = {
  icon: string;
  title: string;
  description: string;
};

export type HomeServiceItem = {
  icon: string;
  slug: string;
  title: string;
  description: string;
};

export type HomeSectorItem = {
  key: string;
  tag: string;
  title: string;
  description: string;
  image: string;
};

export type HomeCta = {
  label: string;
  href: string;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: HomeCta;
    ctaSecondary: HomeCta;
    backgroundImage: string;
  };
  metrics: HomeMetric[];
  valueProps: {
    title: string;
    subtitle: string;
    items: HomeIconItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: HomeServiceItem[];
    ctaLabel: string;
    ctaHref: string;
    viewDetailLabel: string;
  };
  sectors: {
    eyebrow: string;
    title: string;
    items: HomeSectorItem[];
  };
  teamPreview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    highlight: string;
    ctaLabel: string;
    ctaHref: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    items: HomeIconItem[];
  };
  ctaBanner: {
    title: string;
    subtitle: string;
    ctaPrimary: HomeCta;
    ctaSecondary: HomeCta;
  };
};

// ─── Contacto ────────────────────────────────────────────────────────────────

export type FormFieldOption = { value: string; label: string };

export type FormField = {
  label: string;
  placeholder: string;
  required: boolean;
  options?: FormFieldOption[];
};

export type SidebarItem = {
  icon: string;
  label: string;
  value: string;
  href: string | null;
};

export type ContactoContent = {
  nav: { breadcrumbHome: string };
  hero: { eyebrow: string; title: string; subtitle: string };
  form: {
    title: string;
    subtitle: string;
    fields: {
      fullName: FormField;
      company: FormField;
      position: FormField;
      email: FormField;
      phone: FormField;
      country: FormField;
      serviceType: FormField;
      plantType: FormField;
      message: FormField;
    };
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successMessage: string;
    resetLabel: string;
    errorTitle: string;
    errorMessage: string;
    validation: { required: string; email: string; minMessage: string };
  };
  sidebar: {
    title: string;
    items: SidebarItem[];
    emergencyTitle: string;
    emergencyText: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
};
