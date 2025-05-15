**How to install**
pip install -r requirements.txt

**How to run**
source swarm/bin/activate
python3 -m backend.manage runserver 0.0.0.0:8000

In another terminal 
cd frontend
python3 -m http.server 3000


**Improvemnts**
1. Implement a db with actual storage using a db like postgres 
2. Migrate to using TS as a statically typed language has lots of benefits
3. Add test cases to improve the system prompt for the agent. Benefitial to use something like WANDB for this.
4. Add in a corpus of knowledge that can be used to improve responses