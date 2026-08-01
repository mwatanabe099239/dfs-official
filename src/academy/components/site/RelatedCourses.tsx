import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { coursePath } from "@academy/lib/academy-slug";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import {
  courseIcon,
  type AcademyCourse,
} from "@academy/lib/academy-courses";

type RelatedCoursesProps = {
  courses?: AcademyCourse[];
};

export function RelatedCourses({ courses = [] }: RelatedCoursesProps) {
  if (!courses.length) return null;

  return (
    <>
      <h2 className={cn(typography.sectionTitle, "mt-12 mb-5")}>関連コース</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {courses.map((course) => {
          const Icon: LucideIcon = courseIcon(course.iconKey);
          return (
            <a
              key={course.id}
              href={coursePath(course.title, course.id, course.slug)}
              className="flex flex-col sm:flex-row bg-card border border-border rounded-xl p-3 sm:pr-2 hover:border-primary/40 items-start sm:items-center gap-3 sm:gap-2"
            >
              <div className="text-primary shrink-0">
                <Icon className="w-12 h-12 sm:w-14 sm:h-14" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <div className={cn(typography.body, "")}>{course.title}</div>
                <p className={cn("mt-1", typography.metaSm)}>{course.description}</p>
                <span
                  className={cn(
                    "mt-3 inline-flex items-center gap-1.5 text-primary",
                    typography.meta,
                  )}
                >
                  コースを見る <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
