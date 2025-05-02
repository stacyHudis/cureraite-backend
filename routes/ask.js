const express = require('express');
const router = express.Router();
const { detectIllness } = require('../illness/detectIllness');
const { buildPrompts } = require('../prompts/buildPrompts');
const products = require('../data/products.json');

router.post('/', async (req, res) => {
  const { question } = req.body;

  const illness = await detectIllness(question);
  const relevantProducts = products.filter(p => p.illness === illness);

  const { doctorPrompt, naturopathPrompt, tonyPrompt } = buildPrompts(question, illness, relevantProducts);

  res.json({
    illness,
    products: relevantProducts,
    personas: {
      doctor: doctorPrompt,
      naturopath: naturopathPrompt,
      tony: tonyPrompt
    },
    debate: [
      "Dr. Gray: This is evidence-based. Try digestive enzymes.",
      "Sage Willow: Herbs heal the root, not just the symptom.",
      "TonyBot: Eat better, walk after meals, and take control."
    ]
  });
});

module.exports = router;