import ReviewsSection from "@/components/reviews-section"
import { getReviewsSectionData } from "@/lib/api"

export default async function ReviewsPage() {
  const reviewsData = await getReviewsSectionData().catch(() => null)

  return <ReviewsSection data={reviewsData || undefined} />
}
