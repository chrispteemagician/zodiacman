const https = require('https');

// Brian's fallback messages — one per sign, warm Lancashire love
const BRIAN_FALLBACKS = {
  aries: "Now then, Aries love. Today's your day to charge forward. The stars have lined up behind you and they're giving you a good push. Trust that energy, kid. Everything's gonna work out.",
  taurus: "Ey up, Taurus. You've been grafting hard and the universe has noticed, love. Today's about enjoying what you've built. Have a brew, put your feet up for five minutes. You've earned it, you really have.",
  gemini: "Hello there, Gemini, you beautiful whirlwind. Your mind's buzzing today and that's a gift, not a curse. Let those ideas flow. Talk to people. Share what's in your heart. Someone needs to hear exactly what you've got to say.",
  cancer: "Now then, Cancer love. I know you feel everything deeply and that's your superpower, that is. Today the stars are wrapping you up warm. Let people look after you for a change. You deserve that kindness right back.",
  leo: "Alright, Leo! Oh, you're glowing today, kid. That light of yours — don't you dare dim it. The world needs your warmth, your laughter, your big generous heart. Shine on. I'm proud of you.",
  virgo: "Hey there, Virgo love. I know you're always fixing things for everyone else, but today's about you. The stars are saying take a breath, look how far you've come. You're doing brilliantly. Honestly, you are.",
  libra: "Now then, Libra. You bring balance wherever you go and people don't tell you that enough. Today's full of harmony for you, love. Good conversations, kind connections. You're exactly where you need to be.",
  scorpio: "Ey up, Scorpio. I know you run deep, kid, and that's nothing to apologise for. Today that intensity is your rocket fuel. Trust your gut, follow that fire inside you. Magic's coming your way.",
  sagittarius: "Hello, Sagittarius, you wonderful adventurer! Today's got that feeling, you know? Like something brilliant's just round the corner. Keep your eyes open and your heart wider. The universe has got plans for you, love.",
  capricorn: "Now then, Capricorn. You've been climbing that mountain with such determination and I want you to know — the view from where you are right now is already beautiful. Be proud today. You've come so far, kid.",
  aquarius: "Alright, Aquarius love. That big brain of yours is cooking up something special today, I can feel it. Your weird is your wonderful, never forget that. The world needs exactly what you're bringing to it.",
  pisces: "Hey there, Pisces, you gentle soul. The stars are being so kind to you today. Your dreams aren't daft — they're directions. Trust those feelings, follow that intuition. You know the way, love. You always have."
};

const VALID_SIGNS = Object.keys(BRIAN_FALLBACKS);

// Brian-style wrappers for the live horoscope
const BRIAN_INTROS = [
  "Now then, {sign} love. Let me tell you what the stars are saying today...",
  "Ey up, {sign}! Brian's had a look at your stars and here's the good news...",
  "Hello there, beautiful {sign}. The universe has got a message for you today...",
  "Right then, {sign}. Pull up a chair, love. Here's what the cosmos reckon...",
  "Now listen here, {sign}. The stars have been chatting and they've got something lovely for you..."
];

const BRIAN_OUTROS = [
  "And remember, love — you're doing brilliantly. Brian believes in you.",
  "Keep going, kid. The stars are on your side and so am I.",
  "That's your lot for today, love. Now go be magnificent.",
  "And that's Brian's cosmic wisdom for you today. You're a star yourself, you know.",
  "Remember — the universe made you on purpose. Never forget that, love."
];

function fetchHoroscope(sign) {
  return new Promise((resolve, reject) => {
    const url = `https://ohmanda.com/api/horoscope/${sign}/`;

    const req = https.get(url, { timeout: 8000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API returned ${res.statusCode}`));
          return;
        }
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.horoscope || parsed.message || '');
        } catch (e) {
          reject(new Error('Failed to parse horoscope response'));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitaliseSign(sign) {
  return sign.charAt(0).toUpperCase() + sign.slice(1);
}

function wrapInBriansVoice(sign, horoscopeText) {
  const displaySign = capitaliseSign(sign);
  const intro = pickRandom(BRIAN_INTROS).replace('{sign}', displaySign);
  const outro = pickRandom(BRIAN_OUTROS);
  return `${intro}\n\n${horoscopeText}\n\n${outro}`;
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed, love. Try a GET request.' })
    };
  }

  const sign = (event.queryStringParameters?.sign || '').toLowerCase().trim();

  if (!sign || !VALID_SIGNS.includes(sign)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: "Now then, love — I need a valid star sign. Try ?sign=aries (or any of the 12).",
        valid_signs: VALID_SIGNS
      })
    };
  }

  try {
    const horoscopeText = await fetchHoroscope(sign);
    const message = wrapInBriansVoice(sign, horoscopeText);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sign: sign,
        horoscope: message,
        source: 'live',
        brian: true
      })
    };
  } catch (err) {
    // API failed — Brian's got you covered
    const fallback = BRIAN_FALLBACKS[sign];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sign: sign,
        horoscope: fallback,
        source: 'fallback',
        brian: true
      })
    };
  }
};
