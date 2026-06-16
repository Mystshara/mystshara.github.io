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
        subtitle: 'Competitive gaming data platform for verified matches, leaderboards, and developer APIs',
        proofBadge: 'Platform',
        description:
            'A competitive gaming data platform that reconciles raw tracker activity, scheduled events, reports, and operator review into canonical match records, verified leaderboards, public player pages, and scoped developer APIs.',
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
                'StatForge is a competitive gaming data platform focused on creating authoritative player, team, and match data. It started with Battlefield 6 tracking, but the larger product is a platform that can reconcile multiple data sources into verified records, leaderboards, and developer APIs. The core idea is simple: raw game stats are useful, but they are not enough. StatForge separates ingestion, processing, validation, and presentation so tracker activity can become trusted platform data only after correlation and review.',
            whatItIs:
                'StatForge combines a public reference site, developer portal, platform API, operator review workflow, and BF6 tracker subsystem. Public users can view players, matches, and leaderboards. Integrators use scoped API keys to read curated platform data. Operators use the review surface to validate tracker candidates before they become canonical matches. The tracker subsystem resolves BF6 players by platform and nickname, polls GameTools for multiplayer stats, stores snapshot history, and detects likely new matches from aggregate stat changes.',
            problem:
                'External game stats are not tied cleanly to platform identity, and providers do not always expose direct match-ended events. A platform needs stable player identity, continuous polling, historical snapshots, inferred activity, expected-match correlation, staff validation, and a trusted final record. StatForge turns noisy and incomplete signals into verified match records that can power leaderboards, profiles, public pages, and developer APIs.',
            lifecycleHeroTitle: 'From noisy inputs → one verified outcome',
            lifecycleHeroSubtitle:
                'The path from raw tracker activity to a reviewed record your integrations can trust.',
            differencePunchyLines: [
                'StatForge is not just a stats tracker.',
                'It is a reconciliation platform.',
                'Raw game activity is incomplete.',
                'Display names and identities drift.',
                'Inferred matches need review before they become truth.',
                'StatForge resolves identity, detects activity, validates candidates, and publishes canonical records your system can trust.'
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
                'StatForge splits raw tracker data from verified platform data. The tracker resolves players, polls GameTools, stores deduped snapshots, and infers candidate activity. The platform correlates those candidates with scheduled events, reports, linked identities, and operator review before publishing canonical match records, leaderboards, and API output.',
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
                'The frontend is a Next.js app with marketing pages, public player and leaderboard views, a developer portal, and an operator review area. The ASP.NET platform API owns auth, RBAC, applications, API keys, scopes, canonical matches, leaderboards, and review actions. The tracker subsystem is separate: a Fastify API handles player resolve and latest snapshot reads, while a Node worker polls GameTools and writes time-series snapshots to PostgreSQL. MySQL stores platform users, game identity links, match records, review data, portal applications, API keys, and scopes. Platform routes use cookie sessions for portal users, scoped bearer keys for integrators, and route policy boundaries for customer-key, portal-only, and disabled routes.',
            personalBuild: [
                'Designed the split between raw tracker data and verified platform data so inferred activity does not automatically become a published match.',
                'Built the player resolve and polling path: identity cache, GameTools lookup, tracked player enrollment, batch polling, raw snapshot storage, hash-based dedupe, and latest snapshot reads.',
                'Implemented match candidate detection from aggregate stat deltas when the provider does not emit direct match events.',
                'Built the platform layer around canonical matches, match results, review candidates, linked game identities, leaderboards, portal applications, API keys, and scopes.',
                'Shipped frontend surfaces across public reference pages, developer portal flows, and operator review.'
            ],
            personalBuildCards: [
                {
                    title: 'Identity and polling',
                    body: 'Built resolve, cache, enroll, poll, snapshot, and hash-dedupe paths around GameTools and stable BF6 persona IDs.'
                },
                {
                    title: 'Event inference',
                    body: 'Detected candidate matches from aggregate stat deltas when the upstream provider did not emit per-match events.'
                },
                {
                    title: 'Review workflow',
                    body: 'Separated tracker candidates from canonical matches so operators validate activity before it reaches leaderboards.'
                },
                {
                    title: 'Platform API',
                    body: 'Modeled portal sessions, scoped API keys, route policies, public reads, and curated integrator endpoints.'
                }
            ],
            technicalChallenges: [
                'The hardest tracker problem was detecting new matches without a per-match feed. The worker had to compare normalized global totals between snapshots and infer candidate activity only when a new snapshot showed meaningful deltas.',
                'The hardest platform problem was deciding when inferred activity becomes verified truth. StatForge has to correlate tracker candidates with expected matches, reports, linked identities, and staff review before publishing results to leaderboards or APIs.',
                'Identity bridging is subtle. The system needs to connect Discord users, platform accounts, BF6 persona IDs, nucleus IDs, nicknames, and tracked entities without treating a temporary display name as the source of truth.',
                'Data growth splits into two different problems: tracker snapshots grow quickly and need retention or archival, while platform match and review tables need stable indexes and aggregation paths for leaderboards.',
                'Security boundaries matter because integrators, public users, operators, and internal services should not all see the same routes or raw tracker data.'
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
