import TeamMembersSection from "@/components/team-members-section"
import { getTeamMemberData } from "@/lib/api"
import { TeamMemberData } from "@/types/strapi"

const fallbackTeamData: TeamMemberData = {
  id: 0,
  documentId: '',
  Title: '',
  Description: '',
  TeamMember: [],
  CalendarIcon: null,
  ScheduleIcon: null,
  carouselButtons: null
}

export default async function TeamMembersPage() {
  try {
    const data = await getTeamMemberData()
    return <TeamMembersSection teamData={data} />
  } catch (error) {
    console.error('Error fetching team member data:', error)
    return <TeamMembersSection teamData={fallbackTeamData} />
  }
}