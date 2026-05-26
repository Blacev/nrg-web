import Image from 'next/image';
import { Globe, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/lib/types';

type Props = { member: TeamMember };

export function TeamMemberCard({ member }: Props) {
  // photo field is null for current members — construct path from id
  const photoSrc = member.photo
    ? `/images/equipo/${member.photo}`
    : `/images/equipo/${member.id}.jpg`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* ── Photo ───────────────────────────────────────────────────────── */}
      <div className="relative aspect-square overflow-hidden bg-primary/8">
        <Image
          src={photoSrc}
          alt={`${member.role} — Equipo NRG`}
          fill
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle navy overlay on hover */}
        <div
          className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/15"
          aria-hidden="true"
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 p-6">
        {/* Identity */}
        <div>
          {member.name && (
            <p className="font-display text-base font-semibold leading-snug text-primary">
              {member.name}
            </p>
          )}
          <p
            className={cn(
              'font-display leading-snug',
              member.name
                ? 'text-sm text-muted-foreground'
                : 'text-base font-semibold text-primary',
            )}
          >
            {member.role}
          </p>
          {member.experienceYears && (
            <span className="mt-1.5 inline-flex items-center rounded-md bg-accent/15 px-2 py-0.5 font-mono text-xs font-medium text-accent">
              {member.experienceYears}
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed text-muted-foreground">{member.shortBio}</p>

        {/* Strengths */}
        {member.strengths.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {member.strengths.map((s) => (
              <Badge key={s} variant="accent">{s}</Badge>
            ))}
          </div>
        )}

        {/* Regions */}
        {member.regions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Globe className="size-3.5 shrink-0 text-muted-foreground/60" aria-hidden="true" />
            <span>{member.regions.join(' · ')}</span>
          </div>
        )}

        {/* LinkedIn */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex w-fit items-center gap-1.5 text-xs font-medium text-primary/50 transition-colors hover:text-primary"
            aria-label={`LinkedIn — ${member.name ?? member.role}`}
          >
            <ExternalLink className="size-3.5" />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
