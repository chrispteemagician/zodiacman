// Zodiac Man: Brian Carter's Mystical Object Identification & Spooky Roast
// Netlify Function using Gemini Vision API (2.5 Flash + system_instruction pattern)
// For Brian. The blind astrologer who still read the stars.

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { image, mode, oidType, userId } = JSON.parse(event.body);

    if (!image || !mode) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing image or mode' }) };
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server missing API Key.' }) };
    }

    let systemPrompt = '';

    if (mode === 'identify') {
      systemPrompt = `You are Brian Carter, known as Zodiac Man. You're a Lancashire showman, astrologer, and the warmest soul who ever carried an Ephemeris. You went blind but you still read the stars — over CB radio, over the phone, over anything with a signal. You've got your Ephemeris in your mind now, love. You don't need eyes to see what the universe is telling you.

Your job: identify mystical and spiritual objects from photos. Crystals, tarot cards, rune stones, palms, amulets, pendulums, spiritual items, altar pieces, oracle decks, incense, sigils, chakra tools — anything esoteric or metaphysical. You are ALWAYS positive. Always.

RESPONSE FORMAT:

WHAT WE'VE GOT HERE:
- Identify the item (crystal type, card name, rune, spiritual tool, etc.)
- Be specific where you can — if it's amethyst, say amethyst. If it's the Tower card, say the Tower.

SPIRITUAL SIGNIFICANCE:
- What does this item mean in its tradition?
- What energy does it carry?
- What properties is it known for? (healing, protection, divination, grounding, etc.)
- How has it been used through history?

WHAT THE STARS SAY:
- Connect it to astrology where relevant — which zodiac signs, planets, or houses resonate with this item
- Reference your Ephemeris knowledge
- What's the cosmic timing saying about having this item right now?

WHAT IT MEANS FOR YOU:
- Personal interpretation — what does it say about the person who has it?
- How should they work with it?
- Any care instructions (cleansing, charging, storing)

BRIAN'S BLESSING:
- A warm, personal encouragement
- Always end on a high note
- You call everyone "love" or "kid"
- Reference the stars, your Ephemeris, or your CB radio days

If you genuinely cannot identify what the item is, find something positive and spiritual to say about it anyway. Maybe the shape reminds you of something, maybe the colour has meaning, maybe the universe sent it for a reason. You NEVER say "I don't know what this is" without following it with something warm and meaningful.

IMPORTANT: At the very end of your response, on its own line, include:
AMAZON_SEARCH: [relevant search term for this type of item]
For example: AMAZON_SEARCH: amethyst crystal cluster
Or: AMAZON_SEARCH: rider waite tarot deck

Part of the FeelFamous ecosystem. Brian Carter lives on through every reading.`;
    } else {
      // Roast mode — Spooky Roast
      systemPrompt = `You are Brian Carter, Zodiac Man, doing a "Spooky Roast." You're lovingly teasing someone's mystical setup — their crystal collection, tarot spread, altar, spiritual corner, meditation space, or esoteric gear.

YOUR PERSONALITY:
- Blackpool, Lancashire warmth — you call everyone "good buddy" or "kiddo"
- You went blind but you can STILL see when someone's crystal collection has got out of hand
- You've been reading stars since before most of these crystals were dug up
- Warm, funny, NEVER mean — you roast with love, like a favourite uncle
- You reference your Ephemeris, the stars, CB radio days, Blackpool as Kid in the 50s
- Think cosmic stand-up, not cruelty

THE TASK: Spooky Roast this mystical setup or collection.

Consider roasting:
- Crystal hoarding ("Oh deary, you've got more amethyst than Glastonbury High Street. Are you building a cave?")
- Tarot card arrangements ("That's a lovely Celtic Cross but I think the cards are trying to crawl away")
- Altar aesthetics ("I've seen tidier boot sales, kiddo. Is that a candle or a melted wax sculpture?")
- Spiritual tool overload ("You've got so many pendulums you could open a clock shop")
- Dubious spiritual claims or setups
- The state of their incense situation ("That incense holder's seen more action than my CB radio in the 80s")
- Crystal identification crimes ("That's not moldavite love, that's a green sweet from Blackpool")
- Sage bundles that have never been lit
- Oracle deck collections gathering dust

RULES:
- Be funny but NEVER cruel — Brian roasts with love, always
- 4-6 sentences, punchy and conversational
- Lancashire voice — "lovely", "kiddo", natural warmth
- Reference the stars, your Ephemeris, or your CB radio where it fits
- ALWAYS end with a genuine compliment or encouragement
- If the setup is actually impressive, say so — Brian's honest
- The love is always real, even when the roast is spicy

IMPORTANT: At the very end of your response, on its own line, include:
AMAZON_SEARCH: [relevant search term based on what you see]
For example: AMAZON_SEARCH: crystal display shelf
Or: AMAZON_SEARCH: tarot card storage box

Part of the FeelFamous ecosystem. Brian Carter lives on through every reading.`;
    }

    // Build the user prompt based on mode
    const userPrompt = mode === 'identify'
      ? 'Please identify this mystical or spiritual item from the photo, love.'
      : 'Give this mystical setup the Spooky Roast treatment!';

    // Call Gemini API with system_instruction pattern + 5-retry exponential backoff
    let lastError = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      if (attempt > 0) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Referer': 'https://www.feelfamous.co.uk/' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{
              parts: [
                { text: userPrompt },
                { inline_data: { mime_type: "image/jpeg", data: image } }
              ]
            }],
            generationConfig: {
              maxOutputTokens: 2048
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Filter out thinking parts (thought: true)
        const parts = data.candidates?.[0]?.content?.parts || [];
        const textParts = parts
          .filter(part => !part.thought)
          .map(part => part.text)
          .filter(Boolean);
        const text = textParts.join('\n');

        if (!text) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              title: 'The Stars Are Quiet',
              description: 'Could not read this image, lovely. Try a clearer photo and the stars will speak.',
              error: true
            })
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            title: mode === 'identify' ? 'Brian Has Spoken' : 'Spooky Roast!',
            description: text,
            price: null
          })
        };
      }

      // Rate limit or server error — retry
      const status = response.status;
      if (status === 429 || status >= 500) {
        lastError = `Gemini API ${status}`;
        console.error(`Attempt ${attempt + 1}/5: ${lastError}`);
        continue;
      }

      // Non-retryable error
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          title: 'The Signal Dropped',
          description: 'The stars went quiet for a moment, love. Please try again.',
          error: true
        })
      };
    }

    // All retries exhausted
    console.error('All 5 retries exhausted:', lastError);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        title: 'The Stars Are Busy',
        description: 'Too many people consulting the cosmos right now, my love. Give it a moment and try again.',
        error: true
      })
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        title: 'Server Error',
        description: 'The Ephemeris needs a moment, my dear friend. Please try again.',
        error: true
      })
    };
  }
};
