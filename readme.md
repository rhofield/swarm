**How to install**<br>
- Create virtual environment: python3 -m venv venv
- Activate virtual environment: source venv/bin/activate 
- Install dependencies: pip install -r requirements.txt
- Add openAi API key. How you do this depends on the system you are running but we want to add it as an environemnt variable
  - Windows: Search for environment variables,
    - click environemnt varaible button,
    - click new under "System variables", Name: OPENAI_API_KEY, value: get from openAi <br>
  - Mac:
    - nano ~/.zshrc ,
    - add this line: export OPENAI_API_KEY="{key from open ai}" <br>

**How to run**<br>
source venv/bin/activate <br>
python3 -m backend.manage runserver 0.0.0.0:8000 <br>

In another terminal: <br>
cd frontend <br>
python3 -m http.server 3000 <br>

In the browser go to: http://localhost:3000/ <br>


**Improvemnts**
1. Implement a db with actual storage using a db like postgres 
2. Migrate to using TS as a statically typed language has lots of benefits
3. Add test cases to improve the system prompt for the agent. Benefitial to use something like WANDB for this.
4. Add in a corpus of knowledge that can be used to improve responses
5. Create a script or alias to do all the running
6. Make API return streaming response
