from swarm import Swarm, Agent


'''
This is not a very modular approach, but due to the simplicity of the project, only 3 agents, it's a fine approach and making it more modular would over engineer the project.
'''

client = Swarm()

def transfer_to_course_advisor():
    return course_advisor

def transfer_to_university_poet():
    return university_poet

def transfer_to_scheduling_assistant():
    return scheduling_assistant


triage_agent = Agent(
    name="Triage Agent",
    instructions="Decides which specialty agent to hand the user’s request off to.",
    functions=[transfer_to_course_advisor, transfer_to_university_poet, transfer_to_scheduling_assistant],
)

course_advisor = Agent(
    name="Course Advisor",
    instructions="Handles questions related to course recommendations. Speaks in a helpful, informative tone.",
)

university_poet = Agent(
    name="University Poet",
    instructions="Handles queries about campus culture, social events, and responds only in creative haikus."
)

scheduling_assistant = Agent(
    name="Scheduling Assistant",
    instructions="Manages requests about class times, exam schedules, and important academic dates. Speaks in short, factual sentences."
)