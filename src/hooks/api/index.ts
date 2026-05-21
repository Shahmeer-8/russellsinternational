import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/apiClient';
import type {
  ApiResponse,
  PaginatedResponse,
  HeroSlide,
  TickerItem,
  Stat,
  Service,
  WhyChooseUsItem,
  Course,
  StudyDestination,
  LanguageProgram,
  Job,
  Internship,
  Event,
  GalleryPhoto,
  Testimonial,
  Settings,
  NavigationPayload,
  PageSections,
  TeamMember,
  ContactPayload,
  CareerApplicationPayload,
} from '@/types/api';

// ─── Home ──────────────────────────────────────────────────────────────────────

export function useHeroSlides() {
  return useQuery({
    queryKey: ['hero-slides'],
    queryFn: () => api.get<ApiResponse<HeroSlide[]>>('/hero-slides'),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTickerItems() {
  return useQuery({
    queryKey: ['ticker-items'],
    queryFn: () => api.get<ApiResponse<TickerItem[]>>('/ticker-items'),
    staleTime: 10 * 60 * 1000,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => api.get<ApiResponse<Stat[]>>('/stats'),
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Services & Why Choose Us ──────────────────────────────────────────────────

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => api.get<ApiResponse<Service[]>>('/services'),
    staleTime: 10 * 60 * 1000,
  });
}

export function useWhyChooseUs() {
  return useQuery({
    queryKey: ['why-choose-us'],
    queryFn: () => api.get<ApiResponse<WhyChooseUsItem[]>>('/why-choose-us'),
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Courses ───────────────────────────────────────────────────────────────────

export function useCourses(type?: 'paid' | 'navttc') {
  return useQuery({
    queryKey: ['courses', type],
    queryFn: () => api.get<ApiResponse<Course[]>>(`/courses${type ? `?type=${type}` : ''}`),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Study Abroad ──────────────────────────────────────────────────────────────

export function useStudyDestinations() {
  return useQuery({
    queryKey: ['study-destinations'],
    queryFn: () => api.get<ApiResponse<StudyDestination[]>>('/study-destinations'),
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Languages ─────────────────────────────────────────────────────────────────

export function useLanguagePrograms() {
  return useQuery({
    queryKey: ['language-programs'],
    queryFn: () => api.get<ApiResponse<LanguageProgram[]>>('/language-programs'),
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Careers ───────────────────────────────────────────────────────────────────

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => api.get<PaginatedResponse<Job>>('/jobs'),
    staleTime: 5 * 60 * 1000,
  });
}

export function useInternships() {
  return useQuery({
    queryKey: ['internships'],
    queryFn: () => api.get<PaginatedResponse<Internship>>('/internships'),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Events ────────────────────────────────────────────────────────────────────

export function useEvents(type?: 'event' | 'news') {
  return useQuery({
    queryKey: ['events', type],
    queryFn: () => api.get<PaginatedResponse<Event>>(`/events${type ? `?type=${type}` : ''}`),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Gallery ───────────────────────────────────────────────────────────────────

export function useGallery(category?: string) {
  return useQuery({
    queryKey: ['gallery', category],
    queryFn: () => api.get<ApiResponse<GalleryPhoto[]>>(`/gallery${category ? `?category=${category}` : ''}`),
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

export function useTestimonials(type?: 'written' | 'video') {
  return useQuery({
    queryKey: ['testimonials', type],
    queryFn: () => api.get<ApiResponse<Testimonial[]>>(`/testimonials${type ? `?type=${type}` : ''}`),
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Settings ──────────────────────────────────────────────────────────────────

export function useSettings(group?: string) {
  return useQuery({
    queryKey: ['settings', group],
    queryFn: () => api.get<ApiResponse<Settings>>(`/settings${group ? `?group=${group}` : ''}`),
    staleTime: 15 * 60 * 1000,
  });
}

export function useNavigation() {
  return useQuery({
    queryKey: ['navigation'],
    queryFn: () => api.get<ApiResponse<NavigationPayload>>('/navigation'),
    staleTime: 10 * 60 * 1000,
  });
}

export function usePageSections(page: string) {
  return useQuery({
    queryKey: ['page-sections', page],
    queryFn: () => api.get<ApiResponse<PageSections>>(`/pages/${page}/sections`),
    staleTime: 10 * 60 * 1000,
  });
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: () => api.get<ApiResponse<TeamMember[]>>('/team'),
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Contact form ──────────────────────────────────────────────────────────────

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload: ContactPayload) =>
      api.post<ApiResponse<null>>('/contact', payload),
  });
}

// ─── Career application ────────────────────────────────────────────────────────

export function useSubmitCareerApplication() {
  return useMutation({
    mutationFn: ({ cv, ...rest }: CareerApplicationPayload) => {
      if (cv) {
        const form = new FormData();
        Object.entries(rest).forEach(([k, v]) => v != null && form.append(k, String(v)));
        form.append('cv', cv);
        return api.postForm<ApiResponse<null>>('/careers/apply', form);
      }
      return api.post<ApiResponse<null>>('/careers/apply', rest);
    },
  });
}
