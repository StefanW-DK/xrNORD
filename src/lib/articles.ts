export type ArticleSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "cta"; headline: string; body: string; linkLabel: string; href: string };

export interface Article {
  slug: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: ArticleSection[];
}

export const articles: Record<string, Record<string, Article>> = {
  en: {
    "from-pilot-to-production": {
      slug: "from-pilot-to-production",
      category: "Implementation",
      categoryColor: "#DC2626",
      categoryBg: "rgba(220,38,38,0.08)",
      title: "From Pilot to Production – Scaling AI in the Real World",
      author: "xrNORD Knowledge Team",
      date: "May 14, 2025",
      readTime: "4 min read",
      excerpt:
        "Moving from a proof-of-concept to a production-ready AI system is where most organisations stumble. Here is how to close that gap.",
      image: "/assets/home/articles/from-pilot-to-production.png",
      content: [
        {
          type: "paragraph",
          text: "It's easy to celebrate a successful AI prototype. A dashboard with predictions, a chatbot that answers correctly, or a model that flags risks. But the real test of AI is not what it can do in isolation—it's what it can sustain in the real world.",
        },
        {
          type: "paragraph",
          text: "Many organizations today can run a pilot. Fewer can make it stick. Even fewer can scale it across departments, markets, or geographies without quality breakdowns, user resistance, or technical drift.",
        },
        {
          type: "paragraph",
          text: "This article explores what separates isolated experiments from sustainable AI operations—and how to design for that gap from day one.",
        },
        {
          type: "heading",
          text: "Why Pilots Succeed (But Scaling Breaks Down)",
        },
        {
          type: "paragraph",
          text: "AI pilots typically run under optimal conditions: a narrow use case, clean historical data, access to helpful subject matter experts, and the absence of integration constraints. The team is motivated, the timeline is short, and the outcome is controlled.",
        },
        {
          type: "paragraph",
          text: "But production systems live in a different world:",
        },
        {
          type: "bullets",
          items: [
            "Data is generated in real time, often messy, missing, or mislabeled.",
            "Models must run within legacy systems and on tight latency constraints.",
            "End users are not data scientists—they're busy professionals with zero patience for tool friction.",
          ],
        },
        {
          type: "paragraph",
          text: "Take, for example, an AI pilot that classifies customer feedback into topics. In the lab, it works brilliantly. But in production, the model struggles with slang, multilingual inputs, and ambiguous phrasing—none of which existed in the pilot dataset.",
        },
        {
          type: "paragraph",
          text: "What breaks isn't just the model—it's the system around it. The integration, the data feed, the retraining logic, and the human trust. Scaling AI requires building for that reality.",
        },
        {
          type: "heading",
          text: "What \"Scaling AI\" Actually Means",
        },
        {
          type: "paragraph",
          text: "To scale AI is not to clone a prototype. It is to embed intelligence into the moving machinery of your business—where context shifts, users differ, and new data arrives every minute.",
        },
        {
          type: "paragraph",
          text: "A scalable AI system has:",
        },
        {
          type: "bullets",
          items: [
            "Robust, fault-tolerant pipelines that can recover from input anomalies.",
            "Interfaces designed around operational roles—not just demo scenarios.",
            "Continuous learning infrastructure, including feedback loops and drift detection.",
            "Embedded accountability, so someone owns the system end to end.",
          ],
        },
        {
          type: "paragraph",
          text: "Without these, AI becomes brittle. It works until it doesn't—and no one notices until it's too late.",
        },
        {
          type: "heading",
          text: "From Innovation Project to Operational Asset",
        },
        {
          type: "paragraph",
          text: "Many companies make the mistake of isolating AI in innovation labs. These labs create compelling demos but often fail to transfer knowledge, workflows, or technical dependencies into the operational core.",
        },
        {
          type: "paragraph",
          text: "Real value emerges when AI systems:",
        },
        {
          type: "bullets",
          items: [
            "Are co-developed with the business from the start.",
            "Inherit the same maintenance, monitoring, and support structure as any production system.",
            "Operate under real data governance and compliance constraints.",
          ],
        },
        {
          type: "paragraph",
          text: "At xrNORD, we often encounter projects that stalled after the pilot because there was no operational owner, no defined retraining plan, and no infrastructure for feedback.",
        },
        {
          type: "heading",
          text: "Designing for Drift, Degradation, and Uncertainty",
        },
        {
          type: "paragraph",
          text: "Every AI model degrades over time. Why? Because the world changes. New products, new behaviors, new customer expectations. This isn't failure—it's entropy.",
        },
        {
          type: "paragraph",
          text: "Scaling means designing systems that expect and handle change. For instance:",
        },
        {
          type: "bullets",
          items: [
            "A document classification model should be retrainable monthly as new document types emerge.",
            "A fraud detection system must adjust thresholds based on new transaction behaviors.",
            "A customer-facing chatbot should log failed intents and retrain on edge cases.",
          ],
        },
        {
          type: "paragraph",
          text: "No model stays accurate on its own. Pipelines, observability tools, and retraining triggers are essential to long-term performance.",
        },
        {
          type: "heading",
          text: "Scaling Isn't Just Technical—It's Cultural",
        },
        {
          type: "paragraph",
          text: "Organizational friction is one of the biggest killers of scalable AI. Successful companies don't just upgrade infrastructure—they upgrade expectations:",
        },
        {
          type: "bullets",
          items: [
            "Product managers know how to write specs that include ML behavior.",
            "Compliance teams are involved in labeling, data sourcing, and auditability.",
            "Frontline staff are trained to interpret, override, or escalate AI output when needed.",
          ],
        },
        {
          type: "paragraph",
          text: "At scale, AI is no longer a black box. It becomes a collaborative system where models, humans, and processes share responsibility.",
        },
        {
          type: "heading",
          text: "Performance Metrics: What Matters at Scale",
        },
        {
          type: "paragraph",
          text: "In the lab, you measure model accuracy. In the field, you measure business outcomes:",
        },
        {
          type: "bullets",
          items: [
            "How much faster is onboarding?",
            "Are error rates down across operations?",
            "Is the AI improving over time—or drifting?",
            "Are users actually using the system—or bypassing it?",
          ],
        },
        {
          type: "paragraph",
          text: "One of the clearest signs of maturity is the shift from \"Did the model work?\" to \"Did it change behavior?\"",
        },
        {
          type: "heading",
          text: "xrNORD's Perspective: Scaling with Structural Awareness",
        },
        {
          type: "paragraph",
          text: "At xrNORD, we specialize in helping organizations scale AI responsibly. That doesn't mean deploying more—it means deploying better. We work with our clients to:",
        },
        {
          type: "bullets",
          items: [
            "Map all real-world dependencies: technical, human, legal, and procedural.",
            "Build hybrid systems that balance automation with human oversight.",
            "Design feedback loops so that models improve with usage—not degrade.",
          ],
        },
        {
          type: "paragraph",
          text: "We view AI not as a deliverable—but as a living system. And like all systems, it needs structure, support, and stewardship.",
        },
        {
          type: "heading",
          text: "Final Thought: Scaling is a System Design Problem",
        },
        {
          type: "paragraph",
          text: "To move from pilot to production is to shift from controlled tests to uncontrolled reality. That's not a technical upgrade—it's a design philosophy.",
        },
        {
          type: "paragraph",
          text: "AI that scales is:",
        },
        {
          type: "bullets",
          items: [
            "Built with humans, not just for them.",
            "Monitored as a system, not just a model.",
            "Designed for imperfection—not just precision.",
          ],
        },
        {
          type: "paragraph",
          text: "Scale isn't just about ambition—it's about architecture.",
        },
        {
          type: "cta",
          headline: "Understanding AI is only the first step.",
          body: "The real challenge for most organizations is turning AI potential into real business value through a clear strategy and a structured roadmap. At xrNORD, we help companies translate AI opportunities into concrete strategic initiatives and long-term capabilities.",
          linkLabel: "Explore our AI Strategy & Roadmap process",
          href: "/en/ai-roadmap",
        },
        {
          type: "cta",
          headline: "Starting your AI journey does not have to be complicated.",
          body: "Many of our clients begin their AI journey with a focused one-day workshop where leadership teams explore how AI can create real value across the business. The result is a clear understanding of opportunities, priorities, and the next steps toward building an AI-driven organization.",
          linkLabel: "Discover the xrNORD AI Workshop",
          href: "/en/workshop",
        },
      ],
    },
  },
  da: {
    "from-pilot-to-production": {
      slug: "from-pilot-to-production",
      category: "Implementering",
      categoryColor: "#DC2626",
      categoryBg: "rgba(220,38,38,0.08)",
      title: "Fra pilot til produktion - sådan skalerer I AI i praksis",
      author: "xrNORD Knowledge Team",
      date: "15. maj 2025",
      readTime: "5 min læsning",
      excerpt:
        "Det er let at fejre en vellykket AI-prototype. Det svære er at få den til at leve videre i virkeligheden - på tværs af teams, systemer og hverdagens kaos.",
      image: "/assets/home/articles/from-pilot-to-production-da.png",
      content: [
        {
          type: "paragraph",
          text: "Det er let at fejre en vellykket AI-prototype. En flot forudsigelse i et dashboard, en chatbot der svarer rigtigt, en model der finder fejl. Men det egentlige bevis på, at AI virker, ligger ikke i testmiljøet - det ligger i hverdagen.",
        },
        {
          type: "paragraph",
          text: "Mange organisationer kan gennemføre en pilot. Færre får den til at leve videre. Endnu færre formår at skalere løsningen til drift, tværgående teams eller internationale afdelinger uden, at kvaliteten falder, brugerne svigter eller dataene ændrer sig.",
        },
        {
          type: "paragraph",
          text: "Denne artikel dykker ned i, hvad der adskiller en eksperimentel løsning fra et robust AI-setup, og hvordan man bygger det rigtigt fra starten.",
        },
        {
          type: "heading",
          text: "Hvorfor piloten virker, men skaleringsforsøget fejler",
        },
        {
          type: "paragraph",
          text: "AI-piloter køres typisk under optimale forhold: begrænset use case, renset historisk data, tæt adgang til fagpersoner og ingen krav om integration. Teamet er engageret, afgrænsningen klar og output kontrolleret.",
        },
        {
          type: "paragraph",
          text: "Men produktion er noget andet:",
        },
        {
          type: "bullets",
          items: [
            "Data kommer i realtid, er ufuldstændige, støjfyldte og ofte fejlbehæftede.",
            "Modellen skal køre i samspil med gamle systemer og med krav til svartid.",
            "Brugerne er ikke data scientists - men travle medarbejdere med lidt tålmodighed.",
          ],
        },
        {
          type: "paragraph",
          text: "Tænk fx på en AI-pilot, der kategoriserer kundefeedback. I test fungerer den perfekt. Men i produktion opstår problemer: slang, dialekter, sprogskift og flertydigheder - ting som ikke fandtes i pilotens datasæt.",
        },
        {
          type: "paragraph",
          text: "Det, der fejler, er ikke modellen - men systemet omkring den. Datafeedet, integrationen, tilliden og retraining. At skalere AI kræver at bygge for virkeligheden.",
        },
        {
          type: "heading",
          text: "Hvad det egentlig betyder at \"skalere AI\"",
        },
        {
          type: "paragraph",
          text: "Skalering handler ikke om at kopiere en prototype. Det handler om at integrere intelligens i virksomhedens systemer, dér hvor forretningens hjul kører, og intet er statisk.",
        },
        {
          type: "paragraph",
          text: "Et skalerbart AI-setup har:",
        },
        {
          type: "bullets",
          items: [
            "Driftsstabile pipelines, der tåler støj, fejl og variationer.",
            "Brugerflader designet til rigtige arbejdsgange - ikke bare demoer.",
            "Læring indbygget fra start - feedback loops, datadrift-detektion, retraining.",
            "Tydeligt ejerskab, så ansvar og vedligehold ikke falder mellem to stole.",
          ],
        },
        {
          type: "paragraph",
          text: "Uden disse elementer bliver AI en prototype i forklædning. Det virker, indtil det pludselig ikke gør.",
        },
        {
          type: "heading",
          text: "Fra innovationsprojekt til driftsløsning",
        },
        {
          type: "paragraph",
          text: "Mange virksomheder isolerer AI i \"labs\" eller innovationsenheder. Det skaber fede prototyper - men ofte uden kobling til drift, processer eller support.",
        },
        {
          type: "paragraph",
          text: "Værdien opstår først, når AI:",
        },
        {
          type: "bullets",
          items: [
            "Udvikles sammen med forretningen - ikke udenom den.",
            "Får samme krav til drift, sikkerhed og vedligehold som andre systemer.",
            "Underlægges governance og compliance på linje med al anden teknologi.",
          ],
        },
        {
          type: "paragraph",
          text: "Hos xrNORD møder vi ofte piloter, der er strandet, fordi der mangler ejerskab, retrainingsplan og teknisk infrastruktur til drift.",
        },
        {
          type: "heading",
          text: "Design til forandring, drift og usikkerhed",
        },
        {
          type: "paragraph",
          text: "Alle modeller bliver dårligere over tid. Hvorfor? Fordi verden ændrer sig. Nye kundetyper, nye regler, nye systemer. Det er ikke fejl - det er naturligt.",
        },
        {
          type: "paragraph",
          text: "At skalere betyder at designe systemer, der kan følge med:",
        },
        {
          type: "bullets",
          items: [
            "En dokumentklassificeringsmodel bør kunne opdateres løbende.",
            "Et svindelmodul skal tilpasse sig nye mønstre og grænseværdier.",
            "En chatbot skal kunne lære af mislykkede svar og forbedre sig over tid.",
          ],
        },
        {
          type: "paragraph",
          text: "Ingen AI-løsning fungerer stabilt uden feedback, driftsovervågning og vedligeholdelse. Det skal være tænkt ind fra starten.",
        },
        {
          type: "heading",
          text: "Skalering er ikke bare teknisk - det er kulturelt",
        },
        {
          type: "paragraph",
          text: "Organisationens mindset er ofte den største barriere for skalering. De virksomheder der lykkes, opdaterer ikke kun systemer - de opdaterer forventninger:",
        },
        {
          type: "bullets",
          items: [
            "Produktteams lærer at inkludere AI-logik i deres kravspecifikation.",
            "Jurister og compliancefolk er med i datavalidering og audit flows.",
            "Frontmedarbejdere forstår, hvornår AI skal bruges - og hvornår det skal ignoreres.",
          ],
        },
        {
          type: "paragraph",
          text: "I skala bliver AI ikke en black box - men et samarbejde mellem modeller, mennesker og processer.",
        },
        {
          type: "heading",
          text: "Hvad måles der på, når AI skaleres?",
        },
        {
          type: "paragraph",
          text: "I piloten måles accuracy. I driften måles effekt:",
        },
        {
          type: "bullets",
          items: [
            "Bliver opgaver løst hurtigere?",
            "Færre fejl? Lavere omkostninger?",
            "Forbedrer AI sig - eller forringes den?",
            "Bliver systemet brugt - eller bliver det omgået?",
          ],
        },
        {
          type: "paragraph",
          text: "Målet er ikke at modellen fungerer - men at organisationen ændrer adfærd.",
        },
        {
          type: "heading",
          text: "xrNORDs erfaring: Skalering kræver struktur",
        },
        {
          type: "paragraph",
          text: "Hos xrNORD hjælper vi virksomheder med at gå fra idé til implementering. Det handler ikke om at deploye hurtigere - men om at deploye rigtigt. Vi fokuserer på:",
        },
        {
          type: "bullets",
          items: [
            "At kortlægge de faktiske afhængigheder: tekniske, menneskelige, lovgivningsmæssige.",
            "At bygge hybride systemer, hvor AI og mennesker arbejder sammen.",
            "At designe feedbackloop og governance, så løsningen lærer med tiden.",
          ],
        },
        {
          type: "paragraph",
          text: "Vi ser AI som et levende system. Det kræver arkitektur, ansvar og vedligehold - ikke bare en launch-dato.",
        },
        {
          type: "heading",
          text: "Skalering er et designproblem",
        },
        {
          type: "paragraph",
          text: "At få en AI-model til at virke i en pilot er en teknisk præstation. At få den til at fungere stabilt og værdiskabende i virkeligheden er en arkitektonisk og organisatorisk opgave.",
        },
        {
          type: "paragraph",
          text: "Det handler ikke om at gøre mere af det samme - men om at designe for kompleksitet, variation og drift.",
        },
        {
          type: "heading",
          text: "Bygget med mennesker - ikke bare til dem",
        },
        {
          type: "paragraph",
          text: "En AI-løsning kan ikke skubbes ud til brugerne som et færdigt produkt og forventes at blive adopteret. Den skal udvikles sammen med dem, så den forstår deres kontekst, sprog, arbejdsgange og beslutningslogik.",
        },
        {
          type: "bullets",
          items: [
            "At kundeservice, jurister eller fagmedarbejdere deltager i træning og test.",
            "At feedback-loopet er nemt, så fejl og forslag kan indrapporteres.",
            "At AI hjælper - uden at fjerne kontrol.",
          ],
        },
        {
          type: "paragraph",
          text: "Når AI bliver en medspiller snarere end en maskine, opstår der tillid. Og tillid er forudsætningen for skaleret brug.",
        },
        {
          type: "heading",
          text: "Overvåget som et system - ikke bare en model",
        },
        {
          type: "paragraph",
          text: "En AI-model er kun ét tandhjul i en større maskine. Når den indgår i produktion, skal den overvåges og vedligeholdes på lige fod med ethvert andet forretningskritisk system.",
        },
        {
          type: "bullets",
          items: [
            "Driftsovervågning af data pipelines, inputkvalitet og svartider.",
            "Alerting ved ændringer i datadistribution (drift).",
            "Versionering og sporbarhed på modeludgivelser og resultater.",
          ],
        },
        {
          type: "paragraph",
          text: "Det handler ikke kun om modellens præcision - men om systemets påvirkning, reaktionstid og robusthed.",
        },
        {
          type: "heading",
          text: "Designet til at kunne tåle usikkerhed - ikke kun præcision",
        },
        {
          type: "paragraph",
          text: "Mange modeller er trænet på historiske data, under kontrollerede forhold. Men verden er ikke kontrolleret. Nye situationer opstår. Data ændrer sig. Brugere stiller uventede spørgsmål.",
        },
        {
          type: "paragraph",
          text: "En AI-løsning i drift skal derfor:",
        },
        {
          type: "bullets",
          items: [
            "Have fallback-mekanismer og grænser for autonomi.",
            "Kunne markere når den er i tvivl (\"uncertainty threshold\").",
            "Være integreret med mennesker, der kan gribe ind, justere eller overtage.",
          ],
        },
        {
          type: "paragraph",
          text: "Et system, der ikke kan erkende sin egen usikkerhed, er farligt. Et system der kan - og som samarbejder med mennesker - er robust.",
        },
        {
          type: "heading",
          text: "Afslutning",
        },
        {
          type: "paragraph",
          text: "Fra pilot til drift er ikke bare et teknisk skridt. Det er et skifte i tankegang. Et skifte fra prototype til infrastruktur.",
        },
        {
          type: "paragraph",
          text: "Skalerbar AI er:",
        },
        {
          type: "bullets",
          items: [
            "Bygget med mennesker - ikke bare til dem.",
            "Overvåget som et system - ikke bare en model.",
            "Designet til at kunne tåle usikkerhed - ikke kun præcision.",
          ],
        },
        {
          type: "paragraph",
          text: "Skalering handler ikke om volumen. Det handler om arkitektur.",
        },
        {
          type: "cta",
          headline: "At forstå AI er kun første skridt.",
          body: "Den virkelige udfordring for mange organisationer er at omsætte AI-potentialet til reel forretningsværdi gennem en klar strategi og et struktureret roadmap. Hos xrNORD hjælper vi virksomheder med at omsætte AI-muligheder til konkrete strategiske initiativer og langsigtede kompetencer.",
          linkLabel: "Udforsk vores AI-strategiproces",
          href: "/da/ai-roadmap",
        },
        {
          type: "cta",
          headline: "Det behøver ikke være kompliceret at starte jeres AI-rejse.",
          body: "Mange af vores kunder begynder deres AI-rejse med en fokuseret endags workshop, hvor ledelsen udforsker hvordan AI kan skabe reel værdi i virksomheden. Resultatet er en klar forståelse af mulighederne, prioriteringerne og de næste skridt mod at opbygge en AI-drevet organisation.",
          linkLabel: "Læs mere om xrNORD AI Workshop",
          href: "/da/workshop",
        },
      ],
    },
  },
};

export function getArticle(locale: string, slug: string): Article | null {
  const localeArticles = articles[locale] ?? articles["en"];
  return localeArticles?.[slug] ?? articles["en"]?.[slug] ?? null;
}

export function getAllArticles(locale: string): Article[] {
  const localeArticles = articles[locale] ?? {};
  const enArticles = articles["en"] ?? {};
  const merged = { ...enArticles, ...localeArticles };
  return Object.values(merged);
}
