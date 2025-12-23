import { TeamMemberData, TeamMemberItem } from '@/types/strapi'
import { fetchStrapiData, normalizeStrapiUrlWithFallback } from './strapi'

export async function getTeamMemberData(): Promise<TeamMemberData> {
  const data = await fetchStrapiData<TeamMemberData>('/team-member', {
    populate: {
      TeamMember: { populate: ['TeamMemberImage'] },
      CalendarIcon: true,
      ScheduleIcon: true,
      carouselButtons: {
        populate: ['prevActiveIcon', 'prevInactiveIcon', 'nextActiveIcon', 'nextInactiveIcon']
      },
    },
  }, 'team member')

  if (Array.isArray(data.TeamMember)) {
    data.TeamMember = data.TeamMember.map((member: TeamMemberItem) => {
      if (member.TeamMemberImage?.url) {
        member.TeamMemberImage.url = normalizeStrapiUrlWithFallback(member.TeamMemberImage.url)
      }
      return member
    })
  }

  if (data.carouselButtons) {
    const { prevActiveIcon, prevInactiveIcon, nextActiveIcon, nextInactiveIcon } = data.carouselButtons
    if (prevActiveIcon?.url) prevActiveIcon.url = normalizeStrapiUrlWithFallback(prevActiveIcon.url)
    if (prevInactiveIcon?.url) prevInactiveIcon.url = normalizeStrapiUrlWithFallback(prevInactiveIcon.url)
    if (nextActiveIcon?.url) nextActiveIcon.url = normalizeStrapiUrlWithFallback(nextActiveIcon.url)
    if (nextInactiveIcon?.url) nextInactiveIcon.url = normalizeStrapiUrlWithFallback(nextInactiveIcon.url)
  }

  return data
}

