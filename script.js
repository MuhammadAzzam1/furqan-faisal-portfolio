const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fiverrUrl = 'https://www.fiverr.com/muhammadazzam20';

document.querySelector('#year').textContent = new Date().getFullYear();

if (fiverrUrl) {
  const fiverr = document.querySelector('.fiverr-link');
  fiverr.href = fiverrUrl;
  fiverr.hidden = false;
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  let pointerX = innerWidth / 2;
  let pointerY = innerHeight / 2;
  let glowX = pointerX;
  let glowY = pointerY;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }, { passive: true });

  const animateGlow = () => {
    glowX += (pointerX - glowX) * 0.12;
    glowY += (pointerY - glowY) * 0.12;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();

  document.querySelectorAll('.magnetic').forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    item.addEventListener('pointerleave', () => {
      item.style.transform = '';
    });
  });

  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  let ticking = false;
  const updateParallax = () => {
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      item.style.translate = `0 ${scrollY * speed}px`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

let previousScroll = 0;
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('hidden', current > previousScroll && current > 180);
  previousScroll = current;
}, { passive: true });

const portfolioAgent = document.querySelector('.portfolio-agent');
const agentPanel = document.querySelector('#agent-panel');
const agentToggle = document.querySelector('#agent-toggle');
const agentClose = document.querySelector('#agent-close');
const agentForm = document.querySelector('#agent-form');
const agentInput = document.querySelector('#agent-input');
const agentMessages = document.querySelector('#agent-messages');
let lastAgentTopic = '';

const portfolioLinks = {
  food: { label: 'Open Food Mood', url: 'https://food-mood-frontend-theta.vercel.app/' },
  velora: { label: 'Open Velora Assist', url: 'https://velora-assist-ai-agent.vercel.app/' },
  fleet: { label: 'Open FleetFix AI', url: 'https://fleetfix-ai-rag-support.vercel.app/' },
  email: { label: 'Send an email', url: 'mailto:azzamsharif209@gmail.com' },
  fiverr: { label: 'Contact on Fiverr', url: fiverrUrl }
};

const agentKnowledge = {
  projects: {
    patterns: ['projects', 'project', 'portfolio', 'work samples', 'kya banaya', 'kia banaya', 'kaam dikhao', 'your work'],
    text: 'Furqan has built three deployed AI systems: Food Mood, an AI-assisted ordering platform; Velora Assist, a tool-grounded commerce support agent; and FleetFix AI, a RAG technical-support portal.',
    links: [portfolioLinks.food, portfolioLinks.velora, portfolioLinks.fleet]
  },
  food: {
    patterns: ['food mood', 'foodmood', 'ordering platform', 'frozen food'],
    text: 'Food Mood is a frozen-food ordering platform with an AI shopping assistant, product matching, cart and order tools, inventory controls, secure APIs, audit logs, and an owner dashboard.',
    links: [portfolioLinks.food]
  },
  velora: {
    patterns: ['velora', 'whatsapp agent', 'commerce support', 'customer support agent', 'order tracking', 'return agent'],
    text: 'Velora Assist is a WhatsApp-ready commerce workflow demo. It searches products, checks variant stock, retrieves private order status, handles return eligibility, creates tickets, and escalates complex conversations to a human.',
    links: [portfolioLinks.velora]
  },
  fleet: {
    patterns: ['fleetfix', 'fleet fix', 'manual chatbot', 'technical support', 'document assistant', 'rag project'],
    text: 'FleetFix AI is a RAG technical-support system. It retrieves relevant chunks from approved manuals, returns source-grounded guidance, and creates a technician case when reliable information is unavailable.',
    links: [portfolioLinks.fleet]
  },
  services: {
    patterns: ['services', 'service', 'offer', 'offering', 'provide', 'solutions', 'capabilities', 'what do you offer', 'what can you offer', 'what do you provide', 'what can you provide', 'what do you build', 'what can you build', 'what do you do', 'kia offer karte', 'kya offer karte', 'kia provide karte', 'kya provide karte', 'kia banate', 'kya banate', 'help my business', 'hire you', 'automation'],
    text: 'Furqan builds AI agents, RAG knowledge assistants, workflow automation, secure FastAPI backends, PostgreSQL systems, business dashboards, and integrations that use controlled tools instead of guessing.',
    links: [portfolioLinks.email, portfolioLinks.fiverr]
  },
  agents: {
    patterns: ['ai agent', 'agents', 'chatbot', 'tool calling', 'multi agent', 'multi-agent'],
    text: 'Furqan builds custom AI agents that understand user intent, retrieve verified information, call approved business tools, keep audit trails, and hand conversations to a person when confidence or permissions are insufficient.',
    links: [portfolioLinks.fiverr]
  },
  rag: {
    patterns: ['rag', 'vector database', 'vector db', 'embeddings', 'knowledge base', 'documents'],
    text: 'Furqan builds RAG assistants using document chunking, embeddings, vector retrieval, grounded responses, citations, confidence checks, and human escalation. The language model explains retrieved evidence; it is not treated as the source of truth.',
    links: [portfolioLinks.fleet]
  },
  stack: {
    patterns: ['tech stack', 'technologies', 'technology', 'skills', 'tools', 'python', 'fastapi', 'postgresql', 'langchain'],
    text: 'His core stack includes Python, FastAPI, PostgreSQL, REST APIs, RAG, embeddings, ChromaDB, LangChain-style tool workflows, LLM integrations, authentication, audit logging, responsive interfaces, GitHub, and cloud deployment.',
    links: []
  },
  deployment: {
    patterns: ['deploy', 'deployment', 'hosting', 'production', 'cloud'],
    text: 'Furqan can take a scoped AI application from backend and database design through integration, testing, Git-based delivery, and cloud deployment. Hosting and third-party service costs are agreed separately for client work.',
    links: [portfolioLinks.email]
  },
  about: {
    patterns: ['who is furqan', 'about furqan', 'about you', 'your experience', 'introduction', 'bio', 'who are you'],
    text: 'Furqan Faisal is an Applied AI and Backend Developer based in Karachi. He focuses on complete AI-driven business systems that combine agents, retrieval, secure APIs, databases, dashboards, and human oversight.',
    links: []
  },
  location: {
    patterns: ['location', 'where are you', 'based', 'karachi', 'pakistan'],
    text: 'Furqan is based in Karachi, Pakistan, and is open to remote projects and suitable learning or work opportunities.',
    links: [portfolioLinks.email]
  },
  contact: {
    patterns: ['contact', 'email', 'fiverr', 'reach', 'talk to furqan', 'message', 'available', 'availability', 'collaborate'],
    text: 'You can contact Furqan directly by email or through Fiverr. Share the business problem, required integrations, expected users, and target timeline for a focused response.',
    links: [portfolioLinks.email, portfolioLinks.fiverr]
  },
  website: {
    patterns: ['website', 'web app', 'dashboard', 'ordering system', 'business system', 'backend'],
    text: 'Furqan develops database-backed business applications, ordering systems, dashboards, and secure backend APIs, and can integrate AI agents into those systems. The focus is complete functional products rather than design-only pages.',
    links: [portfolioLinks.food, portfolioLinks.email]
  }
};

const normalizeQuestion = (value) => value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
const contactFallback = {
  text: 'I do not have verified portfolio information for that question, so I will not guess. Please contact Furqan directly for an accurate answer.',
  links: [portfolioLinks.email, portfolioLinks.fiverr]
};

function findAgentAnswer(question) {
  const normalized = normalizeQuestion(question);
  if (/^(hi|hello|hey|salam|assalam|aoa)\b/.test(normalized) && normalized.split(' ').length <= 5) {
    return { text: 'Hi! I can answer questions about Furqan’s projects, AI services, technical stack, deployment experience, and availability.', links: [] };
  }
  if (/^(tell me more|more details|aur batao|mazeed batao|explain more)$/.test(normalized) && lastAgentTopic && agentKnowledge[lastAgentTopic]) {
    return agentKnowledge[lastAgentTopic];
  }
  let bestTopic = '';
  let bestScore = 0;
  Object.entries(agentKnowledge).forEach(([topic, item]) => {
    const score = item.patterns.reduce((total, pattern) => total + (normalized.includes(pattern) ? pattern.split(' ').length : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  });
  if (!bestTopic) return contactFallback;
  lastAgentTopic = bestTopic;
  return agentKnowledge[bestTopic];
}

function addAgentMessage(role, text, links = []) {
  const message = document.createElement('div');
  message.className = `agent-message ${role === 'user' ? 'user-message' : 'assistant-message'}`;
  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = role === 'user' ? 'You' : 'Furqan AI';
  const copy = document.createElement('p');
  copy.textContent = text;
  message.append(label, copy);
  if (links.length) {
    const linkRow = document.createElement('div');
    linkRow.className = 'agent-message-links';
    links.forEach(({ label: linkLabel, url }) => {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = linkLabel;
      if (!url.startsWith('mailto:')) {
        link.target = '_blank';
        link.rel = 'noreferrer';
      }
      linkRow.appendChild(link);
    });
    message.appendChild(linkRow);
  }
  agentMessages.appendChild(message);
  agentMessages.scrollTop = agentMessages.scrollHeight;
}

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'agent-message assistant-message typing-message';
  typing.setAttribute('aria-label', 'Furqan AI is responding');
  typing.innerHTML = '<i></i><i></i><i></i>';
  agentMessages.appendChild(typing);
  agentMessages.scrollTop = agentMessages.scrollHeight;
  return typing;
}

function askPortfolioAgent(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addAgentMessage('user', cleanQuestion);
  agentInput.value = '';
  const typing = showTypingIndicator();
  const answer = findAgentAnswer(cleanQuestion);
  window.setTimeout(() => {
    typing.remove();
    addAgentMessage('assistant', answer.text, answer.links || []);
  }, reduceMotion ? 0 : 420);
}

function setAgentOpen(open) {
  portfolioAgent.classList.toggle('open', open);
  agentToggle.setAttribute('aria-expanded', String(open));
  agentPanel.setAttribute('aria-hidden', String(!open));
  if (open) window.setTimeout(() => agentInput.focus(), 120);
}

agentToggle.addEventListener('click', () => setAgentOpen(true));
agentClose.addEventListener('click', () => setAgentOpen(false));
agentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  askPortfolioAgent(agentInput.value);
});
document.querySelectorAll('[data-question]').forEach((button) => {
  button.addEventListener('click', () => askPortfolioAgent(button.dataset.question));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && portfolioAgent.classList.contains('open')) setAgentOpen(false);
});
