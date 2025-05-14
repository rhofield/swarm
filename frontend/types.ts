export type roles = 'user' | 'agent'
export type agentNames = 'triage_agent' | 'course_advisor' | 'university_poet' | 'scheduling_assistant'

// Have role and agentName as this will allow for easier filter in the in the future as we are often looking for messages from the agent for things like analytics
// This would be hard if the we had to do some query like WHERE name IN (....), as it would be easy to miss an agent and we would need to keep a recoord of all agents, some which we may have removed
export type ChatHistory = {
    role: roles;
    content: string;
    agentName?: agentNames;
}
