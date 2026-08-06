"""
Portfolio AI Chatbot Backend
Simple Flask application for the chatbot
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import json
import re


def load_personal_data(path="about-me.json"):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {}

PERSONAL_DATA = load_personal_data()  # read file at startup

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Enable CORS for frontend communication

# ==========================
# CHATBOT KNOWLEDGE BASE
# ==========================

# Start with static entries, then override using personal data file if available.
KNOWLEDGE_BASE = {
    "about": {
        "keywords": ["who are you", "about", "background", "introduce", "yourself", "what do you do"],
        "response": "I'm Suravi R, an Information Science and Engineering student focused on building intelligent software systems using AI, backend engineering, and modern development practices. I am a problem solver, fast learner, and adaptable."
    },
    "personal": {
        "keywords": ["personal", "unique", "uniqueness", "personality", "strengths", "special", "what are you like", "who are you"],
        "response": "Suravi is a fast learner and a thoughtful problem solver, combining AI, backend engineering, and DevOps skills with creative hobbies. She maintains a professional, confident, and authentic engineer-focused personality, always curious and practical."
    },
    "education": {
        "keywords": ["education", "school", "college", "university", "degree", "sslc", "puc", "cgpa", "subjects", "academics", "academic", "grade", "grades", "studies"],
        "priority": 3,
        "response": "I completed SSLC with 93.92%, PUC PCMC with 90.18%, and I am pursuing a Bachelor of Engineering in Information Science & Engineering at Maharaja Institute of Technology Mysore with a strong CGPA of 9.16. Key subjects include Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering, and Java Programming."
    },
    "skills": {
        "keywords": ["skills", "programming", "languages", "technologies", "tools", "know", "tech", "technical", "code", "coding", "expertise", "proficient", "master"],
        "priority": 3,
        "response": "My technical skills include Java, Python, C, SQL, JavaScript, TypeScript. I'm proficient in backend frameworks like Flask, FastAPI (learning), and Django (basics). I use MySQL, PostgreSQL, Supabase for databases, and tools like Git, GitHub, VS Code, and Docker (learning). I am strong in core CS concepts like DSA, OOP, OS, DBMS, and Computer Networks."
    },
    "projects": {
        "keywords": ["projects", "work", "built", "developed", "created", "portfolio", "made", "application", "system", "assistant", "garden", "timetable", "stepping stone", "dartx"],
        "priority": 1,
        "response": "My portfolio includes several real-world projects: Smart Automated Timetable Generator (AI/optimization), HerbAura – a 3D Virtual Ayurvedic Knowledge Platform (3D/AI), Stepping Stone Academy Website (responsive web), AI Powered Lab Programming Assistant (AI/EdTech), and DARTX - an intelligent VS Code extension for dependency management (developer tools/automation). These projects showcase my focus on AI, intelligent systems, backend engineering, and solving practical problems."
    },
    "timetable_project": {
        "keywords": ["timetable", "time table", "automated timetable", "schedule", "time evolver", "mitm-time", "evolver", "generator"],
        "priority": 5,
        "response": "The Smart Automated Timetable Generator is an intelligent scheduling system that uses a Genetic Algorithm to generate conflict-free timetables with real-world constraints, optimizing resource allocation and reducing administrative overhead. It won 2nd Prize at the Mini Project Expo."
    },
    "virtual_garden_project": {
        "keywords": ["herbaura", "herb aura", "virtual garden", "3d garden", "ayurvedic", "khashayam", "garden project"],
        "priority": 5,
        "response": "HerbAura is a 3D interactive virtual garden built using Three.js to educate users about Ayurvedic medicinal plants, featuring AI-powered herbal combination scoring and gamified learning experiences. It was built during a hackathon."
    },
    "stepping_stone_project": {
        "keywords": ["stepping stone", "academy website", "school website", "education website", "montessori", "steppingstone"],
        "priority": 5,
        "response": "The Stepping Stone Academy Website is a responsive, real-world website built and deployed for a Montessori school, focusing on clean UI, mobile-first design, and clear visual storytelling to enhance parental trust."
    },
    "lab_assistant_project": {
        "keywords": ["lab assistant", "programming assistant", "lab programming", "ai powered lab", "education assistant", "viva"],
        "priority": 5,
        "response": "The AI Powered Lab Programming Assistant helps students learn programming concepts, debug code, and prepare for viva questions with guided explanations, focusing on understanding rather than copying."
    },
    "dependency_manager": { # Changed key from Dependify to DARTX
        "keywords": ["dependency manager", "vs code extension", "environment provisioning", "smart dependency", "dependency", "dartx"], 
        "priority": 5,
        "response": "DARTX – Smart Dependency Manager is an intelligent VS Code extension that automatically detects dependency and environment issues in Python and Node.js projects, analyzes root causes, validates packages, and assists developers with secure, one-click dependency resolution, enhancing developer productivity. It is published on the VS Code Marketplace."
    },
    "journey": {
        "keywords": ["journey", "growth", "timeline", "story", "path", "progression", "evolution", "started", "began", "semester", "stage"],
        "response": "My journey began with C++ in 11th grade, progressing through web development, strong programming foundations, deep CS concepts, real-world deployments, and award-winning innovation in AI and intelligent systems. I am continuously focused on growth in AI-powered applications and scalable software."
    },
    "hackathons": {
        "keywords": ["hackathon", "hackathons", "competition", "contest", "participate", "join", "event", "agroforecast", "virtual garden", "vec", "mitm", "vvce", "build for mysuru", "onemysuru"],
        "response": "I have participated in hackathons like MIT Mysore (AgroForeCast, Build for Mysuru) and VEC (Virtual Garden). These events taught me rapid prototyping, teamwork, full-stack development, business strategy, and how to deliver engaging products under pressure."
    },
    "industry": {
        "keywords": ["industry", "industrial", "visit", "visits", "fanuc", "sap", "real world", "factory", "company", "exposure"],
        "response": "I have gained industry exposure through visits to FANUC India and SAP Labs, where I learned about robotics automation, enterprise software, cloud platforms, and production-grade engineering practices."
    },
    "career_goals": {
        "keywords": ["career", "goals", "future", "vision", "aspiration", "plan", "ambition", "dream", "work for", "work at", "company", "companies", "google", "microsoft", "sap", "atlassian"],
        "response": "I aim to build impactful software solutions and work at top technology companies like Google, Microsoft, Atlassian, and SAP. I am focused on improving my development, problem-solving, and engineering skills through continuous learning and hands-on projects."
    },
    "career_interests": {
        "keywords": ["roles", "positions", "career", "interests", "target", "want to do", "aspire", "sde", "ai engineer", "devops", "cloud"],
        "response": "I am interested in roles such as AI Engineer, Generative AI Engineer, Backend Engineer, DevOps Engineer, Scalable Software Engineer, and Software Development Engineer. I enjoy building intelligent software systems and solving real-world problems."
    },
    "goals": {
        "keywords": ["goals", "short term", "long term", "plans", "future", "aim", "objective"],
        "response": "My short-term goal is to secure internships and entry-level roles where I can apply my skills in AI, backend engineering, and scalable software development to real-world projects. My long-term goal is to become a Software Engineer specializing in AI-powered applications and intelligent systems, building scalable and impactful systems that solve meaningful real-world problems."
    },
    "certifications": {
        "keywords": ["certificate", "certifications", "nptel", "prompt", "engineering", "front-end", "linkedin", "skyscanner", "forage"],
        "response": "I have certifications such as Programming in Java from NPTEL (98%, Top 1% Nationwide, Gold Medal), Front-End Software Engineering Job Simulation from Skyscanner (Forage), and Prompt Engineering Certification from LinkedIn. These demonstrate my commitment to both core programming and modern AI/web skills."
    },
    "achievements": {
        "keywords": ["achievement", "achievements", "award", "recognition", "hackathon", "national", "prize", "winning", "winner", "top 1%"],
        "response": "My achievements include Top 1% Nationwide in NPTEL Programming in Java, 2nd Prize in the College Project Expo for the Smart Automated Timetable Generator, and the Best Project Award for a Waste Segregation System with voice assistance. These highlight my academic excellence and practical innovation."
    },
    "contact": {
        "keywords": ["contact", "reach", "email", "social", "connect", "linkedin", "github", "message", "hire"],
        "priority": 4,
        "response": "You can reach me via email at suravimys@gmail.com, or through LinkedIn and GitHub. I'm open to collaboration, internships, and new opportunities."
    },
    "resume": {
        "keywords": ["resume", "cv", "download", "pdf", "document", "profile"],
        "response": "You can download my resume from the portfolio site. It includes my academic record, projects, certifications, and experience. If you need it by email, please use the contact form or reach out at suravimys@gmail.com."
    },
    "hobbies": {
        "keywords": ["hobby", "hobbies", "fun", "spare time", "what do you like", "passion"],
        "response": "Outside of coding, I enjoy singing, drawing occasionally, and travelling to new places. These hobbies keep me creative, curious, and energized while working on technical projects."
    },
    "interests": {
        "keywords": ["interests", "interest", "travel", "travelling", "traveling", "singing", "drawing", "creative"],
        "response": "My interests are singing, drawing occasionally, and travelling. Creative expression and exploring new places help me stay inspired and bring fresh ideas into my technical work."
    },
    "strengths": {
        "keywords": ["strengths", "special", "unique", "stand out", "different", "best", "good at", "strong", "advantage", "why hire", "why choose"],
        "response": "My strengths are fast learning, strong fundamentals, adaptability, practical problem solving, and an ability to turn ideas into working software. I pair academic achievement with real project delivery and continuous self-improvement."
    }
}
# If personal data file was loaded, you could override responses here.
if PERSONAL_DATA:
    # example: update about response dynamically
    bio = PERSONAL_DATA.get('basic_info', {})
    if bio:
        KNOWLEDGE_BASE['about']['response'] = (
            f"I'm {bio.get('name')}, an {bio.get('role','')} "
            f"{bio.get('description','')}"
        )
    # additional overrides can be added similarly using other keys in PERSONAL_DATA
    edu = PERSONAL_DATA.get('education', {})
    if edu:
        parts = []
        eng = edu.get('engineering')
        if eng:
            cgpa = eng.get('cgpa', 'a strong CGPA')
            parts.append(f"Suravi is pursuing a {eng.get('degree')} in {eng.get('branch')} at {eng.get('college')} with a CGPA of {cgpa}.")
            if eng.get('key_subjects'):
                parts.append(f"Key subjects include {', '.join(eng.get('key_subjects'))}.")
        if 'sslc' in edu:
            parts.append(f"She scored {edu['sslc'].get('percentage','')} in SSLC.")
        if 'puc' in edu:
            parts.append(f"She scored {edu['puc'].get('percentage','')} in PUC ({edu['puc'].get('stream','')}).")
        KNOWLEDGE_BASE['education']['response'] = ' '.join(parts)
    skills = PERSONAL_DATA.get('skills', {})
    if skills:
        lang = ', '.join(skills.get('programming_languages', []))
        web = ', '.join(skills.get('web_technologies', []))
        frameworks = ', '.join(skills.get('frameworks', []))
        dbs = ', '.join(skills.get('databases', []))
        tools = ', '.join(skills.get('tools', []))
        core = ', '.join(skills.get('core', []))
        KNOWLEDGE_BASE['skills']['response'] = f"Programming: {lang}. Web: {web}. Frameworks: {frameworks}. Databases: {dbs}. Tools: {tools}. Core concepts: {core}."
    projs = PERSONAL_DATA.get('projects', [])
    if projs:
        proj_lines = []
        for p in projs:
            proj_lines.append(f"{p.get('name')} - {p.get('description','')} ({', '.join(p.get('tech_stack', []))})")
        KNOWLEDGE_BASE['projects']['response'] = '\n'.join(proj_lines)
    certs = PERSONAL_DATA.get('certifications', [])
    if certs:
        KNOWLEDGE_BASE['certifications']['response'] = "I have certifications such as " + ', '.join(certs) + "."
    ach = PERSONAL_DATA.get('achievements', [])
    if ach:
        KNOWLEDGE_BASE['achievements']['response'] = "My achievements include " + ', '.join(ach) + "."
    goals = PERSONAL_DATA.get('goals', {})
    if goals:
        short_term = goals.get('short_term')
        long_term = goals.get('long_term')
        parts = []
        if short_term:
            parts.append(short_term)
        if long_term:
            parts.append(long_term)
        KNOWLEDGE_BASE['goals']['response'] = ' '.join(parts)
    career_interests = PERSONAL_DATA.get('career_interests', [])
    if career_interests:
        KNOWLEDGE_BASE['career_interests']['response'] = "I am interested in roles such as " + ', '.join(career_interests) + "."
    hobbies = PERSONAL_DATA.get('hobbies', [])
    if hobbies:
        KNOWLEDGE_BASE['hobbies']['response'] = "I enjoy " + ', '.join(hobbies[:-1]) + ", and " + hobbies[-1] + "."
        KNOWLEDGE_BASE['interests']['response'] = KNOWLEDGE_BASE['hobbies']['response']
    contact = PERSONAL_DATA.get('contact', {})
    if contact:
        email = contact.get('email')
        linkedin = contact.get('linkedin')
        github = contact.get('github', 'https://github.com/SuraviR10')
        contact_parts = []
        if email:
            contact_parts.append(f"Email: {email}")
        if linkedin:
            contact_parts.append(f"LinkedIn: {linkedin}")
        if github:
            contact_parts.append(f"GitHub: {github}")
        KNOWLEDGE_BASE['contact']['response'] = "You can reach me via " + '; '.join(contact_parts) + "."
    pers = PERSONAL_DATA.get('personality', {}).get('tone')
    if pers:
        KNOWLEDGE_BASE['personal']['response'] = f"Suravi's personality is {pers}. She is professional, confident, authentic, and engineer-focused, with clear explanations without exaggeration."
    # dynamically update other knowledge items from JSON if available


GREETING_RESPONSES = [
    "Hi! I'm Suravi's AI assistant. How can I help you today?",
    "Hello! Ask me anything about Suravi's skills, projects, or experience!",
    "Hey there! What would you like to know?",
    "Welcome! I'm here to tell you about Suravi. What interests you?"
]

DEFAULT_RESPONSES = [
    "I'm sorry, I don't have information beyond what's on my portfolio. Try asking about my education, projects, skills, certifications, or achievements!",
    "That question is outside my current knowledge base. I can help with skills, projects, education, certifications, or how to contact me.",
    "Great question! You might ask about my skills, projects, or other portfolio details.",
    "I'm here to help with anything related to Suravi's academic and project experience."
]

# ==========================
# FLASK ROUTES
# ==========================

@app.route('/', methods=['GET'])
def home():
    """Serve the portfolio index.html"""
    return app.send_static_file('index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    """Serve static files safely"""
    allowed_extensions = {'.html', '.css', '.js', '.json', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.pdf', '.md', '.mp4'}
    import os
    _, ext = os.path.splitext(path)
    if ext.lower() in allowed_extensions and os.path.isfile(os.path.join('.', path)):
        return app.send_static_file(path)
    return app.send_static_file('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint - receives user message and returns bot response"""
    try:
        data = request.json or {}
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                "error": "Empty message",
                "response": "Please send a message!"
            }), 400
        
        # Generate response
        bot_response = generate_response(user_message)
        
        return jsonify({
            "user_message": user_message,
            "bot_response": bot_response,
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "response": "Sorry, I encountered an error processing your message."
        }), 500

@app.route('/api/knowledge', methods=['GET'])
def get_knowledge():
    """Returns the chatbot's knowledge categories"""
    categories = list(KNOWLEDGE_BASE.keys())
    return jsonify({
        "categories": categories,
        "count": len(categories)
    }), 200

@app.route('/api/status', methods=['GET'])
def get_status():
    """Returns chatbot status and information"""
    return jsonify({
        "name": "Suravi's Portfolio Chatbot",
        "status": "active",
        "capabilities": list(KNOWLEDGE_BASE.keys()),
        "version": "1.0",
        "timestamp": datetime.now().isoformat()
    }), 200

# ==========================
# CHATBOT LOGIC
# ==========================

def calculate_keyword_score(message_lower, keyword):
    """Return a score for how well a keyword matches the user message."""
    if re.search(r"\b" + re.escape(keyword) + r"\b", message_lower):
        return len(keyword) * 3
    if keyword in message_lower:
        return len(keyword) * 2
    return 0


def generate_response(user_message):
    """
    Generate chatbot response based on user message
    Uses keyword matching and knowledge base
    """
    message_lower = user_message.lower()
    
    # Check for greeting
    if is_greeting(message_lower):
        import random
        return random.choice(GREETING_RESPONSES)
    
    # Check for matches in knowledge base using weighted scoring and priorities
    best_match = None
    highest_score = 0
    best_priority = 0
    best_keyword_length = 0
    for category, data in KNOWLEDGE_BASE.items():
        if "keywords" not in data:
            continue
        score = 0
        max_keyword_len = 0
        for keyword in data["keywords"]:
            keyword_score = calculate_keyword_score(message_lower, keyword)
            score += keyword_score
            if keyword_score > 0:
                max_keyword_len = max(max_keyword_len, len(keyword))
        if score == 0:
            continue
        priority = data.get("priority", 0)
        if (
            score > highest_score or
            (score == highest_score and priority > best_priority) or
            (score == highest_score and priority == best_priority and max_keyword_len > best_keyword_length)
        ):
            highest_score = score
            best_match = data
            best_priority = priority
            best_keyword_length = max_keyword_len
    if best_match and highest_score > 0:
        return best_match["response"]
    
    # Check for common responses
    if any(word in message_lower for word in ["thanks", "thank", "thankyou"]):
        return "You're welcome! Feel free to ask me anything else about Suravi!"
    
    if any(word in message_lower for word in ["help", "what can you"]):
        return f"I can answer questions about: {', '.join(KNOWLEDGE_BASE.keys())}. Try asking me about any of these topics!"

    # Default response
    import random
    return random.choice(DEFAULT_RESPONSES)


def is_greeting(message):
    """Check if message is a greeting"""
    greetings = ["hello", "hi", "hey", "greetings", "whats up"]
    return any(greeting in message for greeting in greetings)

# ==========================
# ERROR HANDLERS
# ==========================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found",
        "message": "The requested endpoint does not exist."
    }), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({
        "error": "Server error",
        "message": "An error occurred on the server."
    }), 500

# ==========================
# MAIN
# ==========================

if __name__ == '__main__':
    # Get port from environment variable or use 5000
    port = int(os.getenv('PORT', 5000))
    
    # Run Flask app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.getenv('DEBUG', 'False') == 'True'
    )
