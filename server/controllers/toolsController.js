import { generateAIResponse } from "../services/geminiService.js";

export const toolDefinitions = {
  codeAssistant: {
    required: ["request", "code"],
    buildPrompt: ({ request, code }) =>
      `Help with the following code task: ${request}\n\nDo not execute the code. Explain your reasoning and include safe, relevant tests when useful.\n\nCode:\n\`\`\`\n${code}\n\`\`\``,
  },
  resumeBuilder: {
    required: ["details"],
    buildPrompt: ({ details }) =>
      `Draft or improve resume content using only the facts in the user's notes. Never invent qualifications, employers, dates, skills, or accomplishments. If important information is missing, ask concise follow-up questions instead of filling gaps.\n\nUser-provided notes:\n${details}`,
  },
  studyPlanner: {
    required: ["subject", "goal", "hoursPerWeek"],
    buildPrompt: ({ subject, goal, hoursPerWeek }) =>
      `Create a practical 7-day study plan for ${subject}. The learner's goal is ${goal}, and they have ${hoursPerWeek} hours per week. Divide the available time realistically, include daily tasks and revision, and state any assumptions.`,
  },
  contentWriter: {
    required: ["topic", "tone", "length"],
    buildPrompt: ({ topic, tone, length }) =>
      `Write ${length.toLowerCase()} content about the following topic. Use a ${tone.toLowerCase()} tone. Do not add unsupported factual claims.\n\nTopic:\n${topic}`,
  },
  translationAssistant: {
    required: ["targetLanguage", "text"],
    buildPrompt: ({ targetLanguage, text }) =>
      `Translate the text into ${targetLanguage}. Preserve its meaning, tone, structure, and formatting where practical. If a phrase is ambiguous, briefly note that after the translation.\n\nText:\n${text}`,
  },
  projectIdeas: {
    required: ["skillLevel", "technologies"],
    buildPrompt: ({ skillLevel, technologies }) =>
      `Suggest three practical software project ideas for a ${skillLevel.toLowerCase()} learner using these technologies: ${technologies}. For each idea, include a short description, key features, a simple architecture outline, and implementation milestones.`,
  },
};

const allowedValues = {
  request: ["Explain", "Debug", "Generate"],
  tone: ["Professional", "Friendly", "Persuasive", "Playful"],
  length: ["Short", "Medium", "Long"],
  skillLevel: ["Beginner", "Intermediate", "Advanced"],
};

export function validateToolInput(definition, input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Provide tool inputs as an object." };

  const acceptedFields = new Set(definition.required);
  if (Object.keys(input).some((key) => !acceptedFields.has(key)))
    return { error: "The request contains unsupported fields." };

  const values = {};
  for (const field of definition.required) {
    const value = input[field];
    if (typeof value !== "string" || !value.trim())
      return { error: `Please complete the ${field} field.` };
    const normalized = value.trim();
    if (normalized.length > 8000)
      return { error: "Each field must be 8,000 characters or fewer." };
    if (allowedValues[field] && !allowedValues[field].includes(normalized))
      return { error: `Choose a supported ${field} option.` };
    values[field] = normalized;
  }

  if (Object.values(values).join("").length > 10000)
    return { error: "The combined tool inputs must be 10,000 characters or fewer." };

  if (values.hoursPerWeek) {
    const hours = Number(values.hoursPerWeek);
    if (!Number.isInteger(hours) || hours < 1 || hours > 80)
      return { error: "Weekly study time must be a whole number from 1 to 80." };
  }

  return { values };
}

export async function generateToolResult(req, res) {
  const definition = toolDefinitions[req.params.toolId];
  if (!definition)
    return res.status(404).json({ success: false, message: "Unknown AI tool." });

  const { values, error } = validateToolInput(definition, req.body?.input);
  if (error) return res.status(400).json({ success: false, message: error });

  try {
    const result = await generateAIResponse(definition.buildPrompt(values));
    return res.json({ success: true, result });
  } catch (generationError) {
    console.error("AI tool generation failed.");
    const message = generationError.message?.includes("GEMINI_API_KEY")
      ? "Add your Gemini API key to server/.env and restart the server."
      : "Could not generate a result. Check the server and AI API configuration.";
    return res.status(500).json({ success: false, message });
  }
}
