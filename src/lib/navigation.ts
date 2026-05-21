import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/routing';
import type { ComponentProps } from 'react';

const navigation = createNavigation(routing);

export const { Link, redirect, usePathname, useRouter, getPathname } = navigation;

// Cast a runtime string href (e.g. from JSON content) to the typed href union.
// Use this when the href is known-valid but TypeScript can't verify it statically.
type ValidHref = ComponentProps<typeof navigation.Link>['href'];
export const asHref = (path: string): ValidHref => path as ValidHref;
