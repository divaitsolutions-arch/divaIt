import { EnrollmentModal } from '@/features/academy/enrollment/EnrollmentModal';
import { EnrollmentModalProvider } from '@/features/academy/enrollment/contexts/EnrollmentModalContext';
import { getDisciplines, getIndividualCourses, getPackages } from '@/shared/services/cms';
import { ProgramOption } from '@/features/academy/enrollment/types';
import { TrackLevel, Discipline } from '@/features/academy/types/models';

export default async function AcademyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [disciplines, courses, packages] = await Promise.all([
    getDisciplines(),
    getIndividualCourses(),
    getPackages()
  ]);

  const getDefaultLevel = (track: Discipline['tracks'][number]): TrackLevel | undefined => {
    return track.levels?.find((l: TrackLevel) => l.isDefault) || track.levels?.[0];
  };

  const programOptions: ProgramOption[] = [
    ...disciplines.flatMap((disc) =>
      disc.tracks.map((track) => {
        const level = getDefaultLevel(track);
        return {
          title: track.title,
          duration: level?.duration || 'TBD',
          level: level?.name || 'All Levels',
          popular: track.popular,
          price: level?.tuition?.amount || 0,
          availability: track.upcoming ? "waitlist" as const : "enrollment" as const,
          group: "career" as const,
        };
      })
    ),
    ...packages.map((pkg) => ({
      title: pkg.title,
      duration: pkg.duration,
      level: pkg.level,
      popular: pkg.popular,
      price: pkg.priceValue,
      availability: "enrollment" as const,
      group: "package" as const,
    })),
    ...courses.map((course) => ({
      title: course.title,
      duration: course.duration,
      level: course.difficulty,
      popular: course.popular,
      price: course.tuition?.amount || 0,
      availability: "enrollment" as const,
      group: "individual" as const,
    })),
  ];

  return (
    <div data-brand="academy" className="contents">
      <EnrollmentModalProvider programOptions={programOptions}>
        {children}
        <EnrollmentModal />
      </EnrollmentModalProvider>
    </div>
  );
}
