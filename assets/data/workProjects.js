/**
 * Work index + case study copy. Replace URLs, metrics, and product names where you want tighter accuracy.
 */

/**
 * Remote thumbnail URL (thum.io). Fine for optional `<img src>` with `onError` handling;
 * avoid relying on it as the only hero art — prefer bundled assets via `new URL(..., import.meta.url)`.
 */
export function liveSitePreview(url) {
    if (!url) return '';
    const u = url.trim();
    return `https://image.thum.io/get/width/1280/crop/720/noanimate/${encodeURIComponent(u)}`;
}

/** Bundled case-study assets (paths relative to this file). */
const statforgeLifecycleShot = new URL('../images/statforge lifecycle.png', import.meta.url).href;
const leadConsoleHeroShot = new URL('../images/leadgen.png', import.meta.url).href;
const fiberHostingHeroShot = new URL('../images/fiberhosting.png', import.meta.url).href;

export const WORK_PROJECTS = [
    {
        slug: 'statforge',
        featured: true,
        title: 'StatForge',
        subtitle: 'Verified match data, leaderboards, and developer APIs for competitive games',
        proofBadge: 'Platform',
        description:
            'Tracker data, scheduled events, reports, and operator review all feed one platform record. The system resolves player identity, detects candidate activity, verifies match results, and publishes leaderboards, player pages, and scoped API data.',
        icon: '📊',
        tech: [
            'Next.js',
            'ASP.NET',
            'Fastify',
            'Node worker',
            'MySQL',
            'PostgreSQL',
            'Docker',
            'GitHub Actions',
            'GameTools API'
        ],
        /* Bundled asset: thum.io previews often fail as CSS backgrounds in dev/production. */
        image: statforgeLifecycleShot,
        demoLink: 'https://stat-forge.fiberhostingservices.com/',
        repoLink: null,
        screenshots: [statforgeLifecycleShot],
        caseStudy: {
            summary:
                'StatForge is the platform layer around competitive game data. The public site shows players, matches, and leaderboards. The portal handles applications and API keys. Operators review candidate matches before results become official. The BF6 tracker is one input into that system. It resolves players through GameTools, polls stats over time, stores raw snapshots, and detects likely match activity from aggregate stat changes. That activity does not go straight to the public site. It goes through correlation and review first.',
            whatItIs:
                'There are two different kinds of data in the system: tracker data and verified platform data. Tracker data is raw and inferred. A worker polls GameTools, stores snapshots, hashes payloads to avoid duplicate rows, and looks for deltas in global stats. If matchesPlayed increases, that can become a candidate match. Verified platform data is the record users and integrators actually see. The platform API owns users, linked game identities, teams, tournaments, scrims, matches, match results, applications, API keys, scopes, and review state. Operators sit between those two layers. They review tracker candidates, compare them against expected matches and reports, and decide what becomes a canonical match record.',
            problem:
                'GameTools can tell me a player\'s current BF6 stats. It cannot tell me whether those stats belong to a verified match in StatForge, who reported the result, whether the match was scheduled, or whether the player identity is linked to a platform account. That missing context is the platform\'s job. The tracker collects evidence. The platform resolves identity, ties activity to expected matches, records review decisions, and publishes only the data that passed validation.',
            lifecycleHeroTitle: 'Tracker evidence to verified records',
            lifecycleHeroSubtitle:
                'The path from raw tracker activity to a reviewed record your integrations can trust.',
            differencePunchyLines: [
                'GameTools gives current stats.',
                'The tracker stores evidence.',
                'The platform owns verification.',
                'Operators review candidates.',
                'The API publishes canonical records.',
                'Leaderboards only read from verified data.'
            ],
            pullQuote:
                'The hardest platform problem was deciding when inferred activity becomes verified truth.',
            hideScreenshots: false,
            showStatForgeLifecycle: true,
            diagramTitle: 'Verified data flow',
            diagramSteps: [
                { title: 'Next.js web', detail: 'Public site, portal, review' },
                { title: 'ASP.NET API', detail: 'Auth, RBAC, matches, keys' },
                { title: 'MySQL platform', detail: 'Users, identities, canonical records' },
                { title: 'Tracker API', detail: 'Fastify resolve and reads' },
                { title: 'Node poller', detail: 'GameTools batch polling' },
                { title: 'Postgres tracker', detail: 'Snapshots and detected matches' },
                { title: 'Review', detail: 'Candidates become verified data' }
            ],
            diagramNote:
                'Public and portal traffic goes through the platform API. The tracker is a subsystem for identity resolution, polling, snapshots, and candidate detection.',
            architectureIntro:
                'Public pages, portal flows, and operator tools all go through the platform API. The tracker is not the product boundary. It is an internal subsystem that resolves players, polls GameTools, stores snapshots, and produces candidate activity for review. The platform owns the verified record. It decides which tracker candidates line up with scheduled events, reports, linked identities, and staff validation.',
            hideArchitectureBlock: true,
            architecture: `apps/web (Next.js)
Reference site | Marketing | Portal | Operator review
        |
        v
platform-api (ASP.NET)
Auth | RBAC | Apps and keys | Matches | Leaderboards | Review
        |
        +--> MySQL platform DB
        |    users, identities, matches, results, reviews, apps, keys
        |
        +--> tracker-api and tracker-poller
             Fastify API | Node worker | GameTools
                    |
                    v
             PostgreSQL tracker DB
             tracked players, snapshots, detected matches`,
            stackNotes:
                'apps/web is the Next.js frontend. It covers public player and leaderboard pages, marketing/reference pages, portal flows, and /app/review. platform-api is the ASP.NET API. It handles portal sessions, Discord and email/password auth, RBAC, applications, API keys, scopes, leaderboards, matches, review actions, and tracker read-through routes. The tracker service is separate. tracker-api is Fastify. It resolves players by platformId and platformNick, reads latest snapshots by personaId, and enrolls tracked players. tracker-poller is a Node worker that batches GameTools requests and writes snapshots to PostgreSQL. MySQL stores platform data: users, linked game identities, matches, match results, teams, tournaments, scrims, review records, portal applications, API keys, and scopes. API consumers, operators, and internal services do not all hit the same endpoints. The platform API exposes curated data while raw tracker data stays behind platform-mediated or internal routes.',
            personalBuild: [
                'Built the resolve path from platformId and platformNick to stable BF6 identity. The system caches GameTools results, stores persona and nucleus IDs, and enrolls resolved players for polling.',
                'Built the poller path that reads enabled tracked players, batches GameTools stats requests, stores raw JSON snapshots, normalizes global fields, and dedupes identical payloads with a raw hash.',
                'Built match candidate detection from aggregate stat deltas. Since there is no direct match-ended event, the worker compares snapshots and looks for meaningful changes like increased matches played.',
                'Built the boundary between tracker candidates and verified platform records. A detected match is evidence, not truth.',
                'Built platform data paths for linked identities, review candidates, canonical matches, match results, leaderboards, portal applications, API keys, and scopes.',
                'Built frontend surfaces for public player pages, leaderboards, developer portal flows, and operator review.'
            ],
            personalBuildCards: [],
            technicalChallenges: [
                'The tracker has to infer activity from totals. If matchesPlayed increases between snapshots, something happened, but the provider does not hand over a clean match object. The system has to treat that as a candidate, not a final result.',
                'Display names are terrible identifiers because they change. The system tracks persona IDs, nucleus IDs, linked platform accounts, and user-game identity relationships instead of treating nicknames as the source of truth.',
                'The review flow exists because detected data and verified data are different things. Operators need to compare tracker candidates with scheduled matches, reports, participants, and expected activity before publishing results.',
                'Snapshot storage grows quickly. Raw JSON is useful for audit and debugging, but long-term reads need indexes, retention rules, normalized fields, and eventually aggregation.',
                'Public users, API consumers, operators, and internal services need different boundaries. The platform API publishes canonical records; raw tracker internals stay out of the customer-facing contract.'
            ],
            links: [{ href: 'https://stat-forge.fiberhostingservices.com/', label: 'Live product (StatForge.gg)' }]
        }
    },
    {
        slug: 'fiber-hosting',
        title: 'Fiber Hosting',
        subtitle: 'Self-hosted cloud & hosting platform',
        proofBadge: 'Infrastructure',
        description:
            'Control-plane thinking on real metal and clusters: provisioning, networking edges, and operational guardrails for customer-facing hosting workloads.',
        icon: '⚡',
        tech: ['Proxmox', 'Kubernetes', 'Docker', 'NGINX', 'Terraform', 'Linux'],
        image: fiberHostingHeroShot,
        demoLink: 'https://fiberhostingservices.com/',
        repoLink: 'https://github.com/Mystshara/web-game-hosting-demo',
        screenshots: [
            fiberHostingHeroShot,
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=600&fit=crop'
        ],
        caseStudy: {
            summary:
                'Fiber Hosting is the strongest public infrastructure story: turning “servers and clusters” into a repeatable platform customers can depend on.',
            whatItIs:
                'A hosting and edge platform spanning self-hosted virtualization (Proxmox) and Kubernetes-backed services, with emphasis on provisioning flows, network ingress, and day-2 operations.',
            problem:
                'Hosting products fail in boring ways: flaky provisioning, unclear networking paths, and upgrades that require heroics. The goal is predictable lifecycle operations at scale, not a demo cluster.',
            architecture: `Customers / edge traffic
        │
        ▼
┌──────────────┐      ┌─────────────────────┐
│ NGINX / TLS  │─────▶│ app + game workloads │
└──────┬───────┘      └──────────┬──────────┘
       │                         │
       ▼                         ▼
┌──────────────┐      ┌─────────────────────┐
│ Proxmox      │      │ Kubernetes          │
│ (metal/VM)   │      │ (scheduling, rollouts)│
└──────────────┘      └─────────────────────┘
        │                         │
        └──────── Terraform / automation ───────┘`,
            stackNotes:
                'Proxmox for bare-metal/VM foundations, Kubernetes for orchestration, Docker images as the portable unit of delivery, NGINX at the edge, Terraform for reproducible infrastructure, and Linux primitives done correctly (systemd, cgroups, observability hooks).',
            personalBuild: [
                'Designed provisioning flows so new capacity could join the fleet without manual snowflake steps.',
                'Hardened ingress/TLS termination patterns and documented failure modes operators actually hit.',
                'Built automation that treated infrastructure like software: reviewable changes, rollbacks, and drift detection where possible.',
                'Operationalized upgrades with canaries and clear health checks, not “restart and hope.”'
            ],
            technicalChallenges: [
                'Bridging Proxmox-era networking assumptions with Kubernetes networking without creating blind spots.',
                'Keeping provisioning idempotent when hardware and hypervisors disagree in subtle ways.',
                'Balancing customer self-service with guardrails that prevent catastrophic misconfiguration.'
            ],
            links: [
                { href: 'https://fiberhostingservices.com', label: 'Live site' },
                { href: 'https://github.com/Mystshara/web-game-hosting-demo', label: 'Reference repo' }
            ]
        }
    },
    {
        slug: 'ai-lead-generation',
        title: 'Lead Console',
        subtitle: 'Hiring-signal intelligence for recruiter outreach',
        proofBadge: 'SaaS Tool',
        description:
            'A recruiter-facing lead intelligence system that ingests public careers and ATS pages, detects hiring intent with deterministic rules, deduplicates company opportunities, and ranks leads by outreach priority.',
        icon: '🎯',
        tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Web ingestion', 'Deterministic scoring'],
        image: leadConsoleHeroShot,
        demoLink: 'https://lead.fiberhostingservices.com/',
        repoLink: null,
        screenshots: [leadConsoleHeroShot],
        caseStudy: {
            summary:
                'Lead Console helps recruiting and outreach teams answer a practical question: which companies are actively hiring for roles we care about, and which ones are worth contacting first? The system ingests public careers and ATS pages, extracts hiring signals, deduplicates company-level opportunities, scores intent, and routes leads through a human review workflow. The core signal logic is deterministic and explainable, not hidden behind a black box.',
            whatItIs:
                'A lead-intelligence platform for recruiters and recruiting teams. Users can submit a company, careers page, or job-board URL, then the system analyzes the page for hiring signals: engineering role density, infrastructure keywords, ATS identity, employer slug, careers-page confidence, transformation language, and contact intent. The output is a ranked lead queue with evidence, outreach context, review status, and workflow actions.',
            problem:
                'Recruiters do not just need company names. They need timing and intent. A company hiring platform, infrastructure, SRE, DevOps, cloud, security, or backend roles is publicly signaling growth, delivery pressure, or internal scaling pain. Lead Console turns messy public hiring data into a prioritized outreach workflow.',
            diagramTitle: 'Lead scoring pipeline',
            diagramSteps: [
                { title: 'React console', detail: 'Queue, filters, lead detail' },
                { title: 'FastAPI API', detail: 'Auth, ingest, dedupe, workflow' },
                { title: 'Postgres', detail: 'Leads, JSONB enrichment, audit' },
                { title: 'Redis queue', detail: 'RPUSH and BLPOP events' },
                { title: 'Python worker', detail: 'Scoring, signals, contact intent' },
                { title: 'Postgres', detail: 'Scored lead and events' }
            ],
            diagramNote:
                'Ingest stays request-driven. Heavy scoring work is queued through Redis and written back by workers so the review console can keep moving.',
            architectureIntro:
                'A submitted URL enters the API, gets normalized and SSRF-validated, then is fetched and reduced into lead enrichment. The API stores or merges the company opportunity, publishes a scoring event, and the worker writes deterministic signals back to Postgres for the review console.',
            hideArchitectureBlock: true,
            architecture: `React Lead Console
        |
        v
FastAPI API ---------------------> Public careers / ATS pages
        |
        v
Postgres
        |
        v
Redis lead_events queue
        |
        v
Python Worker
        |
        v
Postgres`,
            stackNotes:
                'React powers the lead review console. FastAPI handles auth, ingest, careers-page discovery, dedupe, workflow actions, scoring queue publication, and CSV export. PostgreSQL is the source of truth for leads, enrichment JSONB, users, sessions, and audit events. Redis provides a simple FIFO queue using RPUSH and BLPOP. Python workers process scoring and outreach context asynchronously. Public web ingestion is defensive: URL normalization, SSRF validation, retries and backoff, domain cooldowns after rate limits, structured upstream error mapping, and generic extraction when page markup changes.',
            personalBuild: [
                'Designed the intake pipeline for public careers and ATS URLs, including URL normalization, SSRF validation, page fetching, boilerplate stripping, metadata extraction, and enrichment storage.',
                'Built deterministic scoring rules for hiring intent, role-family signals, ATS identity, repeated engineering titles, infrastructure keywords, page confidence, and transformation language.',
                'Implemented company-level deduplication across exact URLs, registrable domains, website hosts, emails, company/contact identity, and multi-tenant ATS boards like Lever, Greenhouse, Ashby, and Workable.',
                'Built the async scoring flow with Redis and Python workers so ingestion can queue scoring work and keep the UI responsive.',
                'Shipped the recruiter workflow surface: ranked leads, filters, lead detail evidence, contact intent, review status, outreach actions, and CSV export.'
            ],
            technicalChallenges: [
                'Dedupe had to be conservative. Two Ashby or Greenhouse URLs may share the same host but belong to completely different companies, so the system compares ATS board identity and employer slugs instead of blindly merging by domain.',
                'The scoring needed to stay explainable. Recruiters need to know why a company is worth contacting, so the system preserves keywords, evidence, enrichment data, contact-intent reasoning, and audit events.',
                'Public web ingestion is unreliable by nature. The system has to handle 403s, 404s, 429s, timeouts, changed markup, thin pages, ATS redirects, and repeated re-ingests without corrupting lead identity.',
                'The product is company/opportunity-centric, not job-posting-centric. Multiple job URLs for the same company collapse into one lead while preserving merged source URLs and combined signal evidence.',
                'Scaling would require pagination, stronger database constraints, indexed workflow filters, durable queue recovery, scheduled re-crawls, and normalized lead-signal columns promoted out of JSONB where query volume justifies it.'
            ],
            links: [{ href: 'https://lead.fiberhostingservices.com/', label: 'Live product (Lead Console)' }]
        }
    },
    {
        slug: 'security-automation-platform',
        title: 'Security Automation Platform',
        subtitle: 'PTaaS-style stack + vulnerability discovery pipelines',
        proofBadge: 'Security Automation',
        description:
            'One coherent security-engineering story: modular automation, policy-as-code, secrets discipline, and scanner orchestration, with a public reference implementation on GitHub.',
        icon: '🛡️',
        tech: ['Kubernetes', 'Terraform', 'Vault', 'Trivy', 'ZAP', 'GitHub Actions', 'Python'],
        image: liveSitePreview('https://github.com/Mystshara/ptaas-security-demo'),
        demoLink: 'https://github.com/Mystshara/ptaas-security-demo',
        repoLink: 'https://github.com/Mystshara/ptaas-security-demo',
        screenshots: [
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop'
        ],
        caseStudy: {
            summary:
                'Bug-bounty style discovery and a PTaaS-style modular stack are the same engineering muscle: repeatable pipelines, safe secrets, and automation you can audit, merged here as one public platform narrative.',
            whatItIs:
                'A reference security automation platform demonstrating how vulnerability discovery workflows, infrastructure provisioning, and secrets management fit together as a maintainable system.',
            problem:
                'Security tooling fails when it is a pile of scripts run by one person. Teams need reproducible environments, traceable changes, and integration points that match how engineering already ships software.',
            architecture: `CI / GitHub Actions
        │
        ▼
┌──────────────────────┐      ┌─────────────────┐
│ build / test / scan │─────▶│ artifact + SBOM │
└──────────┬──────────┘      └────────┬────────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌─────────────────────┐
│ Kubernetes runtime   │    │ Vault (secrets)     │
│ (deploy, policies)   │    │ (identity, leases)  │
└──────────┬───────────┘    └─────────────────────┘
           │
           ▼
┌──────────────────────┐
│ scanners (Trivy/ZAP) │
│ + orchestration      │
└──────────────────────┘`,
            stackNotes:
                'Terraform for infrastructure as code, Kubernetes as execution substrate, Vault for secrets and identity-aware access, CI/CD for gates, and scanners orchestrated as first-class jobs, not manual clicks.',
            personalBuild: [
                'Consolidated “PTaaS demo” and bug-bounty automation narratives into one modular layout so the repo reads as a platform, not a one-off.',
                'Implemented pipeline patterns that separate build-time and runtime security signals.',
                'Emphasized least-privilege flows and secret lifecycle patterns that survive scrutiny beyond a README screenshot.'
            ],
            technicalChallenges: [
                'Keeping scanner orchestration reliable across flaky targets and rate limits.',
                'Making Terraform + Kubernetes boundaries clear so changes remain reviewable as the stack grows.',
                'Documenting threat models and trade-offs honestly: reference architectures should teach, not market.'
            ],
            links: [{ href: 'https://github.com/Mystshara/ptaas-security-demo', label: 'GitHub reference' }]
        }
    }
];

export function getProjectBySlug(slug) {
    return WORK_PROJECTS.find((p) => p.slug === slug) ?? null;
}
