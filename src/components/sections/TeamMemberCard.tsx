import Image from 'next/image';
import { User, Globe, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/lib/types';

type Props = { member: TeamMember };

export function TeamMemberCard({ member }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* ── Avatar + identity ───────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        {member.photo ? (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/20">
            <Image
              src={`/images/equipo/${member.photo}`}
              alt={member.name ?? member.role}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/8">
            <User className="size-7 text-accent/70" aria-hidden="true" />
          </div>
        )}

        <div className="min-w-0 flex-1 pt-0.5">
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
      </div>

      {/* ── Bio ─────────────────────────────────────────────────────────── */}
      <p className="text-sm leading-relaxed text-muted-foreground">{member.shortBio}</p>

      {/* ── Strengths ───────────────────────────────────────────────────── */}
      {member.strengths.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {member.strengths.map((s) => (
            <Badge key={s} variant="accent">{s}</Badge>
          ))}
        </div>
      )}

      {/* ── Regions ─────────────────────────────────────────────────────── */}
      {member.regions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Globe className="size-3.5 shrink-0 text-muted-foreground/60" aria-hidden="true" />
          <span>{member.regions.join(' · ')}</span>
        </div>
      )}

      {/* ── LinkedIn ────────────────────────────────────────────────────── */}
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
  );
}
