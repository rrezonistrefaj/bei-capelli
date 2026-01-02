import BeforeAndAfter from "@/components/before-and-after"
import ResultsSection from "@/components/results-section"
import { getResultsSectionData } from "@/lib/api"
import { getBeforeAfterSectionData } from "@/lib/api"

export default async function ResultsPage() {
    const [resultsData, beforeAfterData] = await Promise.all([
        getResultsSectionData().catch(() => null),
        getBeforeAfterSectionData().catch(() => null)
    ])

    return (
        <>
            <ResultsSection data={resultsData || undefined} />
            <BeforeAndAfter data={beforeAfterData || undefined} />
        </>
    )
}