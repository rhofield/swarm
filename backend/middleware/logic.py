from backend.agents import triage_agent
from backend.agents import client
from backend.types import ChatResponse, ChatHistory

def chat_with_swarm(chat_history: ChatHistory) -> ChatResponse:

    response = client.run(
        agent=triage_agent,
        messages=chat_history,
    )

    return {'response': response.messages[-1]["content"], 'agent': response.messages[-1]["sender"]}