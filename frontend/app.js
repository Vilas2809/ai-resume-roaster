const API_BASE_URL = window.API_BASE_URL || "http://127.0.0.1:8000";

const fileInput = document.getElementById("resume-upload");
const jobDescriptionInput = document.getElementById("job-description");
const analyzeBtn = document.getElementById("analyze-btn");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const loadingBox = document.getElementById("loading-box");
const loadingText = document.getElementById("loading-text");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");

let analysis = "";
let loadingInterval = null;

const loadingMessages = [
  "Reading your resume...",
  "Matching skills with the job...",
  "Generating roast...",
  "Building feedback cards...",
];

function getSection(text, title) {
  if (!text) return "";
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escapedTitle}:([\\s\\S]*?)(?=\\n[A-Za-z ]+:|$)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function toList(text) {
  return text
    .split("\n")
    .map((item) => item.replace(/^-/, "").trim())
    .filter(Boolean);
}

function setHidden(el, hidden) {
  el.classList.toggle("hidden", hidden);
}

function fillList(ulEl, items) {
  ulEl.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ulEl.appendChild(li);
  });
}

function fillTags(containerEl, items, tagClass) {
  containerEl.innerHTML = "";
  items.forEach((item) => {
    const span = document.createElement("span");
    span.className = `tag ${tagClass}`;
    span.textContent = item;
    containerEl.appendChild(span);
  });
}

function renderAnalysis(text) {
  analysis = text;

  const resumeScoreText = getSection(text, "Resume Score") || "0";
  const jobMatchScoreText = getSection(text, "Job Match Score") || "0";
  const matchSummary = getSection(text, "Match Summary") || "";
  const matchedSkills = getSection(text, "Matched Skills") || "";
  const missingSkills = getSection(text, "Missing Skills") || "";
  const roast = getSection(text, "Roast") || "";
  const keyImprovements = getSection(text, "Key Improvements") || "";
  const weakAreas = getSection(text, "Weak Areas") || "";
  const strengths = getSection(text, "Top Strengths") || "";

  const resumeScore = Math.min(Math.max(parseInt(resumeScoreText, 10) || 0, 0), 100);
  const parsedJobScore = parseInt(jobMatchScoreText, 10);
  const hasJobScore = !isNaN(parsedJobScore);
  const jobMatchScore = hasJobScore ? Math.min(Math.max(parsedJobScore, 0), 100) : 0;

  document.getElementById("resume-score").textContent = resumeScore;
  document.getElementById("resume-score-fill").style.width = `${resumeScore}%`;

  document.getElementById("job-match-score").textContent = hasJobScore ? jobMatchScore : "N/A";
  document.getElementById("job-match-score-fill").style.width = `${hasJobScore ? jobMatchScore : 0}%`;

  setHidden(document.getElementById("summary-card"), !matchSummary);
  document.getElementById("match-summary").textContent = matchSummary;

  setHidden(document.getElementById("matched-card"), !matchedSkills);
  fillTags(document.getElementById("matched-skills"), toList(matchedSkills), "matched-tag");

  setHidden(document.getElementById("missing-card"), !missingSkills);
  fillTags(document.getElementById("missing-skills"), toList(missingSkills), "missing-tag");

  setHidden(document.getElementById("roast-card"), !roast);
  document.getElementById("roast").textContent = roast;

  setHidden(document.getElementById("improvements-card"), !keyImprovements);
  fillList(document.getElementById("key-improvements"), toList(keyImprovements));

  setHidden(document.getElementById("weak-card"), !weakAreas);
  fillList(document.getElementById("weak-areas"), toList(weakAreas));

  setHidden(document.getElementById("strengths-card"), !strengths);
  fillList(document.getElementById("top-strengths"), toList(strengths));

  setHidden(resultEl, false);
  setHidden(copyBtn, false);
  setHidden(clearBtn, false);
}

function showError(message) {
  errorEl.textContent = message;
  setHidden(errorEl, false);
}

function setLoading(isLoading) {
  if (isLoading) {
    let messageIndex = 0;
    loadingText.textContent = loadingMessages[0];
    loadingInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      loadingText.textContent = loadingMessages[messageIndex];
    }, 1500);
    setHidden(loadingBox, false);
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";
  } else {
    clearInterval(loadingInterval);
    setHidden(loadingBox, true);
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = "Upload & Analyze";
  }
}

fileInput.addEventListener("change", () => {
  setHidden(resultEl, true);
  setHidden(errorEl, true);
  setHidden(copyBtn, true);
  setHidden(clearBtn, true);
  analysis = "";
});

analyzeBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    showError("Please select a PDF resume first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_description", jobDescriptionInput.value);

  setHidden(errorEl, true);
  setHidden(resultEl, true);
  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || "Something went wrong.");
    }

    renderAnalysis(data.analysis);
  } catch (err) {
    console.error("Upload error:", err);
    showError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(analysis);
    alert("Analysis copied to clipboard");
  } catch {
    alert("Could not copy analysis");
  }
});

clearBtn.addEventListener("click", () => {
  fileInput.value = "";
  jobDescriptionInput.value = "";
  analysis = "";
  setHidden(resultEl, true);
  setHidden(errorEl, true);
  setHidden(copyBtn, true);
  setHidden(clearBtn, true);
});
