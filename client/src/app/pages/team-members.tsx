import TeamMembersSection from "@/components/team-members-section"
import { getTeamMemberData } from "@/lib/api"

export default async function TeamMembersPage() {
    const data = await getTeamMemberData()
    return <TeamMembersSection teamData={data} />
}