import assert from "node:assert/strict";
import test from "node:test";
import { toolDefinitions, validateToolInput } from "./toolsController.js";

const validInputs = {
  codeAssistant: { request: "Debug", code: "const value = 1;" },
  resumeBuilder: { details: "Three years of user-provided experience." },
  studyPlanner: {
    subject: "JavaScript",
    goal: "Build a small app",
    hoursPerWeek: "7",
  },
  contentWriter: { topic: "Product update", tone: "Friendly", length: "Short" },
  translationAssistant: {
    targetLanguage: "French",
    text: "Good morning.",
  },
  projectIdeas: { skillLevel: "Beginner", technologies: "React and Node.js" },
};

test("all six tools accept their expected inputs and build a prompt", () => {
  assert.deepEqual(Object.keys(toolDefinitions), Object.keys(validInputs));
  for (const [toolId, definition] of Object.entries(toolDefinitions)) {
    const result = validateToolInput(definition, validInputs[toolId]);
    assert.deepEqual(result, { values: validInputs[toolId] });
    assert.ok(definition.buildPrompt(result.values).length > 0);
  }
});

test("tool validation rejects missing, extra, and non-string fields", () => {
  const definition = toolDefinitions.codeAssistant;
  assert.match(
    validateToolInput(definition, { request: "Explain" }).error,
    /code field/,
  );
  assert.match(
    validateToolInput(definition, {
      request: "Explain",
      code: "const x = 1;",
      unexpected: "value",
    }).error,
    /unsupported fields/,
  );
  assert.match(
    validateToolInput(definition, { request: "Explain", code: 42 }).error,
    /code field/,
  );
});

test("tool validation enforces option and study-time limits", () => {
  assert.match(
    validateToolInput(toolDefinitions.contentWriter, {
      topic: "Update",
      tone: "Unlisted",
      length: "Short",
    }).error,
    /supported tone/,
  );
  assert.match(
    validateToolInput(toolDefinitions.studyPlanner, {
      subject: "Math",
      goal: "Practice",
      hoursPerWeek: "81",
    }).error,
    /1 to 80/,
  );
});

test("tool validation enforces per-field and combined input size", () => {
  assert.match(
    validateToolInput(toolDefinitions.resumeBuilder, {
      details: "x".repeat(8001),
    }).error,
    /8,000 characters/,
  );
  assert.match(
    validateToolInput(toolDefinitions.codeAssistant, {
      request: "Debug",
      code: "x".repeat(10001),
    }).error,
    /8,000 characters/,
  );
  assert.match(
    validateToolInput(toolDefinitions.translationAssistant, {
      targetLanguage: "x".repeat(3000),
      text: "x".repeat(8000),
    }).error,
    /combined tool inputs/,
  );
});
