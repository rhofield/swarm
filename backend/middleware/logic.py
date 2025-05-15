from backend.core_logic.agents import triage_agent
from backend.core_logic.agents import client
from backend.core_logic.types import ChatResponse, ChatHistory

def chat_with_swarm(chat_history: ChatHistory) -> ChatResponse:

    # Here is where we would add any additioanl logic
    # Exampels would be storing the chat history, and / or running through a RAG pipeline

    response = client.run(
        agent=triage_agent,
        messages=chat_history,
    )

    return {'response': response.messages[-1]["content"], 'agent': response.messages[-1]["sender"]}